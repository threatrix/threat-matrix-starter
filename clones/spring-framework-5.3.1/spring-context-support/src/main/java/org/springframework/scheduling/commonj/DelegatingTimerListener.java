/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: DelegatingTimerListener.java
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

package org.springframework.scheduling.commonj;

import commonj.timers.Timer;
import commonj.timers.TimerListener;

import org.springframework.util.Assert;

/**
 * Simple TimerListener adapter that delegates to a given Runnable.
 *
 * @author Juergen Hoeller
 * @since 2.0
 * @see commonj.timers.TimerListener
 * @see java.lang.Runnable
 * @deprecated as of 5.1, in favor of EE 7's
 * {@link org.springframework.scheduling.concurrent.DefaultManagedTaskScheduler}
 */
@Deprecated
public class DelegatingTimerListener implements TimerListener {

	private final Runnable runnable;


	/**
	 * Create a new DelegatingTimerListener.
	 * @param runnable the Runnable implementation to delegate to
	 */
	public DelegatingTimerListener(Runnable runnable) {
		Assert.notNull(runnable, "Runnable is required");
		this.runnable = runnable;
	}


	/**
	 * Delegates execution to the underlying Runnable.
	 */
	@Override
	public void timerExpired(Timer timer) {
		this.runnable.run();
	}

}
