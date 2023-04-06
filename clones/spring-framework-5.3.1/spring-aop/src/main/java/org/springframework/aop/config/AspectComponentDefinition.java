/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: AspectComponentDefinition.java
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

package org.springframework.aop.config;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanReference;
import org.springframework.beans.factory.parsing.CompositeComponentDefinition;
import org.springframework.lang.Nullable;

/**
 * {@link org.springframework.beans.factory.parsing.ComponentDefinition}
 * that holds an aspect definition, including its nested pointcuts.
 *
 * @author Rob Harrop
 * @author Juergen Hoeller
 * @since 2.0
 * @see #getNestedComponents()
 * @see PointcutComponentDefinition
 */
public class AspectComponentDefinition extends CompositeComponentDefinition {

	private final BeanDefinition[] beanDefinitions;

	private final BeanReference[] beanReferences;


	public AspectComponentDefinition(String aspectName, @Nullable BeanDefinition[] beanDefinitions,
			@Nullable BeanReference[] beanReferences, @Nullable Object source) {

		super(aspectName, source);
		this.beanDefinitions = (beanDefinitions != null ? beanDefinitions : new BeanDefinition[0]);
		this.beanReferences = (beanReferences != null ? beanReferences : new BeanReference[0]);
	}


	@Override
	public BeanDefinition[] getBeanDefinitions() {
		return this.beanDefinitions;
	}

	@Override
	public BeanReference[] getBeanReferences() {
		return this.beanReferences;
	}

}
