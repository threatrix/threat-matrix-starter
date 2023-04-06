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
 * Support for handling messages to "user" destinations (i.e. destinations that are
 * unique to a user's sessions), primarily translating the destinations and then
 * forwarding the updated message to the broker.
 *
 * <p>Also included is {@link org.springframework.messaging.simp.user.SimpUserRegistry}
 * for keeping track of connected user sessions.
 */
@NonNullApi
@NonNullFields
package org.springframework.messaging.simp.user;

import org.springframework.lang.NonNullApi;
import org.springframework.lang.NonNullFields;
