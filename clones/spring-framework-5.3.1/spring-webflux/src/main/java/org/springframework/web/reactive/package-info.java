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
 * Top-level package for the {@code spring-webflux} module that contains
 * {@link org.springframework.web.reactive.DispatcherHandler}, the main entry
 * point for WebFlux server endpoint processing including key contracts used to
 * map requests to handlers, invoke them, and process the result.
 *
 * <p>The module provides two programming models for reactive server endpoints.
 * One based on annotated {@code @Controller}'s and another based on functional
 * routing and handling. The module also contains a functional, reactive
 * {@code WebClient} as well as client and server, reactive WebSocket support.
 */
@NonNullApi
@NonNullFields
package org.springframework.web.reactive;

import org.springframework.lang.NonNullApi;
import org.springframework.lang.NonNullFields;
