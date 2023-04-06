/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: CachingConfigurerSupport.java
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

package org.springframework.cache.annotation;

import org.springframework.cache.CacheManager;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.cache.interceptor.CacheResolver;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.lang.Nullable;

/**
 * An implementation of {@link CachingConfigurer} with empty methods allowing
 * sub-classes to override only the methods they're interested in.
 *
 * @author Stephane Nicoll
 * @since 4.1
 * @see CachingConfigurer
 */
public class CachingConfigurerSupport implements CachingConfigurer {

	@Override
	@Nullable
	public CacheManager cacheManager() {
		return null;
	}

	@Override
	@Nullable
	public CacheResolver cacheResolver() {
		return null;
	}

	@Override
	@Nullable
	public KeyGenerator keyGenerator() {
		return null;
	}

	@Override
	@Nullable
	public CacheErrorHandler errorHandler() {
		return null;
	}

}
