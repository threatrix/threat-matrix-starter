/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: XmlContentAssert.java
*    
*    Copyrights:
*      copyright 2002-2019 the original author or authors
*    
*    Licenses:
*      Apache License 2.0
*      SPDXId: Apache-2.0
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
/*
 * Copyright 2002-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.core.testfixture.xml;

import org.assertj.core.api.AbstractAssert;
import org.w3c.dom.Node;
import org.xmlunit.assertj.XmlAssert;
import org.xmlunit.diff.DifferenceEvaluator;
import org.xmlunit.diff.NodeMatcher;
import org.xmlunit.util.Predicate;

/**
 * Assertions exposed by {@link XmlContent}.
 *
 * @author Phillip Webb
 */
public class XmlContentAssert extends AbstractAssert<XmlContentAssert, Object> {

	XmlContentAssert(Object actual) {
		super(actual, XmlContentAssert.class);
	}

	public XmlContentAssert isSimilarTo(Object control) {
		XmlAssert.assertThat(super.actual).and(control).areSimilar();
		return this;
	}

	public XmlContentAssert isSimilarTo(Object control, Predicate<Node> nodeFilter) {
		XmlAssert.assertThat(super.actual).and(control).withNodeFilter(nodeFilter).areSimilar();
		return this;
	}

	public XmlContentAssert isSimilarTo(String control,
			DifferenceEvaluator differenceEvaluator) {
		XmlAssert.assertThat(super.actual).and(control).withDifferenceEvaluator(
				differenceEvaluator).areSimilar();
		return this;
	}

	public XmlContentAssert isSimilarToIgnoringWhitespace(Object control) {
		XmlAssert.assertThat(super.actual).and(control).ignoreWhitespace().areSimilar();
		return this;
	}


	public XmlContentAssert isSimilarToIgnoringWhitespace(String control, NodeMatcher nodeMatcher) {
		XmlAssert.assertThat(super.actual).and(control).ignoreWhitespace().withNodeMatcher(nodeMatcher).areSimilar();
		return this;
	}

}
