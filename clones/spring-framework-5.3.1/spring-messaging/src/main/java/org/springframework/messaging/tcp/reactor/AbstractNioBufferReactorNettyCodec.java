/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: AbstractNioBufferReactorNettyCodec.java
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

package org.springframework.messaging.tcp.reactor;

import java.nio.ByteBuffer;
import java.util.Collection;
import java.util.List;

import io.netty.buffer.ByteBuf;

import org.springframework.messaging.Message;

/**
 * Convenient base class for {@link ReactorNettyCodec} implementations that need
 * to work with NIO {@link ByteBuffer ByteBuffers}.
 *
 * @author Rossen Stoyanchev
 * @since 5.0
 * @param <P> the message payload type
 */
public abstract class AbstractNioBufferReactorNettyCodec<P> implements ReactorNettyCodec<P> {

	@Override
	public Collection<Message<P>> decode(ByteBuf inputBuffer) {
		ByteBuffer nioBuffer = inputBuffer.nioBuffer();
		int start = nioBuffer.position();
		List<Message<P>> messages = decodeInternal(nioBuffer);
		inputBuffer.skipBytes(nioBuffer.position() - start);
		return messages;
	}

	@Override
	public void encode(Message<P> message, ByteBuf outputBuffer) {
		outputBuffer.writeBytes(encodeInternal(message));
	}


	protected abstract List<Message<P>> decodeInternal(ByteBuffer nioBuffer);

	protected abstract ByteBuffer encodeInternal(Message<P> message);

}
