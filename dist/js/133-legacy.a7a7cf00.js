"use strict";(self["webpackChunkwore_house_orders"]=self["webpackChunkwore_house_orders"]||[]).push([[133],{3133:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"measure-map"},[a("div",{staticClass:"map-box"},[a("div",{staticClass:"container",attrs:{id:"container"}}),a("div",{staticClass:"input-card",staticStyle:{width:"19rem"}},[e._m(0),a("div",{staticClass:"input-item"},[a("input",{staticClass:"btn",attrs:{id:"close",type:"button",value:"关闭"},on:{click:e.close}})])])])])},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"input-item"},[a("input",{attrs:{type:"radio",name:"func",checked:"",value:"rule"}}),a("span",{staticClass:"input-text"},[e._v("距离测量")]),a("input",{attrs:{type:"radio",name:"func",value:"measureArea"}}),a("span",{staticClass:"input-text"},[e._v("面积测量")])])}],n=(a(1249),{data:function(){return{map:null,mouseTool:null,radios:null}},mounted:function(){this.initMap(),this.getRad(),this.draw("rule")},methods:{initMap:function(){this.map=new AMap.Map("container",{resizeEnable:!0,zoom:5,zooms:[4,30],center:[118.759661,32.055674],viewMode:"3D",lang:this.lang,mapStyle:"amap://styles/macaron",infoWindow:null}),this.mouseTool=new AMap.MouseTool(this.map)},draw:function(e){switch(e){case"rule":this.mouseTool.rule({startMarkerOptions:{icon:new AMap.Icon({size:new AMap.Size(19,31),imageSize:new AMap.Size(19,31),image:"//webapi.amap.com/theme/v1.3/markers/b/start.png"}),offset:new AMap.Pixel(-9,-31)},endMarkerOptions:{icon:new AMap.Icon({size:new AMap.Size(19,31),imageSize:new AMap.Size(19,31),image:"//webapi.amap.com/theme/v1.3/markers/b/end.png"}),offset:new AMap.Pixel(-9,-31)},midMarkerOptions:{icon:new AMap.Icon({size:new AMap.Size(19,31),imageSize:new AMap.Size(19,31),image:"//webapi.amap.com/theme/v1.3/markers/b/mid.png"}),offset:new AMap.Pixel(-9,-31)},lineOptions:{strokeStyle:"solid",strokeColor:"#FF33FF",strokeOpacity:1,strokeWeight:2}});break;case"measureArea":this.mouseTool.measureArea({strokeColor:"#80d8ff",fillColor:"#80d8ff",fillOpacity:.3});break}},getRad:function(){var e=this;this.radios=document.getElementsByName("func");for(var t=0;t<this.radios.length;t+=1)this.radios[t].onchange=function(t){e.draw(t.target.value)}},close:function(){this.mouseTool.close(!0);for(var e=0;e<this.radios.length;e+=1)this.radios[e].checked=!1}}}),o=n,r=a(1001),l=(0,r.Z)(o,i,s,!1,null,"5435e2bc",null),c=l.exports}}]);
//# sourceMappingURL=133-legacy.a7a7cf00.js.map