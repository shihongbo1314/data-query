<template>
    <div class="linepicture">
        <div
            id="echart"
            ref="echart"
        ></div>
    </div>

</template>
<script>
import * as echarts from "echarts";
export default {
    data() {
        return {
            myCharts: null,
        };
    },
    props: {
        visiable: {
            type: Boolean,
            default: false,
        },
        AvgData: {
            type: Array,
        },
        Station_NameData: {
            type: Array,
        },
        startDateStrHHmmss: {
            type: String,
        },
        endDateStrHHmmss: {
            type: String,
        },
        name: {
            type: String,
        },
        Datetime: {
            type: Array,
        },
    },
    watch: {
        visiable() {
            this.$refs.echart.style.width = "100%";
            this.myCharts.resize();
        },
    },
    mounted() {
        this.lineClick();
    },
    methods: {
        lineClick() {
            let timestart =
                this.startDateStrHHmmss.substring(0, 4) +
                "-" +
                this.startDateStrHHmmss.substring(4, 6) +
                "-" +
                this.startDateStrHHmmss.substring(6, 8);
            let timeend =
                this.endDateStrHHmmss.substring(0, 4) +
                "-" +
                this.endDateStrHHmmss.substring(4, 6) +
                "-" +
                this.endDateStrHHmmss.substring(6, 8);
            var newArr = [...new Set(this.Datetime)];
            const option = {
                grid: {
                    show: true,
                    top: "15%",
                },
                title: {
                    text: timestart + "-" + timeend + `${this.name}分布图`,
                    left: "center",
                },
                legend: {
                    top: 50,
                },
                xAxis: {
                    type: "category",
                    data: newArr.sort(),
                },
                dataZoom: [
                    {
                        type: "inside",
                    },
                ],
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: true,
                    },
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                series: [
                    {
                        name: "临沧",
                        type: "line",
                        data: this.AvgData.lingcang,
                    },
                    {
                        name: "双江",
                        type: "line",
                        data: this.AvgData.shuangjiang,
                    },
                    {
                        name: "耿马",
                        type: "line",
                        data: this.AvgData.gengma,
                    },
                    {
                        name: "沧源",
                        type: "line",
                        data: this.AvgData.cangyuan,
                    },
                    {
                        name: "云县",
                        type: "line",
                        data: this.AvgData.yunxian,
                    },
                    {
                        name: "永德",
                        type: "line",
                        data: this.AvgData.yongde,
                    },
                    {
                        name: "凤庆",
                        type: "line",
                        data: this.AvgData.fengqing,
                    },
                    {
                        name: "镇康",
                        type: "line",
                        data: this.AvgData.zhenkang,
                    },
                ],
            };
            this.myCharts = echarts.init(document.getElementById("echart"));
            this.myCharts.setOption(option);
        },
    },
};
</script>
<style lang="scss" scoped>
.linepicture {
    height: 100%;
    width: 100%;
    background: #fff;
    border-radius: 4px;
    #echart {
        padding: 96px 100px 0 100px;
        height: 80vh;
        width: 60vw;
        background: #fff;
    }
}
</style>