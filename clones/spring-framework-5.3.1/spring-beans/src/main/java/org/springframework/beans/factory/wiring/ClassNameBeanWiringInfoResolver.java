/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: ClassNameBeanWiringInfoResolver.java
*    
*    Copyrights:
*      copyright 2002-2012 the original author or authors
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
 * Copyright 2002-2012 the original author or authors.
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

package org.springframework.beans.factory.wiring;

import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;

/**
 * Simple default implementation of the {@link BeanWiringInfoResolver} interface,
 * looking for a bean with the same name as the fully-qualified class name.
 * This matches the default name of the bean in a Spring XML file if the
 * bean tag's "id" attribute is not used.
 *
 * @author Rod Johnson
 * @author Juergen Hoeller
 * @since 2.0
 */
public class ClassNameBeanWiringInfoResolver implements BeanWiringInfoResolver {

	@Override
	public BeanWiringInfo resolveWiringInfo(Object beanInstance) {
		Assert.notNull(beanInstance, "Bean instance must not be null");
		return new BeanWiringInfo(ClassUtils.getUserClass(beanInstance).getName(), true);
	}

}
