/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: HttpLogging.java
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

package org.springframework.http;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.core.log.LogDelegateFactory;

/**
 * Holds the shared logger named "org.springframework.web.HttpLogging" for HTTP
 * related logging when "org.springframework.http" is not enabled but
 * "org.springframework.web" is.
 *
 * <p>That means "org.springframework.web" enables all web logging including
 * from lower level packages such as "org.springframework.http" and modules
 * such as codecs from {@literal "spring-core"} when those are wrapped with
 * {@link org.springframework.http.codec.EncoderHttpMessageWriter EncoderHttpMessageWriter} or
 * {@link org.springframework.http.codec.DecoderHttpMessageReader DecoderHttpMessageReader}.
 *
 * <p>To see logging from the primary class loggers simply enable logging for
 * "org.springframework.http" and "org.springframework.codec".
 *
 * @author Rossen Stoyanchev
 * @since 5.1
 * @see LogDelegateFactory
 */
public abstract class HttpLogging {

	private static final Log fallbackLogger =
			LogFactory.getLog("org.springframework.web." + HttpLogging.class.getSimpleName());


	/**
	 * Create a primary logger for the given class and wrap it with a composite
	 * that delegates to it or to the fallback logger
	 * "org.springframework.web.HttpLogging", if the primary is not enabled.
	 * @param primaryLoggerClass the class for the name of the primary logger
	 * @return the resulting composite logger
	 */
	public static Log forLogName(Class<?> primaryLoggerClass) {
		Log primaryLogger = LogFactory.getLog(primaryLoggerClass);
		return forLog(primaryLogger);
	}

	/**
	 * Wrap the given primary logger with a composite logger that delegates to
	 * it or to the fallback logger "org.springframework.web.HttpLogging",
	 * if the primary is not enabled.
	 * @param primaryLogger the primary logger to use
	 * @return the resulting composite logger
	 */
	public static Log forLog(Log primaryLogger) {
		return LogDelegateFactory.getCompositeLog(primaryLogger, fallbackLogger);
	}

}
