/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: ResourceResolverChain.java
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

package org.springframework.web.reactive.resource;

import java.util.List;

import reactor.core.publisher.Mono;

import org.springframework.core.io.Resource;
import org.springframework.lang.Nullable;
import org.springframework.web.server.ServerWebExchange;

/**
 * A contract for invoking a chain of {@link ResourceResolver ResourceResolvers} where each resolver
 * is given a reference to the chain allowing it to delegate when necessary.
 *
 * @author Rossen Stoyanchev
 * @since 5.0
 */
public interface ResourceResolverChain {

	/**
	 * Resolve the supplied request and request path to a {@link Resource} that
	 * exists under one of the given resource locations.
	 * @param exchange the current exchange
	 * @param requestPath the portion of the request path to use
	 * @param locations the locations to search in when looking up resources
	 * @return the resolved resource; or an empty {@code Mono} if unresolved
	 */
	Mono<Resource> resolveResource(@Nullable ServerWebExchange exchange, String requestPath,
			List<? extends Resource> locations);

	/**
	 * Resolve the externally facing <em>public</em> URL path for clients to use
	 * to access the resource that is located at the given <em>internal</em>
	 * resource path.
	 * <p>This is useful when rendering URL links to clients.
	 * @param resourcePath the internal resource path
	 * @param locations the locations to search in when looking up resources
	 * @return the resolved public URL path; or an empty {@code Mono} if unresolved
	 */
	Mono<String> resolveUrlPath(String resourcePath, List<? extends Resource> locations);

}
