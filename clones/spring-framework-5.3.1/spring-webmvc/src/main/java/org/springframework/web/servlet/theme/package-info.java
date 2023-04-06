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
 * Theme support classes for Spring's web MVC framework.
 * Provides standard ThemeResolver implementations,
 * and a HandlerInterceptor for theme changes.
 *
 * <p>
 * <ul>
 * <li>If you don't provide a bean of one of these classes as {@code themeResolver},
 * a {@code FixedThemeResolver} will be provided with the default theme name 'theme'.</li>
 * <li>If you use a defined {@code FixedThemeResolver}, you will able to use another theme
 * name for default, but the users will stick on this theme.</li>
 * <li>With a {@code CookieThemeResolver} or {@code SessionThemeResolver}, you can allow
 * the user to change his current theme.</li>
 * <li>Generally, you will put in the themes resource bundles the paths of CSS files, images and HTML constructs.</li>
 * <li>For retrieving themes data, you can either use the spring:theme tag in JSP or access via the
 * {@code RequestContext} for other view technologies.</li>
 * <li>The {@code pagedlist} demo application uses themes</li>
 * </ul>
 */
@NonNullApi
@NonNullFields
package org.springframework.web.servlet.theme;

import org.springframework.lang.NonNullApi;
import org.springframework.lang.NonNullFields;
