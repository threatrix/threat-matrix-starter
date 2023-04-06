/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.3.18
*    Source File: MethodInvocation.java
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

package org.aopalliance.intercept;

import java.lang.reflect.Method;

import javax.annotation.Nonnull;

/**
 * Description of an invocation to a method, given to an interceptor
 * upon method-call.
 *
 * <p>A method invocation is a joinpoint and can be intercepted by a
 * method interceptor.
 *
 * @author Rod Johnson
 * @see MethodInterceptor
 */
public interface MethodInvocation extends Invocation {

	/**
	 * Get the method being called.
	 * <p>This method is a friendly implementation of the
	 * {@link Joinpoint#getStaticPart()} method (same result).
	 * @return the method being called
	 */
	@Nonnull
	Method getMethod();

}
