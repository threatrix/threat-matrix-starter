/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: HttpMediaTypeNotSupportedException.java
*    
*    Copyrights:
*      copyright 2002-2017 the original author or authors
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
 * Copyright 2002-2017 the original author or authors.
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

package org.springframework.web;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;

/**
 * Exception thrown when a client POSTs, PUTs, or PATCHes content of a type
 * not supported by request handler.
 *
 * @author Arjen Poutsma
 * @since 3.0
 */
@SuppressWarnings("serial")
public class HttpMediaTypeNotSupportedException extends HttpMediaTypeException {

	@Nullable
	private final MediaType contentType;


	/**
	 * Create a new HttpMediaTypeNotSupportedException.
	 * @param message the exception message
	 */
	public HttpMediaTypeNotSupportedException(String message) {
		super(message);
		this.contentType = null;
	}

	/**
	 * Create a new HttpMediaTypeNotSupportedException.
	 * @param contentType the unsupported content type
	 * @param supportedMediaTypes the list of supported media types
	 */
	public HttpMediaTypeNotSupportedException(@Nullable MediaType contentType, List<MediaType> supportedMediaTypes) {
		this(contentType, supportedMediaTypes, "Content type '" +
				(contentType != null ? contentType : "") + "' not supported");
	}

	/**
	 * Create a new HttpMediaTypeNotSupportedException.
	 * @param contentType the unsupported content type
	 * @param supportedMediaTypes the list of supported media types
	 * @param msg the detail message
	 */
	public HttpMediaTypeNotSupportedException(@Nullable MediaType contentType,
			List<MediaType> supportedMediaTypes, String msg) {

		super(msg, supportedMediaTypes);
		this.contentType = contentType;
	}


	/**
	 * Return the HTTP request content type method that caused the failure.
	 */
	@Nullable
	public MediaType getContentType() {
		return this.contentType;
	}

}
