/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: ContextLifecycleScheduledTaskRegistrar.java
*    
*    Copyrights:
*      copyright 2002-2014 the original author or authors
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
 * Copyright 2002-2014 the original author or authors.
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

package org.springframework.scheduling.config;

import org.springframework.beans.factory.SmartInitializingSingleton;

/**
 * {@link ScheduledTaskRegistrar} subclass which redirects the actual scheduling
 * of tasks to the {@link #afterSingletonsInstantiated()} callback (as of 4.1.2).
 *
 * @author Juergen Hoeller
 * @since 3.2.1
 */
public class ContextLifecycleScheduledTaskRegistrar extends ScheduledTaskRegistrar implements SmartInitializingSingleton {

	@Override
	public void afterPropertiesSet() {
		// no-op
	}

	@Override
	public void afterSingletonsInstantiated() {
		scheduleTasks();
	}

}
