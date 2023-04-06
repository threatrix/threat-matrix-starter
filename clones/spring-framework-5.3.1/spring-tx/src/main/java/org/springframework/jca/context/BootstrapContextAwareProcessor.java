/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: BootstrapContextAwareProcessor.java
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

package org.springframework.jca.context;

import javax.resource.spi.BootstrapContext;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.lang.Nullable;

/**
 * {@link org.springframework.beans.factory.config.BeanPostProcessor}
 * implementation that passes the BootstrapContext to beans that implement
 * the {@link BootstrapContextAware} interface.
 *
 * <p>{@link ResourceAdapterApplicationContext} automatically registers
 * this processor with its underlying bean factory.
 *
 * @author Juergen Hoeller
 * @since 2.5
 * @see BootstrapContextAware
 */
class BootstrapContextAwareProcessor implements BeanPostProcessor {

	@Nullable
	private final BootstrapContext bootstrapContext;


	/**
	 * Create a new BootstrapContextAwareProcessor for the given context.
	 */
	public BootstrapContextAwareProcessor(@Nullable BootstrapContext bootstrapContext) {
		this.bootstrapContext = bootstrapContext;
	}


	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		if (this.bootstrapContext != null && bean instanceof BootstrapContextAware) {
			((BootstrapContextAware) bean).setBootstrapContext(this.bootstrapContext);
		}
		return bean;
	}

	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}

}
