/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: RequestMappingInfoHandlerMethodMappingNamingStrategy.java
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

package org.springframework.web.servlet.mvc.method;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerMethodMappingNamingStrategy;

/**
 * A {@link org.springframework.web.servlet.handler.HandlerMethodMappingNamingStrategy
 * HandlerMethodMappingNamingStrategy} for {@code RequestMappingInfo}-based handler
 * method mappings.
 *
 * If the {@code RequestMappingInfo} name attribute is set, its value is used.
 * Otherwise the name is based on the capital letters of the class name,
 * followed by "#" as a separator, and the method name. For example "TC#getFoo"
 * for a class named TestController with method getFoo.
 *
 * @author Rossen Stoyanchev
 * @since 4.1
 */
public class RequestMappingInfoHandlerMethodMappingNamingStrategy
		implements HandlerMethodMappingNamingStrategy<RequestMappingInfo> {

	/** Separator between the type and method-level parts of a HandlerMethod mapping name. */
	public static final String SEPARATOR = "#";


	@Override
	public String getName(HandlerMethod handlerMethod, RequestMappingInfo mapping) {
		if (mapping.getName() != null) {
			return mapping.getName();
		}
		StringBuilder sb = new StringBuilder();
		String simpleTypeName = handlerMethod.getBeanType().getSimpleName();
		for (int i = 0; i < simpleTypeName.length(); i++) {
			if (Character.isUpperCase(simpleTypeName.charAt(i))) {
				sb.append(simpleTypeName.charAt(i));
			}
		}
		sb.append(SEPARATOR).append(handlerMethod.getMethod().getName());
		return sb.toString();
	}

}
