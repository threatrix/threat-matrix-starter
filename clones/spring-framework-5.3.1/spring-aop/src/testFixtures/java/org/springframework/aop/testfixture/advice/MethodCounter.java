/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: MethodCounter.java
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

package org.springframework.aop.testfixture.advice;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.HashMap;

/**
 * Abstract superclass for counting advices etc.
 *
 * @author Rod Johnson
 * @author Chris Beams
 * @author Sam Brannen
 */
@SuppressWarnings("serial")
public class MethodCounter implements Serializable {

	/** Method name --> count, does not understand overloading */
	private HashMap<String, Integer> map = new HashMap<>();

	private int allCount;

	protected void count(Method m) {
		count(m.getName());
	}

	protected void count(String methodName) {
		map.merge(methodName, 1, (n, m) -> n + 1);
		++allCount;
	}

	public int getCalls(String methodName) {
		return map.getOrDefault(methodName, 0);
	}

	public int getCalls() {
		return allCount;
	}

	/**
	 * A bit simplistic: just wants the same class.
	 * Doesn't worry about counts.
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object other) {
		return (other != null && other.getClass() == this.getClass());
	}

	@Override
	public int hashCode() {
		return getClass().hashCode();
	}

}
