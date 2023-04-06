/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/huynhlehieunam/magento2_junior_exercise/releases/tag/master-77cfec5
*    Source File: usebanner.js
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

function printCopyright(lang) {
    var copyrightText = {
            firstLine: 'Copyright © Magento, Inc. All rights reserved.',
            secondLine: 'See COPYING.txt for license details.'
        },
        nlWin = '\r\n';
    switch (lang) {
        case 'css':
            return '/**' + nlWin + ' * ' + copyrightText.firstLine + nlWin + ' * ' + copyrightText.secondLine + nlWin + ' */' + nlWin;
            break;
        case 'less':
            return '// /**' + nlWin + '//  * ' + copyrightText.firstLine + nlWin + '//  * ' + copyrightText.secondLine + nlWin + '//  */' + nlWin;
            break;
        case 'html':
            return '<!--' + nlWin + '/**' + nlWin + ' * ' + copyrightText.firstLine + nlWin + ' * ' + copyrightText.secondLine + nlWin + ' */' + nlWin + '-->' + nlWin;
            break;
        default:
            return;
    }
}

module.exports = {
    options: {
        position: 'top',
        linebreak: true
    },
    setup: {
        options: {
            banner: printCopyright('css')
        },
        files: {
            src: '<%= path.css.setup %>/*.css'
        }
    },
    updater: {
        options: {
            banner: printCopyright('css')
        },
        files: {
            src: '<%= path.css.updater %>/updater.css'
        }
    },
    documentationCss: {
        options: {
            banner: printCopyright('css')
        },
        files: {
            src: '<%= path.doc %>/**/*.css'
        }
    },
    documentationLess: {
        options: {
            banner: printCopyright('less')
        },
        files: {
            src: '<%= path.doc %>/**/*.less'
        }
    },
    documentationHtml: {
        options: {
            banner: printCopyright('html')
        },
        files: {
            src: '<%= path.doc %>/**/*.html'
        }
    }
};
