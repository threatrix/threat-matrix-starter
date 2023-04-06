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
 * This package contains classes that allow easy access to EJBs.
 * The basis are AOP interceptors run before and after the EJB invocation.
 * In particular, the classes in this package allow transparent access
 * to stateless session beans (SLSBs) with local interfaces, avoiding
 * the need for application code using them to use EJB-specific APIs
 * and JNDI lookups, and work with business interfaces that could be
 * implemented without using EJB. This provides a valuable decoupling
 * of client (such as web components) and business objects (which may
 * or may not be EJBs). This gives us the choice of introducing EJB
 * into an application (or removing EJB from an application) without
 * affecting code using business objects.
 *
 * <p>The motivation for the classes in this package is discussed in Chapter 11 of
 * <a href="https://www.amazon.com/exec/obidos/tg/detail/-/0764543857/">Expert One-On-One J2EE Design and Development</a>
 * by Rod Johnson (Wrox, 2002).
 *
 * <p>However, the implementation and naming of classes in this package has changed.
 * It now uses FactoryBeans and AOP, rather than the custom bean definitions described in
 * <i>Expert One-on-One J2EE</i>.
 */
@NonNullApi
@NonNullFields
package org.springframework.ejb.access;

import org.springframework.lang.NonNullApi;
import org.springframework.lang.NonNullFields;
