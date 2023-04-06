/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: CommonsLogWriter.java
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

package org.springframework.util;

import java.io.Writer;

import org.apache.commons.logging.Log;

/**
 * {@code java.io.Writer} adapter for a Commons Logging {@code Log}.
 *
 * @author Juergen Hoeller
 * @since 2.5.1
 */
public class CommonsLogWriter extends Writer {

	private final Log logger;

	private final StringBuilder buffer = new StringBuilder();


	/**
	 * Create a new CommonsLogWriter for the given Commons Logging logger.
	 * @param logger the Commons Logging logger to write to
	 */
	public CommonsLogWriter(Log logger) {
		Assert.notNull(logger, "Logger must not be null");
		this.logger = logger;
	}


	public void write(char ch) {
		if (ch == '\n' && this.buffer.length() > 0) {
			logger.debug(this.buffer.toString());
			this.buffer.setLength(0);
		}
		else {
			this.buffer.append(ch);
		}
	}

	@Override
	public void write(char[] buffer, int offset, int length) {
		for (int i = 0; i < length; i++) {
			write(buffer[offset + i]);
		}
	}

	@Override
	public void flush() {
	}

	@Override
	public void close() {
	}

}
