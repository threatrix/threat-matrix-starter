/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: InvalidMediaTypeException.java
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

import org.springframework.util.InvalidMimeTypeException;

/**
 * Exception thrown from {@link MediaType#parseMediaType(String)} in case of
 * encountering an invalid media type specification String.
 *
 * @author Juergen Hoeller
 * @since 3.2.2
 */
@SuppressWarnings("serial")
public class InvalidMediaTypeException extends IllegalArgumentException {

	private final String mediaType;


	/**
	 * Create a new InvalidMediaTypeException for the given media type.
	 * @param mediaType the offending media type
	 * @param message a detail message indicating the invalid part
	 */
	public InvalidMediaTypeException(String mediaType, String message) {
		super("Invalid media type \"" + mediaType + "\": " + message);
		this.mediaType = mediaType;
	}

	/**
	 * Constructor that allows wrapping {@link InvalidMimeTypeException}.
	 */
	InvalidMediaTypeException(InvalidMimeTypeException ex) {
		super(ex.getMessage(), ex);
		this.mediaType = ex.getMimeType();
	}


	/**
	 * Return the offending media type.
	 */
	public String getMediaType() {
		return this.mediaType;
	}

}
