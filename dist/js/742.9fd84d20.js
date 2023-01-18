"use strict";(self["webpackChunkwore_house_orders"]=self["webpackChunkwore_house_orders"]||[]).push([[742],{742:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"WareHouseMain"},[e._m(0),a("div",{staticClass:"input-card-box"},[a("div",{staticClass:"input-item"},[a("input",{attrs:{type:"checkbox"},on:{click:function(t){return e.toggleScale()}}}),e._v("比例尺 ")]),a("div",{staticClass:"input-item"},[a("input",{attrs:{type:"checkbox",id:"toolbar"},on:{click:function(t){return e.toggleToolBar()}}}),e._v("工具条 ")]),a("div",{staticClass:"mapImg"},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.typevalue,callback:function(t){e.typevalue=t},expression:"typevalue"}},e._l(e.options,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),a("el-button",{staticStyle:{"margin-left":"15px"},attrs:{type:"primary"},on:{click:e.selectType}},[e._v("类型查询")]),e.isOrdMap?a("el-button",{attrs:{type:"primary"},on:{click:e.addRoadLayer}},[e._v("打开卫星图层")]):a("el-button",{attrs:{type:"primary"},on:{click:e.removeSatellite}},[e._v("关闭卫星图层")])],1)])])},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"map-box"},[a("div",{staticClass:"container",attrs:{id:"container"}})])}],n=a(4665),s={name:"WareHouseMain",data(){return{map:"",lang:"zh_cn",zoom:10,title:"",content:[],infoWindow:null,markers:[],scale:null,isScale:!1,toolBar:null,isToolBar:!1,overView:null,isoverView:!1,nowMapImg:{title:"",src:"",type:""},satellite:null,isOrdMap:!0,options:[{value:"全部类型",label:"全部类型"},{value:"固体物质火灾",label:"固体物质火灾"},{value:"液体物质火灾",label:"液体物质火灾"},{value:"气体火灾",label:"气体火灾"},{value:"金属火灾",label:"金属火灾"},{value:"带电火灾",label:"带电火灾"}],typevalue:"全部类型",newfireData:[]}},components:{},computed:{...(0,n.rn)(["fireData"])},mounted(){this.initMap(),this.addMarker()},async created(){console.log(this.fireData)},methods:{initMap(){this.map=new AMap.Map("container",{resizeEnable:!0,zoom:this.zoom,zooms:[7,30],center:[102.379164,27.853739],viewMode:"3D",lang:this.lang,mapStyle:"amap://styles/macaron",infoWindow:null}),this.scale=new AMap.Scale({visible:!1}),this.map.addControl(this.scale),this.toolBar=new AMap.ToolBar({visible:!1,position:{top:"110px",right:"40px"}}),this.map.addControl(this.toolBar)},toggleScale(){this.isScale?(this.isScale=!1,this.scale.hide()):(this.isScale=!0,this.scale.show())},toggleToolBar(){this.isToolBar?(this.isToolBar=!1,this.toolBar.hide()):(this.isToolBar=!0,this.toolBar.show())},async addMarker(){this.map.clearMap(),this.markers=[],this.newfireData=this.fireData.map((e=>({...e,coordinate:[e.jing,e.wei]})));var e=[];e="全部类型"===this.typevalue?this.newfireData:this.newfireData.filter((e=>e.reason===this.typevalue));for(let t=0;t<e.length;t++){let a=new AMap.Marker({map:this.map,position:e[t].coordinate,extData:e[t],icon:new AMap.Icon({image:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ae070c7f-068d-4e5c-adf5-baf6760c9a2b/9e584737-de7e-48ec-8025-d6f822668e69.png",size:new AMap.Size(40,40),imageSize:new AMap.Size(40,40)})});this.markers.push(a),AMap.event.addListener(a,"click",(()=>{this.title="火灾编号："+e[t].index,this.content=["火灾级别："+e[t].level,"救援队伍规模："+e[t].fmen,"起火原因："+e[t].reason],this.infoWindow=new AMap.InfoWindow({isCustom:!0,content:this.createInfoWindow(this.title,this.content.join("<br/>")),offset:new AMap.Pixel(16,-45)}),this.infoWindow.open(this.map,a.getPosition())}))}},createInfoWindow(e,t){var a=document.createElement("div");a.className="custom-info input-card content-window-card";var i=document.createElement("div"),l=document.createElement("div"),n=document.createElement("img");i.className="info-top",l.innerHTML=e,n.src="https://webapi.amap.com/images/close2.gif",n.onclick=this.closeInfoWindow,i.appendChild(l),i.appendChild(n),a.appendChild(i);var s=document.createElement("div");s.className="info-middle",s.style.backgroundColor="white",s.innerHTML=t,a.appendChild(s);var o=document.createElement("div");o.className="info-bottom",o.style.position="relative",o.style.top="0px",o.style.margin="0 auto";var r=document.createElement("img");return r.src="https://webapi.amap.com/images/sharp.png",o.appendChild(r),a.appendChild(o),a},closeInfoWindow(){this.map.clearInfoWindow()},addRoadLayer(){this.isOrdMap=!1,this.satellite=new AMap.TileLayer.Satellite,this.map.add(this.satellite)},removeSatellite(){this.isOrdMap=!0,this.map.remove(this.satellite)},selectType(){this.addMarker()}}},o=s,r=a(1001),c=(0,r.Z)(o,i,l,!1,null,null,null),p=c.exports}}]);
//# sourceMappingURL=742.9fd84d20.js.map