/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: UpdateMessageDigestInputStream.java
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

package org.springframework.util;

import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;

/**
 * Extension of {@link java.io.InputStream} that allows for optimized
 * implementations of message digesting.
 *
 * @author Craig Andrews
 * @since 4.2
 */
abstract class UpdateMessageDigestInputStream extends InputStream {

	/**
	 * Update the message digest with the rest of the bytes in this stream.
	 * <p>Using this method is more optimized since it avoids creating new
	 * byte arrays for each call.
	 * @param messageDigest the message digest to update
	 * @throws IOException when propagated from {@link #read()}
	 */
	public void updateMessageDigest(MessageDigest messageDigest) throws IOException {
		int data;
		while ((data = read()) != -1) {
			messageDigest.update((byte) data);
		}
	}

	/**
	 * Update the message digest with the next len bytes in this stream.
	 * <p>Using this method is more optimized since it avoids creating new
	 * byte arrays for each call.
	 * @param messageDigest the message digest to update
	 * @param len how many bytes to read from this stream and use to update the message digest
	 * @throws IOException when propagated from {@link #read()}
	 */
	public void updateMessageDigest(MessageDigest messageDigest, int len) throws IOException {
		int data;
		int bytesRead = 0;
		while (bytesRead < len && (data = read()) != -1) {
			messageDigest.update((byte) data);
			bytesRead++;
		}
	}

}
