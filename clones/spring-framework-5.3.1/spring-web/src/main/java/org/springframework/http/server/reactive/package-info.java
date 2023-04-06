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
 * Abstractions for reactive HTTP server support including a
 * {@link org.springframework.http.server.reactive.ServerHttpRequest} and
 * {@link org.springframework.http.server.reactive.ServerHttpResponse} along with an
 * {@link org.springframework.http.server.reactive.HttpHandler} for processing.
 *
 * <p>Also provides implementations adapting to different runtimes
 * including Servlet 3.1 containers, Netty + Reactor IO, and Undertow.
 */
@NonNullApi
@NonNullFields
package org.springframework.http.server.reactive;

import org.springframework.lang.NonNullApi;
import org.springframework.lang.NonNullFields;
