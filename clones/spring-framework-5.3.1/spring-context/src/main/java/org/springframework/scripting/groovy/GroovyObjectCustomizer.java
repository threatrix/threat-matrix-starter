/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: GroovyObjectCustomizer.java
*    
*    Copyrights:
*      copyright 2002-2016 the original author or authors
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
 * Copyright 2002-2016 the original author or authors.
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

package org.springframework.scripting.groovy;

import groovy.lang.GroovyObject;

/**
 * Strategy used by {@link GroovyScriptFactory} to allow the customization of
 * a created {@link GroovyObject}.
 *
 * <p>This is useful to allow the authoring of DSLs, the replacement of missing
 * methods, and so forth. For example, a custom {@link groovy.lang.MetaClass}
 * could be specified.
 *
 * @author Rod Johnson
 * @since 2.0.2
 * @see GroovyScriptFactory
 */
@FunctionalInterface
public interface GroovyObjectCustomizer {

	/**
	 * Customize the supplied {@link GroovyObject}.
	 * <p>For example, this can be used to set a custom metaclass to
	 * handle missing methods.
	 * @param goo the {@code GroovyObject} to customize
	 */
	void customize(GroovyObject goo);

}
