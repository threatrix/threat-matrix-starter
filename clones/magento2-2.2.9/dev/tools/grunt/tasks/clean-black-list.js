/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/ThanhTrungGVC/Magento/releases/tag/master-a4ece2d
*    Source File: clean-black-list.js
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

    var fs = require('fs'),
        _ = require('underscore'),
        glob = require('glob'),
        fst = require('../tools/fs-tools'),
        pc = require('../configs/path'),
        removeFromFile = function (path, files) {
            var data = _.difference(fst.getData(path), files);

            fst.write(path, data);
        };

    grunt.registerTask('clean-black-list', function () {
        process.chdir(grunt.option('dir') || '.');

        var filesToRemove = grunt.option('file').split(','),
            files = glob.sync(pc.static.blacklist + '*.txt');

        _.each(files, function (file) {
            removeFromFile(file, filesToRemove);
        });
    });
};
