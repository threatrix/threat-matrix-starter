/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/austin-technology/austin_magento_2/releases/tag/master-f890a0f
*    Source File: replace.js
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

'use strict';

var nlWin = '\r\n',
    nlUnix = '\n';

function findCopyright(lang, nlSys) {
    var copyrightText = {
        firstLine: 'Copyright © Magento, Inc. All rights reserved.',
        secondLine: 'See COPYING.txt for license details.'
    };
    switch (lang) {
        case 'less':
            return new RegExp(
                '// /\\*\\*' + nlSys + '//  \\* ' +
                copyrightText.firstLine +
                '' + nlSys + '//  \\* ' +
                copyrightText.secondLine +
                '' + nlSys + '//  \\*/' + nlSys + nlSys
            );
            break;
        default:
            return;
    }
}

module.exports = {
    documentation: {
        options: {
            patterns: [
                {
                    match: findCopyright('less', nlWin),
                    replacement: ''
                },
                {
                    match: findCopyright('less', nlUnix),
                    replacement: ''
                }
            ]
        },
        files: [{
            expand: true,
            flatten: true,
            src: [
                '<%= path.doc %>/source/**/*.less'
            ],
            dest: '<%= path.doc %>/source/'
        }]
    }

};
