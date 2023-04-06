/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: JmxMetadataUtils.java
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

package org.springframework.jmx.export.metadata;

import javax.management.modelmbean.ModelMBeanNotificationInfo;

import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

/**
 * Utility methods for converting Spring JMX metadata into their plain JMX equivalents.
 *
 * @author Rob Harrop
 * @author Juergen Hoeller
 * @since 2.0
 */
public abstract class JmxMetadataUtils {

	/**
	 * Convert the supplied {@link ManagedNotification} into the corresponding
	 * {@link javax.management.modelmbean.ModelMBeanNotificationInfo}.
	 */
	public static ModelMBeanNotificationInfo convertToModelMBeanNotificationInfo(ManagedNotification notificationInfo) {
		String[] notifTypes = notificationInfo.getNotificationTypes();
		if (ObjectUtils.isEmpty(notifTypes)) {
			throw new IllegalArgumentException("Must specify at least one notification type");
		}

		String name = notificationInfo.getName();
		if (!StringUtils.hasText(name)) {
			throw new IllegalArgumentException("Must specify notification name");
		}

		String description = notificationInfo.getDescription();
		return new ModelMBeanNotificationInfo(notifTypes, name, description);
	}

}
