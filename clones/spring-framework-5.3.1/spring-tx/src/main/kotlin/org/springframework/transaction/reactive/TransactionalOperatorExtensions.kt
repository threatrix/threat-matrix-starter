/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://spring.io/projects/spring-framework
*    Release: https://github.com/spring-projects/spring-framework/releases/tag/v5.3.18
*    Source File: TransactionalOperatorExtensions.kt
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
package org.springframework.transaction.reactive

import java.util.Optional
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.reactive.asFlow
import kotlinx.coroutines.reactive.awaitLast
import kotlinx.coroutines.reactor.asFlux
import kotlinx.coroutines.reactor.mono
import org.springframework.transaction.ReactiveTransaction

/**
 * Coroutines variant of [TransactionalOperator.transactional] as a [Flow] extension.
 *
 * @author Sebastien Deleuze
 * @since 5.2
 */
fun <T : Any> Flow<T>.transactional(operator: TransactionalOperator): Flow<T> =
		operator.transactional(asFlux()).asFlow()

/**
* Coroutines variant of [TransactionalOperator.execute] with a suspending lambda
* parameter.
*
* @author Sebastien Deleuze
* @author Mark Paluch
* @since 5.2
*/
suspend fun <T : Any> TransactionalOperator.executeAndAwait(f: suspend (ReactiveTransaction) -> T?): T? =
		execute { status -> mono(Dispatchers.Unconfined) { f(status) } }.map { value -> Optional.of(value) }
				.defaultIfEmpty(Optional.empty()).awaitLast().orElse(null)
