"use strict";(self["webpackChunkwore_house_orders"]=self["webpackChunkwore_house_orders"]||[]).push([[947],{9947:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"WareHouseMain"},[e._m(0),a("div",{staticClass:"input-card-box"},[a("div",{staticClass:"input-item"},[a("input",{attrs:{type:"checkbox"},on:{click:function(t){return e.toggleScale()}}}),e._v("比例尺 ")]),a("div",{staticClass:"input-item"},[a("input",{attrs:{type:"checkbox",id:"toolbar"},on:{click:function(t){return e.toggleToolBar()}}}),e._v("工具条 ")]),a("div",{staticClass:"mapImg"},[e.isOrdMap?a("el-button",{attrs:{type:"primary"},on:{click:e.addRoadLayer}},[e._v("打开卫星图层")]):a("el-button",{attrs:{type:"primary"},on:{click:e.removeSatellite}},[e._v("关闭卫星图层")])],1)])])},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"map-box"},[a("div",{staticClass:"container",attrs:{id:"container"}})])}],o=a(4665),n={name:"WareHouseMain",data(){return{map:"",lang:"zh_cn",zoom:10,title:"",content:[],infoWindow:null,markers:[],scale:null,isScale:!1,toolBar:null,isToolBar:!1,overView:null,isoverView:!1,satellite:null,isOrdMap:!0,newfireData:[],layer:null,list:[]}},components:{},computed:{...(0,o.rn)(["fireData"])},mounted(){this.initMap(),this.addMarker()},async created(){console.log(this.fireData)},methods:{initMap(){this.map=new AMap.Map("container",{resizeEnable:!0,zoom:this.zoom,zooms:[7,30],center:[102.379164,27.853739],viewMode:"3D",lang:this.lang,mapStyle:"amap://styles/macaron",infoWindow:null}),this.scale=new AMap.Scale({visible:!1}),this.map.addControl(this.scale),this.toolBar=new AMap.ToolBar({visible:!1,position:{top:"110px",right:"40px"}}),this.map.addControl(this.toolBar)},toggleScale(){this.isScale?(this.isScale=!1,this.scale.hide()):(this.isScale=!0,this.scale.show())},toggleToolBar(){this.isToolBar?(this.isToolBar=!1,this.toolBar.hide()):(this.isToolBar=!0,this.toolBar.show())},async addMarker(){this.$message({message:"火灾救援人员热力图绘制中，初次加载可能用时较长"}),this.newfireData=this.fireData.map((e=>({...e,coordinate:[e.jing,e.wei]}))),this.list=this.newfireData.map((e=>({coordinate:e.coordinate,count:e.fmen+30}))),this.layer=new Loca.HeatmapLayer({map:this.map,fitView:!0}),console.log(this.list),this.layer.setData(this.list,{lnglat:"coordinate",value:"count"}),this.layer.setOptions({style:{radius:40,color:{.5:"#2c7bb6",.65:"#abd9e9",.7:"#ffffbf",.9:"#fde468",1:"#d7191c"}}}),this.layer.render()},createInfoWindow(e,t){var a=document.createElement("div");a.className="custom-info input-card content-window-card";var i=document.createElement("div"),s=document.createElement("div"),o=document.createElement("img");i.className="info-top",s.innerHTML=e,o.src="https://webapi.amap.com/images/close2.gif",o.onclick=this.closeInfoWindow,i.appendChild(s),i.appendChild(o),a.appendChild(i);var n=document.createElement("div");n.className="info-middle",n.style.backgroundColor="white",n.innerHTML=t,a.appendChild(n);var l=document.createElement("div");l.className="info-bottom",l.style.position="relative",l.style.top="0px",l.style.margin="0 auto";var r=document.createElement("img");return r.src="https://webapi.amap.com/images/sharp.png",l.appendChild(r),a.appendChild(l),a},closeInfoWindow(){this.map.clearInfoWindow()},addRoadLayer(){this.isOrdMap=!1,this.satellite=new AMap.TileLayer.Satellite,this.map.add(this.satellite)},removeSatellite(){this.isOrdMap=!0,this.map.remove(this.satellite)}}},l=n,r=a(1001),c=(0,r.Z)(l,i,s,!1,null,null,null),d=c.exports}}]);
//# sourceMappingURL=947.8f582503.js.map