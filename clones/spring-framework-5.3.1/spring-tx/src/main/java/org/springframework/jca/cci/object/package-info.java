/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: package-info.java
*    
*    Copyrights:
*      copyright 2002-201/ the original author or authors
*      copyright (c) 2000-2011 inria, france telecom
*      copyright 2002-2017 the original author or authors.7
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
/**
 * The classes in this package represent EIS operations as threadsafe,
 * reusable objects. This higher level of CCI abstraction depends on the
 * lower-level abstraction in the {@code org.springframework.jca.cci.core} package.
 * Exceptions thrown are as in the {@code org.springframework.dao} package,
 * meaning that code using this package does not need to worry about error handling.
 */
@NonNullApi
@NonNullFields
package org.springframework.jca.cci.object;

import org.springframework.lang.NonNullApi;
import org.springframework.lang.NonNullFields;
