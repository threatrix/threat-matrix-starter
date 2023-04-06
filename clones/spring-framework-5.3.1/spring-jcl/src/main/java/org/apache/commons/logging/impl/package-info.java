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
 * Spring's variant of the
 * <a href="https://commons.apache.org/logging">Commons Logging API</a>:
 * with special support for Log4J 2, SLF4J and {@code java.util.logging}.
 *
 * <p>This {@code impl} package is only present for binary compatibility
 * with existing Commons Logging usage, e.g. in Commons Configuration.
 * {@code NoOpLog} can be used as a {@code Log} fallback instance, and
 * {@code SimpleLog} is not meant to work (issuing a warning when used).
 */
package org.apache.commons.logging.impl;
