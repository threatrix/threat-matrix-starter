/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: TransactionSystemException.java
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

package org.springframework.transaction;

import org.springframework.lang.Nullable;
import org.springframework.util.Assert;

/**
 * Exception thrown when a general transaction system error is encountered,
 * like on commit or rollback.
 *
 * @author Juergen Hoeller
 * @since 24.03.2003
 */
@SuppressWarnings("serial")
public class TransactionSystemException extends TransactionException {

	@Nullable
	private Throwable applicationException;


	/**
	 * Constructor for TransactionSystemException.
	 * @param msg the detail message
	 */
	public TransactionSystemException(String msg) {
		super(msg);
	}

	/**
	 * Constructor for TransactionSystemException.
	 * @param msg the detail message
	 * @param cause the root cause from the transaction API in use
	 */
	public TransactionSystemException(String msg, Throwable cause) {
		super(msg, cause);
	}


	/**
	 * Set an application exception that was thrown before this transaction exception,
	 * preserving the original exception despite the overriding TransactionSystemException.
	 * @param ex the application exception
	 * @throws IllegalStateException if this TransactionSystemException already holds an
	 * application exception
	 */
	public void initApplicationException(Throwable ex) {
		Assert.notNull(ex, "Application exception must not be null");
		if (this.applicationException != null) {
			throw new IllegalStateException("Already holding an application exception: " + this.applicationException);
		}
		this.applicationException = ex;
	}

	/**
	 * Return the application exception that was thrown before this transaction exception,
	 * if any.
	 * @return the application exception, or {@code null} if none set
	 */
	@Nullable
	public final Throwable getApplicationException() {
		return this.applicationException;
	}

	/**
	 * Return the exception that was the first to be thrown within the failed transaction:
	 * i.e. the application exception, if any, or the TransactionSystemException's own cause.
	 * @return the original exception, or {@code null} if there was none
	 */
	@Nullable
	public Throwable getOriginalException() {
		return (this.applicationException != null ? this.applicationException : getCause());
	}

	@Override
	public boolean contains(@Nullable Class<?> exType) {
		return super.contains(exType) || (exType != null && exType.isInstance(this.applicationException));
	}

}
