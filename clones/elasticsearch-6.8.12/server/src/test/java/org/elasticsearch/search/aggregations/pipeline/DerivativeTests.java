/*
 * Licensed to Elasticsearch under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.elasticsearch.search.aggregations.pipeline;

import org.elasticsearch.search.aggregations.BasePipelineAggregationTestCase;
import org.elasticsearch.search.aggregations.PipelineAggregationBuilder;
import org.elasticsearch.search.aggregations.TestAggregatorFactory;
import org.elasticsearch.search.aggregations.pipeline.BucketHelpers.GapPolicy;
import org.elasticsearch.search.aggregations.pipeline.derivative.DerivativePipelineAggregationBuilder;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class DerivativeTests extends BasePipelineAggregationTestCase<DerivativePipelineAggregationBuilder> {

    @Override
    protected DerivativePipelineAggregationBuilder createTestAggregatorFactory() {
        String name = randomAlphaOfLengthBetween(3, 20);
        String bucketsPath = randomAlphaOfLengthBetween(3, 20);
        DerivativePipelineAggregationBuilder factory = new DerivativePipelineAggregationBuilder(name, bucketsPath);
        if (randomBoolean()) {
            factory.format(randomAlphaOfLengthBetween(1, 10));
        }
        if (randomBoolean()) {
            factory.gapPolicy(randomFrom(GapPolicy.values()));
        }
        if (randomBoolean()) {
            if (randomBoolean()) {
                factory.unit(String.valueOf(randomInt()));
            } else {
                factory.unit(String.valueOf(randomIntBetween(1, 10) + randomFrom("s", "m", "h", "d", "w", "M", "y")));
            }
        }
        return factory;
    }
    
    /**
     * The validation should verify the parent aggregation is allowed.
     */
    public void testValidate() throws IOException {
        final Set<PipelineAggregationBuilder> aggBuilders = new HashSet<>();
        aggBuilders.add(new DerivativePipelineAggregationBuilder("deriv", "der"));

        final DerivativePipelineAggregationBuilder builder = new DerivativePipelineAggregationBuilder("name", "valid");
        builder.validate(PipelineAggregationHelperTests.getRandomSequentiallyOrderedParentAgg(), Collections.emptySet(), aggBuilders);
    }

    /**
     * The validation should throw an IllegalArgumentException, since parent
     * aggregation is not a type of HistogramAggregatorFactory,
     * DateHistogramAggregatorFactory or AutoDateHistogramAggregatorFactory.
     */
    public void testValidateException() throws IOException {
        final Set<PipelineAggregationBuilder> aggBuilders = new HashSet<>();
        aggBuilders.add(new DerivativePipelineAggregationBuilder("deriv", "der"));
        TestAggregatorFactory parentFactory = TestAggregatorFactory.createInstance();

        final DerivativePipelineAggregationBuilder builder = new DerivativePipelineAggregationBuilder("name", "invalid_agg>metric");
        IllegalStateException ex = expectThrows(IllegalStateException.class,
                () -> builder.validate(parentFactory, Collections.emptySet(), aggBuilders));
        assertEquals("derivative aggregation [name] must have a histogram, date_histogram or auto_date_histogram as parent",
                ex.getMessage());
    }
}
