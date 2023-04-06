/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: ResourceTransformerChain.java
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

import reactor.core.publisher.Mono;

import org.springframework.core.io.Resource;
import org.springframework.web.server.ServerWebExchange;

/**
 * A contract for invoking a chain of {@link ResourceTransformer ResourceTransformers} where each resolver
 * is given a reference to the chain allowing it to delegate when necessary.
 *
 * @author Rossen Stoyanchev
 * @since 5.0
 */
public interface ResourceTransformerChain {

	/**
	 * Return the {@code ResourceResolverChain} that was used to resolve the
	 * {@code Resource} being transformed. This may be needed for resolving
	 * related resources, e.g. links to other resources.
	 */
	ResourceResolverChain getResolverChain();

	/**
	 * Transform the given resource.
	 * @param exchange the current exchange
	 * @param resource the candidate resource to transform
	 * @return the transformed or the same resource, never empty
	 */
	Mono<Resource> transform(ServerWebExchange exchange, Resource resource);

}
