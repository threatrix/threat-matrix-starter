/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: SyncHandlerMethodArgumentResolver.java
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

package org.springframework.messaging.handler.invocation.reactive;

import reactor.core.publisher.Mono;

import org.springframework.core.MethodParameter;
import org.springframework.lang.Nullable;
import org.springframework.messaging.Message;

/**
 * An extension of {@link HandlerMethodArgumentResolver} for implementations
 * that are synchronous in nature and do not block to resolve values.
 *
 * @author Rossen Stoyanchev
 * @since 5.2
 */
public interface SyncHandlerMethodArgumentResolver extends HandlerMethodArgumentResolver {

	/**
	 * {@inheritDoc}
	 * <p>By default this simply delegates to {@link #resolveArgumentValue} for
	 * synchronous resolution.
	 */
	@Override
	default Mono<Object> resolveArgument(MethodParameter parameter, Message<?> message) {
		return Mono.justOrEmpty(resolveArgumentValue(parameter, message));
	}

	/**
	 * Resolve the value for the method parameter synchronously.
	 * @param parameter the method parameter
	 * @param message the currently processed message
	 * @return the resolved value, if any
	 */
	@Nullable
	Object resolveArgumentValue(MethodParameter parameter, Message<?> message);

}
