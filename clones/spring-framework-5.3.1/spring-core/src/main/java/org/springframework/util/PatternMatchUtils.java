/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: PatternMatchUtils.java
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

package org.springframework.util;

import org.springframework.lang.Nullable;

/**
 * Utility methods for simple pattern matching, in particular for
 * Spring's typical "xxx*", "*xxx" and "*xxx*" pattern styles.
 *
 * @author Juergen Hoeller
 * @since 2.0
 */
public abstract class PatternMatchUtils {

	/**
	 * Match a String against the given pattern, supporting the following simple
	 * pattern styles: "xxx*", "*xxx", "*xxx*" and "xxx*yyy" matches (with an
	 * arbitrary number of pattern parts), as well as direct equality.
	 * @param pattern the pattern to match against
	 * @param str the String to match
	 * @return whether the String matches the given pattern
	 */
	public static boolean simpleMatch(@Nullable String pattern, @Nullable String str) {
		if (pattern == null || str == null) {
			return false;
		}

		int firstIndex = pattern.indexOf('*');
		if (firstIndex == -1) {
			return pattern.equals(str);
		}

		if (firstIndex == 0) {
			if (pattern.length() == 1) {
				return true;
			}
			int nextIndex = pattern.indexOf('*', 1);
			if (nextIndex == -1) {
				return str.endsWith(pattern.substring(1));
			}
			String part = pattern.substring(1, nextIndex);
			if (part.isEmpty()) {
				return simpleMatch(pattern.substring(nextIndex), str);
			}
			int partIndex = str.indexOf(part);
			while (partIndex != -1) {
				if (simpleMatch(pattern.substring(nextIndex), str.substring(partIndex + part.length()))) {
					return true;
				}
				partIndex = str.indexOf(part, partIndex + 1);
			}
			return false;
		}

		return (str.length() >= firstIndex &&
				pattern.substring(0, firstIndex).equals(str.substring(0, firstIndex)) &&
				simpleMatch(pattern.substring(firstIndex), str.substring(firstIndex)));
	}

	/**
	 * Match a String against the given patterns, supporting the following simple
	 * pattern styles: "xxx*", "*xxx", "*xxx*" and "xxx*yyy" matches (with an
	 * arbitrary number of pattern parts), as well as direct equality.
	 * @param patterns the patterns to match against
	 * @param str the String to match
	 * @return whether the String matches any of the given patterns
	 */
	public static boolean simpleMatch(@Nullable String[] patterns, String str) {
		if (patterns != null) {
			for (String pattern : patterns) {
				if (simpleMatch(pattern, str)) {
					return true;
				}
			}
		}
		return false;
	}

}
