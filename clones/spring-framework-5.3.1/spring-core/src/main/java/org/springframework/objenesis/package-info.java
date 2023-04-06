/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.3.5
*    Source File: package-info.java
*    
*    Copyrights:
*      copyright 2002,2003,2004 the apache software foundation
*      copyright 2003,2004 the apache software foundation
*      copyright (c) 2000-2011 inria, france telecom
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
/**
 * Spring's repackaging of
 * <a href="http://objenesis.org">Objenesis 3.0</a>
 * (with SpringObjenesis entry point; for internal use only).
 *
 * <p>This repackaging technique avoids any potential conflicts with
 * dependencies on different Objenesis versions at the application
 * level or from third-party libraries and frameworks.
 *
 * <p>As this repackaging happens at the class file level, sources
 * and javadocs are not available here. See the original
 * <a href="http://objenesis.org/tutorial.html">Objenesis docs</a>
 * for details when working with these classes.
 */
package org.springframework.objenesis;
