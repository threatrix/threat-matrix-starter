/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.3.18
*    Source File: ContentVersionStrategy.java
*    
*    Copyrights:
*      copyright 2002-2020 the original author or authors
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
 * Copyright 2002-2020 the original author or authors.
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

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.core.io.Resource;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import org.springframework.util.DigestUtils;
import org.springframework.util.StreamUtils;

/**
 * A {@code VersionStrategy} that calculates an Hex MD5 hashes from the content
 * of the resource and appends it to the file name, e.g.
 * {@code "styles/main-e36d2e05253c6c7085a91522ce43a0b4.css"}.
 *
 * @author Rossen Stoyanchev
 * @author Brian Clozel
 * @since 5.0
 * @see VersionResourceResolver
 */
public class ContentVersionStrategy extends AbstractFileNameVersionStrategy {


	@Override
	public Mono<String> getResourceVersion(Resource resource) {
		Flux<DataBuffer> flux = DataBufferUtils.read(
				resource, DefaultDataBufferFactory.sharedInstance, StreamUtils.BUFFER_SIZE);

		return DataBufferUtils.join(flux)
				.map(buffer -> {
					byte[] result = new byte[buffer.readableByteCount()];
					buffer.read(result);
					DataBufferUtils.release(buffer);
					return DigestUtils.md5DigestAsHex(result);
				});
	}

}
