<template>
    <div style="height:100%">
        <div
            id="Map"
            ref="Map"
        >
            <div id="mapTitle">{{timestart}}-{{timeend}}临沧市{{this.name}}分布图</div>
            <span class="shentu">审图号：GS(2018)1709</span>
            <div id="legend">
                <p class="legendTitle">图例</p>
                <ul>
                    <li
                        v-for="(item,index) in colorScale"
                        :key="index"
                    ><span
                            class="legendColor"
                            :style="`background:rgb(${item.r},${item.g},${item.b})`"
                        ></span><span class="legendValue">{{item.value}}</span></li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import $ from "jquery";
export default {
    data() {
        return {
            bounds: [
                [25.03284, 100.546904],
                [23.073182, 98.668863],
            ],
            zoom: 9,
            center: [24.03284, 99.75],
            past: "http://172.24.97.251:8082/siteImg/",
            timestart: "",
            timeend: "",
            geojson: null,
            map: null,
            regionList: [
                // 各区县乡镇数据
                {
                    code: 530902,
                    name: "临翔区",
                    center: [23.88057205250008, 100.14319188500008],
                    children: [
                        "凤翔街道",
                        "忙畔街道",
                        "博尚镇",
                        "南美乡",
                        "蚂蚁堆乡",
                        "章驮乡",
                        "圈内乡",
                        "马台乡",
                        "邦东乡",
                        "平村乡",
                    ],
                },
                {
                    code: 530921,
                    name: "凤庆县",
                    center: [24.63168504000005, 99.8701686350001],
                    children: [
                        "大寺乡",
                        "凤山镇",
                        "郭大寨乡",
                        "鲁史镇",
                        "洛党镇",
                        "勐佑镇",
                        "三岔河镇",
                        "诗礼乡",
                        "小湾镇",
                        "新华乡",
                        "雪山镇",
                        "腰街乡",
                        "营盘镇",
                    ],
                },
                {
                    code: 530922,
                    name: "云县",
                    center: [24.3569714725001, 100.13200314000011],
                    children: [
                        "爱华镇",
                        "茶房乡",
                        "大朝山西镇",
                        "大寨镇",
                        "后箐乡",
                        "栗树乡",
                        "漫湾镇",
                        "忙怀乡",
                        "茂兰镇",
                        "晓街乡",
                        "幸福镇",
                        "涌宝镇",
                    ],
                },
                {
                    code: 530923,
                    name: "永德县",
                    center: [24.100577435000105, 99.46449338750006],
                    children: [
                        "班卡乡",
                        "崇岗乡",
                        "大山乡",
                        "大雪山乡",
                        "德党镇",
                        "勐板乡",
                        "乌木龙乡",
                        "小勐统镇",
                        "亚练乡",
                        "永康镇",
                    ],
                },
                {
                    code: 530924,
                    name: "镇康县",
                    center: [23.939605952500074, 99.02511645750005],
                    children: [
                        "凤尾镇",
                        "军赛乡",
                        "忙丙乡",
                        "勐堆乡",
                        "勐捧镇",
                        "木场乡",
                        "南伞镇",
                    ],
                },
                {
                    code: 530925,
                    name: "双江县",
                    center: [23.503043215000083, 99.87243013000007],
                    children: [
                        "邦丙乡",
                        "大文乡",
                        "忙糯乡",
                        "勐库镇",
                        "勐勐镇",
                        "沙河乡",
                    ],
                },
                {
                    code: 530926,
                    name: "耿马县",
                    center: [23.609570900000113, 99.35370818750005],
                    children: [
                        "大兴乡",
                        "耿马镇",
                        "贺派乡",
                        "芒洪乡",
                        "勐简乡",
                        "勐撒镇",
                        "勐永镇",
                        "孟定镇",
                        "四排山乡",
                    ],
                },
                {
                    code: 530927,
                    name: "沧源县",
                    center: [23.294409917500104, 99.29589947750009],
                    children: [
                        "班洪乡",
                        "班老乡",
                        "单甲乡",
                        "芒卡镇",
                        "勐董镇",
                        "勐角乡",
                        "勐来乡",
                        "勐省镇",
                        "糯良乡",
                        "岩帅镇",
                    ],
                },
            ],
            imageBounds: null,
        };
    },
    props: {
        url: {
            type: String,
        },
        visiable: {
            type: Boolean,
            default: false,
        },
        startDateStrHHmmss: {
            type: String,
            default: "",
        },
        endDateStrHHmmss: {
            type: String,
            default: "",
        },
        colorScale: {
            type: Array,
        },
        name: {
            type: String,
        },
    },
    mounted() {
        this.timestart =
            this.startDateStrHHmmss.substring(0, 4) +
            "-" +
            this.startDateStrHHmmss.substring(4, 6) +
            "-" +
            this.startDateStrHHmmss.substring(6, 8);
        this.timeend =
            this.endDateStrHHmmss.substring(0, 4) +
            "-" +
            this.endDateStrHHmmss.substring(4, 6) +
            "-" +
            this.endDateStrHHmmss.substring(6, 8);
        this.initMap();
    },
    watch: {
        visiable() {
            this.map.invalidateSize(true);
        },
        url(newVal, oldval) {
            if (newVal) {
                var imageUrl = "http://172.24.97.251:8082/siteImg/" + this.url;
                L.imageOverlay(imageUrl, this.imageBounds).addTo(this.map);
            }else{
                var imageUrl = "http://172.24.97.251:8082/siteImg/" + this.url;
                L.imageOverlay(imageUrl, this.imageBounds).addTo(this.map);
            }
        },
    },
    methods: {
        initMap() {
            // 初始化网格预报 预报间隔的数据时间
            this.map = L.map(this.$refs["Map"], {
                center: [25.03284, 100.546904], // 地图中心
                zoom: 1, //缩放比列
                zoomControl: false, //禁用 + - 按钮
                doubleClickZoom: false, // 禁用双击放大
                attributionControl: false, // 移除右下角leaflet标识
                zoomSnap: 0.01,
            });
            this.map.fitBounds([
                [25.45291400429229, 101.94869609505803],
                [22.53339368844469, 97.13525378454901],
            ]);
            this.imageBounds = [
                [25.035, 100.545],
                [23.015, 98.67],
            ];
            //区县边界
            let cityJSON = require("@/assets/map/530900_full.json");
            let mapLayer = L.geoJSON(cityJSON, {
                style: () => {
                    return {
                        zIndex: 2,
                        color: "#DCDFE6",
                        fill: false,
                        weight: 2,
                    };
                },
                pane: "tilePane",
            });
            mapLayer.addTo(this.map);

            //区县名
            let countyLayer = L.layerGroup();
            this.regionList.forEach((item) => {
                let countyMarker = L.marker(item.center, {
                    icon: L.divIcon({
                        className: "radarCountyName",
                        html: "<span>" + item.name + "</span>",
                        iconSize: [60, 40],
                        iconAnchor: [30, 20],
                    }),
                    pane: "tilePane",
                });
                countyMarker.addTo(countyLayer);
            });
            countyLayer.addTo(this.map);

            /*   var that = this;
            this.map.on("zoomend", (e) => {
                console.log(e, that.map.getBounds());
            }); */

            if (this.layer != null) {
                this.map.removeLayer(this.layer);
            }
            if (this.maskLeayer != null) {
                this.map.removeLayer(this.maskLeayer);
            }
            let sjdata = require(`@/assets/map/530900.json`);
            this.layer = L.geoJson(sjdata, {
                color: "#3e87f4",
                weight: 3,
                fill: false,
                zIndex: 0,
                pane: "shadowPane",
            });
            this.layer.addTo(this.map);
            // 给地图周边添加白色遮罩层
            var pNW = { lat: 59.0, lng: 73.0 };
            var pNE = { lat: 59.0, lng: 136.0 };
            var pSE = { lat: 3.0, lng: 136.0 };
            var pSW = { lat: 3.0, lng: 73.0 }; //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
            var pArray = [];
            pArray.push(pNW);
            pArray.push(pSW);
            pArray.push(pSE);
            pArray.push(pNE);
            pArray.push(pNW); //循环添加各闭合区域
            let dater = sjdata.geometries[0].coordinates;
            for (var i = 0; i < dater.length; i++) {
                var points = [];
                $.each(dater[i], function (k, v) {
                    points.push({ lat: v[1], lng: v[0] });
                }); //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
                pArray = pArray.concat(points);
                pArray.push(pArray[0]);
            } //添加遮蔽层
            this.maskLeayer = L.polygon(pArray, {
                color: "transparent",
                fillColor: "#FFF",
                fillOpacity: 2,
            }); //建立多边形覆盖物
            this.map.invalidateSize();
            this.maskLeayer.addTo(this.map);
        },
    },
};
</script>
<style>
.radarCountyName {
    color: #1e1e1f;
    font-size: 18px;
}
.leaflet-overlay-pane {
    z-index: -99;
}
</style>
<style lang="scss" scoped>
#mapTitle {
    position: absolute;
    top: 85px;
    left: 0;
    right: 0;
    z-index: 9999;
    color: #000;
    text-align: center;
    font-size: 20px;
    pointer-events: none;
}
#Map {
    width: 100%;
    height: calc(100% - 64px);
    background: #fff;
    position: relative;
    padding: 64px 0px 0px 0px;
}
.shentu {
    position: absolute;
    bottom: 20px;
    left: 10px;
    z-index: 9999;
    color: #000;
    text-align: center;
    font-size: 16px;
    pointer-events: none;
}

#legend {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    background: #fff;
    border: 1px solid #888;
    border-radius: 5px;
    padding: 10px;
    color: #000;
    p.legendTitle {
        text-align: center;
        margin: 0 0 10px;
        font-size: 18px;
    }
    span.legendColor {
        display: inline-block;
        width: 35px;
        height: 20px;
        border: 1px solid #fff;
        vertical-align: bottom;
    }
    span.legendValue {
        vertical-align: bottom;
        padding-left: 10px;
        font-size: 14px;
    }
}
</style>