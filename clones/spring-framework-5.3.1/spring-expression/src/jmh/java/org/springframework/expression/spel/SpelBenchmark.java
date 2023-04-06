/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.3.18
*    Source File: SpelBenchmark.java
*    
*    Copyrights:
*      copyright 2002-2020 the original author or authors
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
 * Copyright 2002-2020 the original author or authors.
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

package org.springframework.expression.spel;

import java.util.HashMap;
import java.util.Map;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.BenchmarkMode;
import org.openjdk.jmh.annotations.Mode;
import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.State;

import org.springframework.expression.EvaluationContext;
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;

/**
 * Benchmarks for parsing and executing SpEL expressions.
 * @author Brian Clozel
 */
@BenchmarkMode(Mode.Throughput)
public class SpelBenchmark {

	@State(Scope.Benchmark)
	public static class BenchmarkData {

		public ExpressionParser parser = new SpelExpressionParser();

		public EvaluationContext eContext = TestScenarioCreator.getTestEvaluationContext();

	}

	@Benchmark
	public Object propertyAccessParseAndExecution(BenchmarkData data) {
		Expression expr = data.parser.parseExpression("placeOfBirth.city");
		return expr.getValue(data.eContext);
	}

	@Benchmark
	public Object methodAccessParseAndExecution(BenchmarkData data) {
		Expression expr = data.parser.parseExpression("getPlaceOfBirth().getCity()");
		return expr.getValue(data.eContext);
	}

	@State(Scope.Benchmark)
	public static class CachingBenchmarkData extends BenchmarkData {

		public Expression propertyExpression;

		public Expression methodExpression;

		public CachingBenchmarkData() {
			this.propertyExpression = this.parser.parseExpression("placeOfBirth.city");
			this.methodExpression = this.parser.parseExpression("getPlaceOfBirth().getCity()");
		}
	}

	@Benchmark
	public Object cachingPropertyAccessParseAndExecution(CachingBenchmarkData data) {
		return data.propertyExpression.getValue(data.eContext);
	}

	@Benchmark
	public Object cachingMethodAccessParseAndExecution(CachingBenchmarkData data) {
		return data.methodExpression.getValue(data.eContext);
	}

	@State(Scope.Benchmark)
	public static class ValueBenchmarkData {

		public EvaluationContext context;

		public Expression expression;

		public ValueBenchmarkData() {
			Map<String, String> map = new HashMap<>();
			map.put("key", "value");
			this.context = new StandardEvaluationContext(map);
			ExpressionParser spelExpressionParser = new SpelExpressionParser();
			this.expression = spelExpressionParser.parseExpression("#root['key']");
		}
	}

	@Benchmark
	public Object getValueFromMap(ValueBenchmarkData data) {
		return data.expression.getValue(data.context);
	}

}
