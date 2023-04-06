/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: HttpSessionRequiredException.java
*    
*    Copyrights:
*      copyright 2002-2018 the original author or authors
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
 * Copyright 2002-2018 the original author or authors.
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

package org.springframework.web;

import javax.servlet.ServletException;

import org.springframework.lang.Nullable;

/**
 * Exception thrown when an HTTP request handler requires a pre-existing session.
 *
 * @author Juergen Hoeller
 * @since 2.0
 */
@SuppressWarnings("serial")
public class HttpSessionRequiredException extends ServletException {

	@Nullable
	private final String expectedAttribute;


	/**
	 * Create a new HttpSessionRequiredException.
	 * @param msg the detail message
	 */
	public HttpSessionRequiredException(String msg) {
		super(msg);
		this.expectedAttribute = null;
	}

	/**
	 * Create a new HttpSessionRequiredException.
	 * @param msg the detail message
	 * @param expectedAttribute the name of the expected session attribute
	 * @since 4.3
	 */
	public HttpSessionRequiredException(String msg, String expectedAttribute) {
		super(msg);
		this.expectedAttribute = expectedAttribute;
	}


	/**
	 * Return the name of the expected session attribute, if any.
	 * @since 4.3
	 */
	@Nullable
	public String getExpectedAttribute() {
		return this.expectedAttribute;
	}

}
