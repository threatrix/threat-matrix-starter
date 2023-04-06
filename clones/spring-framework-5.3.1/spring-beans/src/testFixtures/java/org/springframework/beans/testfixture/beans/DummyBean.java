/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.2.20.RELEASE
*    Source File: DummyBean.java
*    
*    Copyrights:
*      copyright 2002-2012 the original author or authors
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
 * Copyright 2002-2012 the original author or authors.
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
package org.springframework.beans.testfixture.beans;

/**
 * @author Costin Leau
 */
public class DummyBean {

	private Object value;
	private String name;
	private int age;
	private TestBean spouse;

	public DummyBean(Object value) {
		this.value = value;
	}

	public DummyBean(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public DummyBean(int ageRef, String nameRef) {
		this.name = nameRef;
		this.age = ageRef;
	}

	public DummyBean(String name, TestBean spouse) {
		this.name = name;
		this.spouse = spouse;
	}

	public DummyBean(String name, Object value, int age) {
		this.name = name;
		this.value = value;
		this.age = age;
	}

	public Object getValue() {
		return value;
	}

	public String getName() {
		return name;
	}

	public int getAge() {
		return age;
	}

	public TestBean getSpouse() {
		return spouse;
	}
}
