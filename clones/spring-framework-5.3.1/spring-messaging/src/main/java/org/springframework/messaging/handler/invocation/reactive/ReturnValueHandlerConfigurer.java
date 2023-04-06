/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: ReturnValueHandlerConfigurer.java
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

package org.springframework.messaging.handler.invocation.reactive;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.util.Assert;

/**
 * Assist with configuration for handler method return value handlers.
 * At present, it supports only providing a list of custom handlers.
 *
 * @author Rossen Stoyanchev
 * @since 5.2
 */
public class ReturnValueHandlerConfigurer {

	private final List<HandlerMethodReturnValueHandler> customHandlers = new ArrayList<>(8);


	/**
	 * Configure custom return value handlers for handler methods.
	 * @param handlers the handlers to add
	 */
	public void addCustomHandler(HandlerMethodReturnValueHandler... handlers) {
		Assert.notNull(handlers, "'handlers' must not be null");
		this.customHandlers.addAll(Arrays.asList(handlers));
	}


	public List<HandlerMethodReturnValueHandler> getCustomHandlers() {
		return this.customHandlers;
	}

}
