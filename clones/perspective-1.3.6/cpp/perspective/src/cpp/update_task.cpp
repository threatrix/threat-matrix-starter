/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

#include <perspective/first.h>
#include <perspective/pool.h>
#include <perspective/update_task.h>

namespace perspective {
t_update_task::t_update_task(t_pool& pool)
    : m_pool(pool) {}

void
t_update_task::run() {
    auto work_to_do = m_pool.m_data_remaining.load();
    m_pool.m_data_remaining.store(false);

    if (work_to_do) {
        for (auto g : m_pool.m_gnodes) {
            if (g) {
                t_uindex num_input_ports = g->num_input_ports();

                // Call process for each port, and notify the updates from
                // each port individually.
                for (t_uindex port_id = 0; port_id < num_input_ports;
                     ++port_id) {
                    bool did_notify_context = g->process(port_id);
                    if (did_notify_context) {
                        m_pool.notify_userspace(port_id);
                    }
                    g->clear_output_ports();
                }
            }
        }
    }

    m_pool.inc_epoch();
}
} // end namespace perspective
