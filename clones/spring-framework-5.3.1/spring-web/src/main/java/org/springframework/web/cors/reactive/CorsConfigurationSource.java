/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: CorsConfigurationSource.java
*    
*    Copyrights:
*      copyright 2002-2016 the original author or authors
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
 * Copyright 2002-2016 the original author or authors.
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

package org.springframework.web.cors.reactive;

import org.springframework.lang.Nullable;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.server.ServerWebExchange;

/**
 * Interface to be implemented by classes (usually HTTP request handlers) that
 * provides a {@link CorsConfiguration} instance based on the provided reactive request.
 *
 * @author Sebastien Deleuze
 * @since 5.0
 */
public interface CorsConfigurationSource {

	/**
	 * Return a {@link CorsConfiguration} based on the incoming request.
	 * @return the associated {@link CorsConfiguration}, or {@code null} if none
	 */
	@Nullable
	CorsConfiguration getCorsConfiguration(ServerWebExchange exchange);

}
