/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/thangtran29/magento24cicd/releases/tag/master-61527b7
*    Source File: ext-tree-checkbox.js
*    
*    Copyrights:
*      copyright (c) sebastian bergmann <sebastian@phpunit.de>
*      copyright 2020 (c) jeroen van den enden
*      copyright (c) 2020-present [open-source contributors](https://github.com/php-webdriver/php-webdriver/graphs/contributors)
*      copyright (c) 2015 aaron scherer, tobias nyholm
*      copyright (c) 2017 arne blankerts <arne@blankerts.de> and contributors
*      copyright (c) 2016 arne blankerts <arne@blankerts.de>, sebastian heuer <sebastian@phpeople.de>, sebastian bergmann <sebastia
*      copyright (c) 2017, ben scholzen 'dasprid
*      copyright (c) 2014 bernhard schussek
*      copyright (c) 2017 braintree, a division of paypal, inc
*      copyright (c) 2013, colin mollenhour
*      copyright  copyright (c) 2012 colin mollenhour (http://colin.mollenhour.com)
*      copyright (c) 2011 colin mollenhour <colin@mollenhour.com>
*      copyright (c) 2015 composer
*      (c) 2013 david desberg <david@daviddesberg.com>
*      copyright (c) 2016 dotdigital group plc
*      copyright (c) 2007 free software foundation, inc. <http://fsf.org/>
*      copyright (c) 2007 free software foundation, inc. <http://fsf.org/> everyone is permitted to copy and distribute verbatim co
*      copyright (c) 2019, google inc
*      copyright (c) 2013 jesse g. donat
*      copyright (c) 2018 johannes m. schmitt
*      copyright (c) 2009 justin poliey <jdp34@njit.edu>
*      copyright (c) 2020 laminas project a series of lf projects, llc
*      copyright (c) 2020 laminas project a series of lf projects, llc. (https://getlaminas.org/)
*      copyright (c) 2005 lawrence rosen. permission is granted to copy, distribute, or communicate this license without modificati
*      copyright �� 2005 lawrence rosen. permission is granted to copy, distribute, or communicate this license without modificatio
*      copyright � 2005 lawrence rosen. permission is granted to copy, distribute, or communicate this license without modification
*      copyright (c) 2008, manuel pichler
*      copyright (c) 2015 maxim kott
*      copyright (c) 2011 michael bodnarchuk and contributors
*      copyright (c) 2014 michael dowling, https://github.com/mtdowling
*      copyright (c) 2010 mike van riel
*      copyright (c) 2015 my c-labs
*      copyright (c) 2013 my c-sense
*      copyright (c) 2016 ond��ej mirtes
*      copyright treaty adopted on 20 december 1996, or similar laws prohibiting or restricting circumvention of such measures
*      copyright (c) 2007, parakey inc
*      copyright (c) 2016 php framework interoperability group
*      copyright (c) 2015 phpdocumentor
*      (c) 2013 pieter hordijk <info@pieterhordijk.com>
*      copyright (c) 2014 ralph khattar
*      copyright (c) 2009, robert hafner
*      copyright 2017 smartbear software
*      copyright (c) 2012, squiz pty ltd (abn 77 084 670 600)
*      copyright (c) 2014 steve thomas
*      copyright treaty of 1996, the wipo performances and phonograms treaty of 1996 and the universal copyright convention (as rev
*      copyright (c) 2018 thecodingmachine
*      copyright (c) 2014 trueserver b.v
*      copyright (c) 2013, vance lucas
*      copyright (c) 2015-present, webonyx, llc
*      copyright 2014 yandex llc
*      copyright (c) 2017 yaroslav lukyanov
*      copyright �� 2018 yotpo. all rights reserved
*      copyright (c) 1991, 1999 free software foundation, inc
*      copyright (c) 2010-2012 arne blankerts <arne@blankerts.de>
*      copyright (c) 1999 - 2012 the php group. all rights reserved
*      copyright (c) 2011-2013, benjamin eberlei
*      copyright (c) 2011-2013 konstantin kudryashov <ever.zet@gmail.com>
*      copyright 2010-2014 amazon.com, inc. or its affiliates. all rights reserved
*      copyright (c) 2013-2014 christian riesen
*      copyright (c) 2007-2015, frank kleine
*      copyright (c) 2010-2015 justin hileman
*      copyright (c) 2005-2015, zend technologies usa, inc
*      copyright (c) 2015 - 2016 aaron scherer
*      copyright (c) 2013 container-interop
*      copyright 2013-2016 elasticsearch
*      copyright (c) 2014-2016 florent morselli
*      copyright (c) 2012-2016 jan sorgalla
*      copyright (c) 2011-2016 jordi boggiano
*      copyright (c) 2016-2017 arne blankerts <arne@blankerts.de>, sebastian heuer <sebastian@phpeople.de> and contributors
*      copyright (c) 2012-2018 ben ramsey <ben@benramsey.com>
*      copyright (c) 2016-2018 dealerdirect b.v
*      copyright (c) 2006-2018 doctrine project
*      copyright (c) 2014 michael dowling, https://github.com/mtdowling <mtdowling@gmail.com>
*      copyright (c) 2015 paragon initiative enterprises
*      copyright (c) 2008-2018 pelago
*      copyright (c) 2016
*      copyright (c) 2018-2019 fabien potencier and trevor rowbotham <trevor.rowbotham@pm.me>
*      copyright (c) 2013-2019 frank de jonge
*      copyright (c) 2011-2019 terrafrost and other contributors
*      copyright (c) 2004-2020 fabien potencier
*      copyright (c) 2004-2020 facebook
*      copyright (c) 2019, laminas foundation
*      copyright (c) 2009-2020, sebastian bergmann <sebastian@phpunit.de>
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
 * Retrieve an array of ids of checked nodes
 * @return {Array} array of ids of checked nodes
 */
Ext.tree.TreePanel.prototype.getChecked = function(node){
    var checked = [], i;
    if( typeof node == 'undefined' ) {
        //node = this.rootVisible ? this.getRootNode() : this.getRootNode().firstChild;
        node = this.getRootNode();
    }

    if( node.attributes.checked ) {
        checked.push(node.id);
    }
    if( node.childNodes.length ) {
        for( i = 0; i < node.childNodes.length; i++ ) {
            checked = checked.concat( this.getChecked(node.childNodes[i]) );
        }
    }

    return checked;
};

/**
 * @class Ext.tree.CustomUITreeLoader
 * @extends Ext.tree.TreeLoader
 * Overrides createNode to force uiProvider to be an arbitrary TreeNodeUI to save bandwidth
 */
Ext.tree.CustomUITreeLoader = function() {
    Ext.tree.CustomUITreeLoader.superclass.constructor.apply(this, arguments);
};

Ext.extend(Ext.tree.CustomUITreeLoader, Ext.tree.TreeLoader, {
    createNode : function(attr){
        Ext.apply(attr, this.baseAttr || {});

        if(this.applyLoader !== false){
            attr.loader = this;
        }

        if(typeof attr.uiProvider == 'string'){
            attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
        }

        return(attr.leaf ?
            new Ext.tree.TreeNode(attr) :
                new Ext.tree.AsyncTreeNode(attr));
    }
});


/**
 * @class Ext.tree.CheckboxNodeUI
 * @extends Ext.tree.TreeNodeUI
 * Adds a checkbox to all nodes
 */
Ext.tree.CheckboxNodeUI = function() {
    Ext.tree.CheckboxNodeUI.superclass.constructor.apply(this, arguments);
};

Ext.extend(Ext.tree.CheckboxNodeUI, Ext.tree.TreeNodeUI, {
    /**
     * This is virtually identical to Ext.tree.TreeNodeUI.render, modifications are indicated inline
     */
    render : function(bulkRender){
        var n = this.node;
        var targetNode = n.parentNode ?
            n.parentNode.ui.getContainer() : n.ownerTree.container.dom; /* in later svn builds this changes to n.ownerTree.innerCt.dom */
        if(!this.rendered){
            this.rendered = true;
            var a = n.attributes;

            // add some indent caching, this helps performance when rendering a large tree
            this.indentMarkup = "";
            if(n.parentNode){
                this.indentMarkup = n.parentNode.ui.getChildIndent();
            }

            // modification: added checkbox
            var buf = ['<li class="x-tree-node"><div class="x-tree-node-el ', n.attributes.cls,'">',
                '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
                '<img src="', this.emptyIcon, '" class="x-tree-ec-icon">',
                '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on">',
                '<input class="l-tcb" '+ (n.disabled ? 'disabled="disabled" ' : '') +' type="checkbox" ', (a.checked ? "checked>" : '>'),
                '<a hidefocus="on" href="',a.href ? a.href : "#",'" ',
                 a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '>',
                 '<span unselectable="on">',n.text,"</span></a></div>",
                '<ul class="x-tree-node-ct" style="display:none;"></ul>',
                "</li>"];

            if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
                this.wrap = Ext.DomHelper.insertHtml("beforeBegin",
                                                            n.nextSibling.ui.getEl(), buf.join(""));
            }else{
                this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
            }
            this.elNode = this.wrap.childNodes[0];
            this.ctNode = this.wrap.childNodes[1];
            var cs = this.elNode.childNodes;
            this.indentNode = cs[0];
            this.ecNode = cs[1];
            this.iconNode = cs[2];
            this.checkbox = cs[3]; // modification: inserted checkbox
            this.anchor = cs[4];
            this.textNode = cs[4].firstChild;
            if(a.qtip){
             if(this.textNode.setAttributeNS){
                 this.textNode.setAttributeNS("ext", "qtip", a.qtip);
                 if(a.qtipTitle){
                     this.textNode.setAttributeNS("ext", "qtitle", a.qtipTitle);
                 }
             }else{
                 this.textNode.setAttribute("ext:qtip", a.qtip);
                 if(a.qtipTitle){
                     this.textNode.setAttribute("ext:qtitle", a.qtipTitle);
                 }
             }
            } else if(a.qtipCfg) {
                a.qtipCfg.target = Ext.id(this.textNode);
                Ext.QuickTips.register(a.qtipCfg);
            }

            this.initEvents();

            // modification: Add additional handlers here to avoid modifying Ext.tree.TreeNodeUI
            Ext.fly(this.checkbox).on('click', this.check.createDelegate(this, [null]));
            n.on('dblclick', function(e) {
                if( this.isLeaf() ) {
                    this.getUI().toggleCheck();
                }
            });

            if(!this.node.expanded){
                this.updateExpandIcon();
            }
        }else{
            if(bulkRender === true) {
                targetNode.appendChild(this.wrap);
            }
        }
    },

    checked : function() {
        return this.checkbox.checked;
    },

    /**
     * Sets a checkbox appropriately.  By default only walks down through child nodes
     * if called with no arguments (onchange event from the checkbox), otherwise
     * it's assumed the call is being made programatically and the correct arguments are provided.
     * @param {Boolean} state true to check the checkbox, false to clear it. (defaults to the opposite of the checkbox.checked)
     * @param {Boolean} descend true to walk through the nodes children and set their checkbox values. (defaults to false)
     */
    check : function(state, descend, bulk) {
        if (this.node.disabled) {
            return;
        }
        var n = this.node;
        var tree = n.getOwnerTree();
        var parentNode = n.parentNode;n
        if( !n.expanded && !n.childrenRendered ) {
            n.expand(false, false, this.check.createDelegate(this, arguments));
        }

        if( typeof bulk == 'undefined' ) {
            bulk = false;
        }
        if( typeof state == 'undefined' || state === null ) {
            state = this.checkbox.checked;
            descend = !state;
            if( state ) {
                n.expand(false, false);
            }
        } else {
            this.checkbox.checked = state;
        }
        n.attributes.checked = state;

        // do we have parents?
        if( parentNode !== null && state ) {
            // if we're checking the box, check it all the way up
            if( parentNode.getUI().check ) {
                //parentNode.getUI().check(state, false, true);
            }
        }
        if( descend && !n.isLeaf() ) {
            var cs = n.childNodes;
      for(var i = 0; i < cs.length; i++) {
        //cs[i].getUI().check(state, true, true);
      }
        }
        if( !bulk ) {
            tree.fireEvent('check', n, state);
        }
    },

    toggleCheck : function(state) {
        this.check(!this.checkbox.checked, true);
    }

});


/**
 * @class Ext.tree.CheckNodeMultiSelectionModel
 * @extends Ext.tree.MultiSelectionModel
 * Multi selection for a TreePanel containing Ext.tree.CheckboxNodeUI.
 * Adds enhanced selection routines for selecting multiple items
 * and key processing to check/clear checkboxes.
 */
Ext.tree.CheckNodeMultiSelectionModel = function(){
   Ext.tree.CheckNodeMultiSelectionModel.superclass.constructor.call(this);
};

Ext.extend(Ext.tree.CheckNodeMultiSelectionModel, Ext.tree.MultiSelectionModel, {
    init : function(tree){
        this.tree = tree;
        tree.el.on("keydown", this.onKeyDown, this);
        tree.on("click", this.onNodeClick, this);
    },

    /**
     * Handle a node click
     * If ctrl key is down and node is selected will unselect the node.
     * If the shift key is down it will create a contiguous selection
     * (see {@link Ext.tree.CheckNodeMultiSelectionModel#extendSelection} for the limitations)
     */
    onNodeClick : function(node, e){
        if (node.disabled) {
            return;
        }
        if( e.shiftKey && this.extendSelection(node) ) {
            return true;
        }
        if( e.ctrlKey && this.isSelected(node) ) {
            this.unselect(node);
        } else {
            this.select(node, e, e.ctrlKey);
        }
    },

    /**
     * Selects all nodes between the previously selected node and the one that the user has just selected.
     * Will not span multiple depths, so only children of the same parent will be selected.
     */
    extendSelection : function(node) {
        var last = this.lastSelNode;
        if( node == last || !last ) {
            return false; /* same selection, process normally normally */
        }

        if( node.parentNode == last.parentNode ) {
            var cs = node.parentNode.childNodes;
            var i = 0, attr='id', selecting=false, lastSelect=false;
            this.clearSelections(true);
            for( i = 0; i < cs.length; i++ ) {
                // We have to traverse the entire tree b/c don't know of a way to find
                // a numerical representation of a nodes position in a tree.
                if( cs[i].attributes[attr] == last.attributes[attr] || cs[i].attributes[attr] == node.attributes[attr] ) {
                    // lastSelect ensures that we select the final node in the list
                    lastSelect = selecting;
                    selecting = !selecting;
                }
                if( selecting || lastSelect ) {
                    this.select(cs[i], null, true);
                    // if we're selecting the last node break to avoid traversing the entire tree
                    if( lastSelect ) {
                        break;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    },

    /**
     * Traps the press of the SPACE bar and sets the check state of selected nodes to the opposite state of
     * the selected or last selected node.  Assume you have the following five Ext.tree.CheckboxNodeUIs:
     * [X] One, [X] Two, [X] Three, [ ] Four, [ ] Five
     * If you select them in this order: One, Two, Three, Four, Five and press the space bar they all
     * will be <b>checked</b> (the opposite of the checkbox state of Five).
     * If you select them in this order: Five, Four, Three, Two, One and press the space bar they all
     * will be <b>unchecked</b> which is the opposite of the checkbox state of One.
     */
    onKeyDown : Ext.tree.DefaultSelectionModel.prototype.onKeyDown.createInterceptor(function(e) {
        var s = this.selNode || this.lastSelNode;
        // undesirable, but required
        var sm = this;
        if(!s){
            return;
        }
        var k = e.getKey();
        switch(k){
                case e.SPACE:
                    e.stopEvent();
                    var sel = this.getSelectedNodes();
                    var state = !s.getUI().checked();
                    if( sel.length == 1 ) {
                        s.getUI().check(state, !s.isLeaf());
                    } else {
                        for( var i = 0; i < sel.length; i++ ) {
                            sel[i].getUI().check(state, !sel[i].isLeaf() );
                        }
                    }
            break;
        }

        return true;
    })
});
