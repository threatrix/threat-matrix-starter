/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: MissingMatrixVariableException.java
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

package org.springframework.web.bind;

import org.springframework.core.MethodParameter;

/**
 * {@link ServletRequestBindingException} subclass that indicates that a matrix
 * variable expected in the method parameters of an {@code @RequestMapping}
 * method is not present among the matrix variables extracted from the URL.
 *
 * @author Juergen Hoeller
 * @since 5.1
 * @see MissingPathVariableException
 */
@SuppressWarnings("serial")
public class MissingMatrixVariableException extends ServletRequestBindingException {

	private final String variableName;

	private final MethodParameter parameter;


	/**
	 * Constructor for MissingMatrixVariableException.
	 * @param variableName the name of the missing matrix variable
	 * @param parameter the method parameter
	 */
	public MissingMatrixVariableException(String variableName, MethodParameter parameter) {
		super("");
		this.variableName = variableName;
		this.parameter = parameter;
	}


	@Override
	public String getMessage() {
		return "Missing matrix variable '" + this.variableName +
				"' for method parameter of type " + this.parameter.getNestedParameterType().getSimpleName();
	}

	/**
	 * Return the expected name of the matrix variable.
	 */
	public final String getVariableName() {
		return this.variableName;
	}

	/**
	 * Return the method parameter bound to the matrix variable.
	 */
	public final MethodParameter getParameter() {
		return this.parameter;
	}

}
