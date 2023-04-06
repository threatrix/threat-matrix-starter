/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: HttpHandler.java
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

package org.springframework.http.server.reactive;

import reactor.core.publisher.Mono;

/**
 * Lowest level contract for reactive HTTP request handling that serves as a
 * common denominator across different runtimes.
 *
 * <p>Higher-level, but still generic, building blocks for applications such as
 * {@code WebFilter}, {@code WebSession}, {@code ServerWebExchange}, and others
 * are available in the {@code org.springframework.web.server} package.
 *
 * <p>Application level programming models such as annotated controllers and
 * functional handlers are available in the {@code spring-webflux} module.
 *
 * <p>Typically an {@link HttpHandler} represents an entire application with
 * higher-level programming models bridged via
 * {@link org.springframework.web.server.adapter.WebHttpHandlerBuilder}.
 * Multiple applications at unique context paths can be plugged in with the
 * help of the {@link ContextPathCompositeHandler}.
 *
 * @author Arjen Poutsma
 * @author Rossen Stoyanchev
 * @since 5.0
 * @see ContextPathCompositeHandler
 */
public interface HttpHandler {

	/**
	 * Handle the given request and write to the response.
	 * @param request current request
	 * @param response current response
	 * @return indicates completion of request handling
	 */
	Mono<Void> handle(ServerHttpRequest request, ServerHttpResponse response);

}
