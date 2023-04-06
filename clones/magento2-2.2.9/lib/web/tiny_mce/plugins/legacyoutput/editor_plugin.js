/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/gauravnewton/excellencetechnologies-magento-2.2.8/releases/tag/master-ea9a077
*    Source File: editor_plugin.js
*    
*    Copyrights:
*      copyright (c) <year>  <name of author>
*      copyright (c) 2005 lawrence rosen. permission is granted to copy, distribute, or communicate this license without modificati
*      copyright �� 2005 lawrence rosen. permission is granted to copy, distribute, or communicate this license without modificatio
*      copyright (c) 2007, parakey inc
*      copyright year from 2017 to 2018. (by @bhargavmehta)
*      copyright (c) 1991, 1999 free software foundation, inc
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
(function(a){a.onAddEditor.addToTop(function(c,b){b.settings.inline_styles=false});a.create("tinymce.plugins.LegacyOutput",{init:function(b){b.onInit.add(function(){var c="p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",e=a.explode(b.settings.font_size_style_values),d=b.schema;b.formatter.register({alignleft:{selector:c,attributes:{align:"left"}},aligncenter:{selector:c,attributes:{align:"center"}},alignright:{selector:c,attributes:{align:"right"}},alignfull:{selector:c,attributes:{align:"justify"}},bold:[{inline:"b",remove:"all"},{inline:"strong",remove:"all"},{inline:"span",styles:{fontWeight:"bold"}}],italic:[{inline:"i",remove:"all"},{inline:"em",remove:"all"},{inline:"span",styles:{fontStyle:"italic"}}],underline:[{inline:"u",remove:"all"},{inline:"span",styles:{textDecoration:"underline"},exact:true}],strikethrough:[{inline:"strike",remove:"all"},{inline:"span",styles:{textDecoration:"line-through"},exact:true}],fontname:{inline:"font",attributes:{face:"%value"}},fontsize:{inline:"font",attributes:{size:function(f){return a.inArray(e,f.value)+1}}},forecolor:{inline:"font",styles:{color:"%value"}},hilitecolor:{inline:"font",styles:{backgroundColor:"%value"}}});a.each("b,i,u,strike".split(","),function(f){d.addValidElements(f+"[*]")});if(!d.getElementRule("font")){d.addValidElements("font[face|size|color|style]")}a.each(c.split(","),function(f){var h=d.getElementRule(f),g;if(h){if(!h.attributes.align){h.attributes.align={};h.attributesOrder.push("align")}}});b.onNodeChange.add(function(g,k){var j,f,h,i;f=g.dom.getParent(g.selection.getNode(),"font");if(f){h=f.face;i=f.size}if(j=k.get("fontselect")){j.select(function(l){return l==h})}if(j=k.get("fontsizeselect")){j.select(function(m){var l=a.inArray(e,m.fontSize);return l+1==i})}})})},getInfo:function(){return{longname:"LegacyOutput",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/legacyoutput",version:a.majorVersion+"."+a.minorVersion}}});a.PluginManager.add("legacyoutput",a.plugins.LegacyOutput)})(tinymce);