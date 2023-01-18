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
        <el-select v-model="typevalue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 15px" @click="selectType"
          >Type Search</el-button
        >

        <el-button type="primary" v-if="isOrdMap" @click="addRoadLayer"
          >Open satellite layer</el-button
        >
        <el-button type="primary" v-else @click="removeSatellite"
          >Close satellite layer</el-button
        >
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
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=84f61226c5c3819011a303ef5c321e5f&plugin=AMap.MouseTool,AMap.HawkEye,AMap.DistrictSearch,AMap.Scale,AMap.ToolBar,AMap.ControlBar,AMap.ImageLayer"></script>

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

      options: [
        {
          value: "All Types",
          label: "All Types",
        },
        {
          value: "Solid material fires",
          label: "Solid material fires",
        },
        {
          value: "Liquid substance fire",
          label: "Liquid substance fire",
        },
        {
          value: "Gas fires",
          label: "Gas fires",
        },
        {
          value: "Metal fires",
          label: "Metal fires",
        },
        {
          value: "Live fires",
          label: "Live fires",
        },
      ],
      typevalue: "All types",

      // 火灾数据
      newfireData: [],
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
      //Initializing the map
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: this.zoom, //scale
        zooms: [7, 30],
        center: [102.379164, 27.853739], //Center point coordinates
        viewMode: "3D", 
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
    // 显示比例尺
    toggleToolBar() {
      if (!this.isToolBar) {
        this.isToolBar = true;
        this.toolBar.show();
      } else {
        this.isToolBar = false;
        this.toolBar.hide();
      }
    },
    // 显示工具条

    async addMarker() {
      this.map.clearMap();
      this.markers = [];

      this.newfireData = this.fireData.map((ele) => {
        return {
          ...ele,
          coordinate: [ele.altitude, ele.latitude],
        };
      });
      var arr = [];
      if (this.typevalue === "All Types") {
        arr = this.newfireData;
      } else {
        arr = this.newfireData.filter((ele) => ele.reason === this.typevalue);
      }

      for (let i = 0; i < arr.length; i++) {
        // 循环点坐标
        // 注意这里一定得用 let
        let marker = new AMap.Marker({
          map: this.map,
          position: arr[i].coordinate,
          extData: arr[i],
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
          this.title = "火灾编号：" + arr[i].index;

          (this.content = [
            "Fire level: " + arr[i].level,
            "Rescue team size: " + arr[i].fmen,
            "Cause of fire: " + arr[i].reason,
            // "单位名称：" + arr[i].company,
          ]),
            (this.infoWindow = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              // content: '  <div style="background-color:white">111</div>',
              content: this.createInfoWindow(
                this.title,
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
    createInfoWindow(title, content) {
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

    // 关闭遗产弹框
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

    selectType() {
      this.addMarker();
    },
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
</style>
