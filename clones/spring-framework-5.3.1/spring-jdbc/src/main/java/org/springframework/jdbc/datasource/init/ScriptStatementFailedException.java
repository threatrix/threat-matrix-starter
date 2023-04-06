/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: ScriptStatementFailedException.java
*    
*    Copyrights:
*      copyright 2002-2015 the original author or authors
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
 * Copyright 2002-2015 the original author or authors.
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

package org.springframework.jdbc.datasource.init;

import org.springframework.core.io.support.EncodedResource;

/**
 * Thrown by {@link ScriptUtils} if a statement in an SQL script failed when
 * executing it against the target database.
 *
 * @author Juergen Hoeller
 * @author Sam Brannen
 * @since 3.0.5
 */
@SuppressWarnings("serial")
public class ScriptStatementFailedException extends ScriptException {

	/**
	 * Construct a new {@code ScriptStatementFailedException}.
	 * @param stmt the actual SQL statement that failed
	 * @param stmtNumber the statement number in the SQL script (i.e.,
	 * the n<sup>th</sup> statement present in the resource)
	 * @param encodedResource the resource from which the SQL statement was read
	 * @param cause the underlying cause of the failure
	 */
	public ScriptStatementFailedException(String stmt, int stmtNumber, EncodedResource encodedResource, Throwable cause) {
		super(buildErrorMessage(stmt, stmtNumber, encodedResource), cause);
	}


	/**
	 * Build an error message for an SQL script execution failure,
	 * based on the supplied arguments.
	 * @param stmt the actual SQL statement that failed
	 * @param stmtNumber the statement number in the SQL script (i.e.,
	 * the n<sup>th</sup> statement present in the resource)
	 * @param encodedResource the resource from which the SQL statement was read
	 * @return an error message suitable for an exception's <em>detail message</em>
	 * or logging
	 * @since 4.2
	 */
	public static String buildErrorMessage(String stmt, int stmtNumber, EncodedResource encodedResource) {
		return String.format("Failed to execute SQL script statement #%s of %s: %s", stmtNumber, encodedResource, stmt);
	}

}
