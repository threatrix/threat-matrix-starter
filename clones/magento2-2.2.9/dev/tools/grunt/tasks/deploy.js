/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://magento.com
*    Release: https://github.com/magedin/magento-opensource-releases/releases/tag/latest
*    Source File: deploy.js
*    
*    Copyrights:
*      copyright © magento, inc. all rights reserved
*    
*    Licenses:
*      Open Software License 3.0
*      SPDXId: OSL-3.0
*    
*      Academic Free License v3.0
*      SPDXId: AFL-3.0
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
module.exports = function (grunt) {
    'use strict';

    var exec    = require('child_process').execSync,
        spawn   = require('child_process').spawn,
        log     = grunt.log.write,
        ok      = grunt.log.ok,
        error   = grunt.log.error;

    grunt.registerTask('deploy', function () {
        var deploy,
            done = this.async();

        log('Cleaning "pub/static"...');
        exec('rm -rf pub/static/*');
        ok('"pub/static" is empty.');

        log('Deploying Magento application...');
        deploy = spawn('php', ['bin/magento', 'setup:static-content:deploy', '-f']);

        deploy.stdout.on('data', function (data) {
            log(data);
        });

        deploy.stdin.on('data', function (data) {
            error(data);
        });

        deploy.on('close', done);
    });
};
