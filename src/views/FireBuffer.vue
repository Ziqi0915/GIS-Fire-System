<template>
  <!-- 图层 -->
  <div class="WareHouseMain">
    <div class="map-box">
      <div id="container" class="container"></div>
    </div>
    <!-- 工具条start -->
    <div class="input-card-box">
      <div class="input-item">
        <input type="checkbox" @click="toggleScale()" />Scale
      </div>
      <div class="input-item">
        <input type="checkbox" id="toolbar" @click="toggleToolBar()" />Toolbar
      </div>
      <div class="mapImg">
        <el-button
          style="margin-left: 15px"
          type="primary"
          v-if="isOrdMap"
          @click="addRoadLayer"
          >Open satellite layer</el-button
        >
        <el-button type="primary" v-else @click="removeSatellite"
          >Close satellite layer</el-button
        >
        <div v-if="geometryBox" class="geometrySearch">
          <h2>Fire Number:{{ boxData.index }}</h2>
          <span>Current rescuers:{{ boxData.fmen }}</span>
          <br />
          <span>Cause of fire:{{ boxData.reason }}</span>
          <br />
          <span>Fire level:{{ boxData.level }}</span>
          <br />
          <span>Impact area:{{ firlBuffer }} Kilometers</span>
          <br />
          <span v-if="money" style="color: red"
            >Economic loss:{{ money }} million yuan</span
          >
          <br />
          <br />
          <el-button type="warning" @click="getMoney" size="mini"
            >Calculate fire damage</el-button
          >
          <el-button type="danger" @click="closeBufferBox" size="mini"
            >Close Panel</el-button
          >
        </div>
      </div>
    </div>
    <!-- 工具条end -->
  </div>
</template>
<script type="text/javascript">
window._AMapSecurityConfig = {
  securityJsCode: "5885da62a0da2ca7cf5d212e6b671140",
};
</script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=84f61226c5c3819011a303ef5c321e5f&plugin=AMap.MouseTool,AMap.HawkEye,AMap.DistrictSearch,AMap.Scale,AMap.ToolBar,AMap.ControlBar,AMap.ImageLayer,AMap.Driving"></script>

<script>
import { mapState } from "vuex";

export default {
  name: "WareHouseMain",
  data() {
    return {
      map: "", //地图实例
      lang: "zh_cn",
      // 弹框内容
      zoom: 10,
      title: "",
      coon: [],
      content: [],
      infoWindow: null,
      markers: [],

      //工具条
      scale: null,
      isScale: false,
      toolBar: null,
      isToolBar: false,
      overView: null,
      isoverView: false,

      satellite: null,
      isOrdMap: true,

      nowFineData: null,

      // 火灾数据
      newfireData: [],

      geometryBox: false,
      boxData: null,
      firlBuffer: 0,
      money: 0,
    };
  },
  components: {},

  computed: {
    ...mapState(["fireData"]),
  },

  mounted() {
    this.initMap();

    this.addMarker();
  },
  async created() {
    // var res = null;
    console.log(this.fireData);
  },

  methods: {
    // 118.504165, 39.02162
    initMap() {
      //初始化地图
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: this.zoom, //级别
        zooms: [7, 30],
        center: [102.379164, 27.853739], //中心点坐标
        viewMode: "3D", //使用3D视图
        lang: this.lang,
        mapStyle: "amap://styles/macaron",
        infoWindow: null,
      });

      this.scale = new AMap.Scale({
        visible: false,
      });
      this.map.addControl(this.scale);

      this.toolBar = new AMap.ToolBar({
        visible: false,
        position: {
          top: "110px",
          right: "40px",
        },
      });
      this.map.addControl(this.toolBar);

      // this.overView = new AMap.HawkEye({
      //   visible: true,
      // });
      // this.map.addControl(this.overView);
    },

    toggleScale() {
      if (!this.isScale) {
        this.isScale = true;
        this.scale.show();
      } else {
        this.isScale = false;
        this.scale.hide();
      }
    },
    toggleToolBar() {
      if (!this.isToolBar) {
        this.isToolBar = true;
        this.toolBar.show();
      } else {
        this.isToolBar = false;
        this.toolBar.hide();
      }
    },

    // 添加点集
    async addMarker() {
      this.newfireData = this.fireData.map((ele) => {
        return {
          ...ele,
          coordinate: [ele.altitude, ele.latitude],
        };
      });

      for (let i = 0; i < this.newfireData.length; i++) {
        // 循环点坐标
        // 注意这里一定得用 let
        let marker = new AMap.Marker({
          map: this.map,
          position: this.newfireData[i].coordinate,
          extData: this.newfireData[i],
          icon: new AMap.Icon({
            image:
              "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-ae070c7f-068d-4e5c-adf5-baf6760c9a2b/9e584737-de7e-48ec-8025-d6f822668e69.png",
            size: new AMap.Size(40, 40),
            imageSize: new AMap.Size(40, 40),
          }),
        });

        this.markers.push(marker);

        AMap.event.addListener(marker, "click", () => {
          // this.nowMarker = marker;

          // console.log(this.infoWindow);
          this.title = "Fire number: " + this.newfireData[i].index;
          this.coon = this.newfireData[i];

          (this.content = [
            "Fire level" + this.newfireData[i].level,
            "Rescue team size" + this.newfireData[i].fmen,
            "Cause of fire" + this.newfireData[i].reason,
            // "单位名称：" + this.newfireData[i].company,
          ]),
            (this.infoWindow = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              // content: '  <div style="background-color:white">111</div>',
              content: this.createInfoWindow(
                this.title,
                this.coon,
                this.content.join("<br/>")
              ),
              offset: new AMap.Pixel(16, -45),
            }));
          this.infoWindow.open(this.map, marker.getPosition());
          // console.log(marker.getPosition());
        });
      }
    },

    //渲染弹框
    createInfoWindow(title, coon, content) {
      // console.log("11111111");
      var info = document.createElement("div");
      info.className = "custom-info input-card content-window-card";

      //可以通过下面的方式修改自定义窗体的宽高
      //info.style.width = "400px";
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "https://webapi.amap.com/images/close2.gif";
      closeX.onclick = this.closeInfoWindow;

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = "white";
      middle.innerHTML = content;

      //   自定义事件
      var openMap = document.createElement("div");
      openMap.className = "openMap";
      openMap.innerHTML = "Buffer Analysis";

      openMap.onclick = () => {
        this.openMapFun(coon);
      };

      middle.appendChild(openMap);
      //   end

      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = "relative";
      bottom.style.top = "0px";
      bottom.style.margin = "0 auto";
      var sharp = document.createElement("img");
      sharp.src = "https://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },

    openMapFun(coon) {
      console.log(coon);
      this.map.clearMap();
      this.addMarker();
      this.money = 0;

      this.geometryBox = true;
      this.boxData = coon;
      if (coon.level === "General Accidents") {
        this.firlBuffer = 1;
      } else if (coon.level === "Larger accidents") {
        this.firlBuffer = 4;
      } else if (coon.level === "Special Major Accidents") {
        this.firlBuffer = 16;
      } else if (coon.level === "Major Accidents") {
        this.firlBuffer = 9;
      }

      var circle = new AMap.Circle({
        center: coon.coordinate, 
        radius: this.firlBuffer * 1000, 
        strokeColor: "#F33", 
        strokeOpacity: 1, 
        strokeWeight: 3, 
        fillColor: "#ee2200", 
        fillOpacity: 0.35, 
      });

      this.map.add(circle);
      this.map.setZoomAndCenter(12, coon.coordinate);
      //   this.map.setFitView();
    },

    closeBufferBox() {
      this.geometryBox = false;
      this.money = 0;
    },

    getMoney() {
      this.money = this.firlBuffer * 30;
    },

    // 关闭弹框
    closeInfoWindow() {
      this.map.clearInfoWindow();
      // this.searchIndustry = null;
    },

    // 卫星地图start
    addRoadLayer() {
      this.isOrdMap = false;
      this.satellite = new AMap.TileLayer.Satellite();
      this.map.add(this.satellite);
    },

    // 关闭卫星地图
    removeSatellite() {
      this.isOrdMap = true;
      this.map.remove(this.satellite);
    },

    // 卫星地图end
  },
};
</script>

<style >
/* 弹框样式 */
.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
}

.content-window-card p {
  height: 2rem;
}

.custom-info {
  border: solid 1px silver;
  width: 280px;
  background-color: white;
}

div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
}
div.info-middle img {
  width: 100px;
  height: 70px;
  padding-bottom: 10px;
}

div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

div.info-bottom img {
  position: relative;
  z-index: 104;
}

span {
  margin-left: 5px;
  font-size: 11px;
}

.info-middle img {
  float: left;
  margin-right: 6px;
}

.xiangxi {
  color: #555;
}

.openMap {
  margin: 0;
  cursor: pointer;
  color: #555;
  user-select: none;
}

/*工具条样式*/
.input-card-box {
  width: 130px;
  top: 10px;
  left: 10px;
  bottom: auto;
  z-index: 999;
  position: absolute;
  top: 85px;
  left: 15px;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
  font-size: 12px;
  border-width: 0;
  border-radius: 0.4rem;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
  padding: 8px 8px;
}
.input-card-box .input-item {
  display: flex;
  align-items: center;
  height: 30px;
  /* line-height: 30px; */
}

.amap-toolbar {
  position: absolute;
  top: 15px;
  right: 15px;
}
.amap-scalecontrol {
  position: fixed;
  /* position: absolute; */
  bottom: 15px;
  left: 15px !important;
}

.WareHouseMain .mapImg {
  /* width: 350px; */
  /* height: 350px; */
  position: fixed;
  top: 85px;
  right: 90px;

  /* background-color: white; */
  /* background-clip: border-box;
  border-radius: 0.25rem; */
  font-size: 12px;
  /* border-width: 0;
  border-radius: 0.4rem;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
  padding: 8px 8px; */
}
.WareHouseMain .mapImg span {
  margin-right: 15px;
}
.WareHouseMain .mapImg img {
  width: 100%;
}

#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 150px;
  right: 15px;
  width: 280px;
  border-bottom: solid 1px silver;
  z-index: 999;
}

.nearRoad {
  position: absolute;
  top: 450px;
  right: -80px;
}

.WareHouseMain .geometrySearch {
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 999;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  width: 300px;
  border: 1px solid #dcdfe6;
}

.WareHouseMain .geometrySearch .geometryType {
  display: block;
  padding-bottom: 15px;
  color: #606266;
}
.WareHouseMain .geometrySearch .geometryBtns {
  padding-top: 15px;
}

.WareHouseMain .map-buttons .closegeometryBox {
  margin-left: 0;
}

.WareHouseMain .geometrySearch .searchRes {
  padding-top: 15px;
}

.WareHouseMain .geometrySearch .searchRes .el-form-item__label {
  font-size: 12px;
  color: #111;
}
.WareHouseMain .geometrySearch .searchRes .el-form-item {
  margin: 0;
  padding-left: 10px;
}
.WareHouseMain .geometrySearch span {
  line-height: 22px;
}
</style>
