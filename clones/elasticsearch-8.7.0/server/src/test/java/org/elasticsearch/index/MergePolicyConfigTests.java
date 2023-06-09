/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
package org.elasticsearch.index;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.LeafReader;
import org.apache.lucene.index.MergePolicy;
import org.apache.lucene.index.NoMergePolicy;
import org.apache.lucene.index.SegmentCommitInfo;
import org.apache.lucene.index.SegmentReader;
import org.apache.lucene.index.TieredMergePolicy;
import org.apache.lucene.store.Directory;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.unit.ByteSizeUnit;
import org.elasticsearch.common.unit.ByteSizeValue;
import org.elasticsearch.index.shard.ShardId;
import org.elasticsearch.test.ESTestCase;

import java.io.IOException;

import static org.elasticsearch.index.IndexSettingsTests.newIndexMeta;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;

public class MergePolicyConfigTests extends ESTestCase {
    protected final ShardId shardId = new ShardId("index", "_na_", 1);

    public void testCompoundFileSettings() throws IOException {
        assertCompoundThreshold(Settings.EMPTY, 1.0, ByteSizeValue.ofGb(1));
        assertCompoundThreshold(build(true), 1.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build(0.5), 0.5, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build(1.0), 1.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build("true"), 1.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build("True"), 1.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build("False"), 0.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build("false"), 0.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build(false), 0.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build(0), 0.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build(0.0), 0.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build(0.0), 0.0, ByteSizeValue.ofBytes(Long.MAX_VALUE));
        assertCompoundThreshold(build("100MB"), 1.0, ByteSizeValue.ofMb(100));
        assertCompoundThreshold(build("0MB"), 1.0, ByteSizeValue.ofBytes(0));
        assertCompoundThreshold(build("0B"), 1.0, ByteSizeValue.ofBytes(0));
    }

    private void assertCompoundThreshold(Settings settings, double noCFSRatio, ByteSizeValue maxCFSSize) {
        MergePolicy mp = new MergePolicyConfig(logger, indexSettings(settings)).getMergePolicy();
        assertThat(mp.getNoCFSRatio(), equalTo(noCFSRatio));
        assertThat(mp.getMaxCFSSegmentSizeMB(), equalTo(maxCFSSize.getMbFrac()));
    }

    private static IndexSettings indexSettings(Settings settings) {
        return new IndexSettings(newIndexMeta("test", settings), Settings.EMPTY);
    }

    public void testNoMerges() {
        MergePolicyConfig mp = new MergePolicyConfig(
            logger,
            indexSettings(Settings.builder().put(MergePolicyConfig.INDEX_MERGE_ENABLED, false).build())
        );
        assertTrue(mp.getMergePolicy() instanceof NoMergePolicy);
    }

    public void testUpdateSettings() throws IOException {
        IndexSettings indexSettings = indexSettings(Settings.EMPTY);
        assertThat(indexSettings.getMergePolicy().getNoCFSRatio(), equalTo(1.0));
        assertThat(indexSettings.getMergePolicy().getMaxCFSSegmentSizeMB(), equalTo(1024d));
        indexSettings = indexSettings(build(0.9));
        assertThat((indexSettings.getMergePolicy()).getNoCFSRatio(), equalTo(0.9));
        assertThat(indexSettings.getMergePolicy().getMaxCFSSegmentSizeMB(), equalTo(ByteSizeValue.ofBytes(Long.MAX_VALUE).getMbFrac()));
        indexSettings.updateIndexMetadata(newIndexMeta("index", build(0.1)));
        assertThat((indexSettings.getMergePolicy()).getNoCFSRatio(), equalTo(0.1));
        assertThat(indexSettings.getMergePolicy().getMaxCFSSegmentSizeMB(), equalTo(ByteSizeValue.ofBytes(Long.MAX_VALUE).getMbFrac()));
        indexSettings.updateIndexMetadata(newIndexMeta("index", build(0.0)));
        assertThat((indexSettings.getMergePolicy()).getNoCFSRatio(), equalTo(0.0));
        assertThat(indexSettings.getMergePolicy().getMaxCFSSegmentSizeMB(), equalTo(ByteSizeValue.ofBytes(Long.MAX_VALUE).getMbFrac()));
        indexSettings.updateIndexMetadata(newIndexMeta("index", build("true")));
        assertThat((indexSettings.getMergePolicy()).getNoCFSRatio(), equalTo(1.0));
        assertThat(indexSettings.getMergePolicy().getMaxCFSSegmentSizeMB(), equalTo(ByteSizeValue.ofBytes(Long.MAX_VALUE).getMbFrac()));
        indexSettings.updateIndexMetadata(newIndexMeta("index", build("false")));
        assertThat((indexSettings.getMergePolicy()).getNoCFSRatio(), equalTo(0.0));
        assertThat(indexSettings.getMergePolicy().getMaxCFSSegmentSizeMB(), equalTo(ByteSizeValue.ofBytes(Long.MAX_VALUE).getMbFrac()));
        indexSettings.updateIndexMetadata(newIndexMeta("index", build("100mb")));
        assertThat((indexSettings.getMergePolicy()).getNoCFSRatio(), equalTo(1.0));
        assertThat(indexSettings.getMergePolicy().getMaxCFSSegmentSizeMB(), equalTo(100d));
    }

    public void testTieredMergePolicySettingsUpdate() throws IOException {
        IndexSettings indexSettings = indexSettings(Settings.EMPTY);
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getForceMergeDeletesPctAllowed(),
            MergePolicyConfig.DEFAULT_EXPUNGE_DELETES_ALLOWED,
            0.0d
        );

        indexSettings.updateIndexMetadata(
            newIndexMeta(
                "index",
                Settings.builder()
                    .put(
                        MergePolicyConfig.INDEX_MERGE_POLICY_EXPUNGE_DELETES_ALLOWED_SETTING.getKey(),
                        MergePolicyConfig.DEFAULT_EXPUNGE_DELETES_ALLOWED + 1.0d
                    )
                    .build()
            )
        );
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getForceMergeDeletesPctAllowed(),
            MergePolicyConfig.DEFAULT_EXPUNGE_DELETES_ALLOWED + 1.0d,
            0.0d
        );

        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getFloorSegmentMB(),
            MergePolicyConfig.DEFAULT_FLOOR_SEGMENT.getMbFrac(),
            0
        );
        indexSettings.updateIndexMetadata(
            newIndexMeta(
                "index",
                Settings.builder()
                    .put(
                        MergePolicyConfig.INDEX_MERGE_POLICY_FLOOR_SEGMENT_SETTING.getKey(),
                        new ByteSizeValue(MergePolicyConfig.DEFAULT_FLOOR_SEGMENT.getMb() + 1, ByteSizeUnit.MB)
                    )
                    .build()
            )
        );
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getFloorSegmentMB(),
            new ByteSizeValue(MergePolicyConfig.DEFAULT_FLOOR_SEGMENT.getMb() + 1, ByteSizeUnit.MB).getMbFrac(),
            0.001
        );

        assertEquals(((TieredMergePolicy) indexSettings.getMergePolicy()).getMaxMergeAtOnce(), MergePolicyConfig.DEFAULT_MAX_MERGE_AT_ONCE);
        indexSettings.updateIndexMetadata(
            newIndexMeta(
                "index",
                Settings.builder()
                    .put(
                        MergePolicyConfig.INDEX_MERGE_POLICY_MAX_MERGE_AT_ONCE_SETTING.getKey(),
                        MergePolicyConfig.DEFAULT_MAX_MERGE_AT_ONCE - 1
                    )
                    .build()
            )
        );
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getMaxMergeAtOnce(),
            MergePolicyConfig.DEFAULT_MAX_MERGE_AT_ONCE - 1
        );

        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getMaxMergedSegmentMB(),
            MergePolicyConfig.DEFAULT_MAX_MERGED_SEGMENT.getMbFrac(),
            0.0001
        );
        indexSettings.updateIndexMetadata(
            newIndexMeta(
                "index",
                Settings.builder()
                    .put(
                        MergePolicyConfig.INDEX_MERGE_POLICY_MAX_MERGED_SEGMENT_SETTING.getKey(),
                        ByteSizeValue.ofBytes(MergePolicyConfig.DEFAULT_MAX_MERGED_SEGMENT.getBytes() + 1)
                    )
                    .build()
            )
        );
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getMaxMergedSegmentMB(),
            ByteSizeValue.ofBytes(MergePolicyConfig.DEFAULT_MAX_MERGED_SEGMENT.getBytes() + 1).getMbFrac(),
            0.0001
        );

        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getSegmentsPerTier(),
            MergePolicyConfig.DEFAULT_SEGMENTS_PER_TIER,
            0
        );
        indexSettings.updateIndexMetadata(
            newIndexMeta(
                "index",
                Settings.builder()
                    .put(
                        MergePolicyConfig.INDEX_MERGE_POLICY_SEGMENTS_PER_TIER_SETTING.getKey(),
                        MergePolicyConfig.DEFAULT_SEGMENTS_PER_TIER + 1
                    )
                    .build()
            )
        );
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getSegmentsPerTier(),
            MergePolicyConfig.DEFAULT_SEGMENTS_PER_TIER + 1,
            0
        );

        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getDeletesPctAllowed(),
            MergePolicyConfig.DEFAULT_DELETES_PCT_ALLOWED,
            0
        );
        indexSettings.updateIndexMetadata(
            newIndexMeta(
                "index",
                Settings.builder().put(MergePolicyConfig.INDEX_MERGE_POLICY_DELETES_PCT_ALLOWED_SETTING.getKey(), 22).build()
            )
        );
        assertEquals(((TieredMergePolicy) indexSettings.getMergePolicy()).getDeletesPctAllowed(), 22, 0);

        IllegalArgumentException exc = expectThrows(
            IllegalArgumentException.class,
            () -> indexSettings.updateIndexMetadata(
                newIndexMeta(
                    "index",
                    Settings.builder().put(MergePolicyConfig.INDEX_MERGE_POLICY_DELETES_PCT_ALLOWED_SETTING.getKey(), 53).build()
                )
            )
        );
        final Throwable cause = exc.getCause();
        assertThat(cause.getMessage(), containsString("must be <= 50.0"));
        indexSettings.updateIndexMetadata(newIndexMeta("index", Settings.EMPTY)); // see if defaults are restored
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getForceMergeDeletesPctAllowed(),
            MergePolicyConfig.DEFAULT_EXPUNGE_DELETES_ALLOWED,
            0.0d
        );
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getFloorSegmentMB(),
            new ByteSizeValue(MergePolicyConfig.DEFAULT_FLOOR_SEGMENT.getMb(), ByteSizeUnit.MB).getMbFrac(),
            0.00
        );
        assertEquals(((TieredMergePolicy) indexSettings.getMergePolicy()).getMaxMergeAtOnce(), MergePolicyConfig.DEFAULT_MAX_MERGE_AT_ONCE);
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getMaxMergedSegmentMB(),
            ByteSizeValue.ofBytes(MergePolicyConfig.DEFAULT_MAX_MERGED_SEGMENT.getBytes() + 1).getMbFrac(),
            0.0001
        );
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getSegmentsPerTier(),
            MergePolicyConfig.DEFAULT_SEGMENTS_PER_TIER,
            0
        );
        assertEquals(
            ((TieredMergePolicy) indexSettings.getMergePolicy()).getDeletesPctAllowed(),
            MergePolicyConfig.DEFAULT_DELETES_PCT_ALLOWED,
            0
        );
    }

    public Settings build(String value) {
        return Settings.builder().put(MergePolicyConfig.INDEX_COMPOUND_FORMAT_SETTING.getKey(), value).build();
    }

    public Settings build(double value) {
        return Settings.builder().put(MergePolicyConfig.INDEX_COMPOUND_FORMAT_SETTING.getKey(), value).build();
    }

    public Settings build(int value) {
        return Settings.builder().put(MergePolicyConfig.INDEX_COMPOUND_FORMAT_SETTING.getKey(), value).build();
    }

    public Settings build(boolean value) {
        return Settings.builder().put(MergePolicyConfig.INDEX_COMPOUND_FORMAT_SETTING.getKey(), value).build();
    }

    private Settings build(ByteSizeValue value) {
        return Settings.builder().put(MergePolicyConfig.INDEX_COMPOUND_FORMAT_SETTING.getKey(), value).build();
    }

    public void testCompoundFileConfiguredByByteSize() throws IOException {
        try (Directory dir = newDirectory()) {
            // index.compound_format: 1gb, the merge will use a compound file
            MergePolicy mp = new MergePolicyConfig(logger, indexSettings(Settings.EMPTY)).getMergePolicy();
            try (IndexWriter w = new IndexWriter(dir, new IndexWriterConfig(null).setMergePolicy(mp))) {
                w.addDocument(new Document());
                w.flush();
                w.addDocument(new Document());
                w.forceMerge(1);
            }
            try (DirectoryReader reader = DirectoryReader.open(dir)) {
                LeafReader leaf = getOnlyLeafReader(reader);
                SegmentCommitInfo sci = ((SegmentReader) leaf).getSegmentInfo();
                assertEquals(IndexWriter.SOURCE_MERGE, sci.info.getDiagnostics().get(IndexWriter.SOURCE));
                assertTrue(sci.info.getUseCompoundFile());
            }
        }

        // index.compound_format: 1b, the merge will not use a compound file
        try (Directory dir = newDirectory()) {
            MergePolicy mp = new MergePolicyConfig(logger, indexSettings(build("1b"))).getMergePolicy();
            try (IndexWriter w = new IndexWriter(dir, new IndexWriterConfig(null).setMergePolicy(mp))) {
                w.addDocument(new Document());
                w.flush();
                w.addDocument(new Document());
                w.forceMerge(1);
            }
            try (DirectoryReader reader = DirectoryReader.open(dir)) {
                LeafReader leaf = getOnlyLeafReader(reader);
                SegmentCommitInfo sci = ((SegmentReader) leaf).getSegmentInfo();
                assertEquals(IndexWriter.SOURCE_MERGE, sci.info.getDiagnostics().get(IndexWriter.SOURCE));
                assertFalse(sci.info.getUseCompoundFile());
            }
        }
    }
}
