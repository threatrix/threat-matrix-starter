/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: SimpleLog.java
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

package org.apache.commons.logging.impl;

/**
 * Originally a simple Commons Logging provider configured by system properties.
 * Deprecated in {@code spring-jcl}, effectively equivalent to {@link NoOpLog}.
 *
 * <p>Instead of instantiating this directly, call {@code LogFactory#getLog(Class/String)}
 * which will fall back to {@code java.util.logging} if neither Log4j nor SLF4J are present.
 *
 * @author Juergen Hoeller (for the {@code spring-jcl} variant)
 * @since 5.0
 * @deprecated in {@code spring-jcl} (effectively equivalent to {@link NoOpLog})
 */
@Deprecated
@SuppressWarnings("serial")
public class SimpleLog extends NoOpLog {

	public SimpleLog(String name) {
		super(name);
		System.out.println(SimpleLog.class.getName() + " is deprecated and equivalent to NoOpLog in spring-jcl. " +
				"Use a standard LogFactory.getLog(Class/String) call instead.");
	}

}
