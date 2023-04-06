/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: BodyInserter.java
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

package org.springframework.web.reactive.function;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import reactor.core.publisher.Mono;

import org.springframework.http.ReactiveHttpOutputMessage;
import org.springframework.http.codec.HttpMessageWriter;
import org.springframework.http.server.reactive.ServerHttpRequest;

/**
 * A combination of functions that can populate a {@link ReactiveHttpOutputMessage} body.
 *
 * @author Arjen Poutsma
 * @since 5.0
 * @param <T> the type of data to insert
 * @param <M> the type of {@link ReactiveHttpOutputMessage} this inserter can be applied to
 * @see BodyInserters
 */
@FunctionalInterface
public interface BodyInserter<T, M extends ReactiveHttpOutputMessage> {

	/**
	 * Insert into the given output message.
	 * @param outputMessage the response to insert into
	 * @param context the context to use
	 * @return a {@code Mono} that indicates completion or error
	 */
	Mono<Void> insert(M outputMessage, Context context);


	/**
	 * Defines the context used during the insertion.
	 */
	interface Context {

		/**
		 * Return the {@link HttpMessageWriter HttpMessageWriters} to be used for response body conversion.
		 * @return the stream of message writers
		 */
		List<HttpMessageWriter<?>> messageWriters();

		/**
		 * Optionally return the {@link ServerHttpRequest}, if present.
		 */
		Optional<ServerHttpRequest> serverRequest();

		/**
		 * Return the map of hints to use for response body conversion.
		 */
		Map<String, Object> hints();
	}

}
