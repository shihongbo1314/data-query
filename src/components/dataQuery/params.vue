<template>
    <div>
        <div class="top">参数设置</div>
        <div class="middle">
            <table>
                <tbody>
                    <tr>
                        <td style="display: inline-block;padding-top: 10px;">数据类型</td>
                        <td style="padding-bottom:0px;">
                            <el-radio-group
                                v-model="type"
                                @change="setUser"
                            >
                                <el-radio
                                    style="margin-bottom: 10px;margin-right: 15px;"
                                    :label="item.value"
                                    v-for="(item,index) in typeArray"
                                    :key="index"
                                >{{item.name}}</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div class="StyleSet">
                <span>开始时间</span>
                <div>
                    <el-row v-if="type == '日'">
                        <el-date-picker
                            v-model="startDateStr"
                            type="date"
                            placeholder="选择日期"
                            value-format='yyyyMMdd'
                            @change="changeTime"
                             size="small"
                        >
                        </el-date-picker>
                    </el-row>
                    <el-row v-else>
                        <el-date-picker
                            v-model="startDateStrHHmmss"
                            type="datetime"
                            placeholder="选择日期"
                            value-format='yyyyMMddHHmmss'
                            @change="changeTime"
                            size="small"
                        >
                        </el-date-picker>
                    </el-row>
                </div>
            </div>
            <div class="StyleSet" style="margin:12px 0">
                <span>结束时间</span>
                <div>
                    <el-row v-if="type == '日'">
                        <el-date-picker
                            v-model="endDateStr"
                            type="date"
                            placeholder="选择日期"
                            value-format='yyyyMMdd'
                            @change="changeTime"
                            size="small"
                        >
                        </el-date-picker>
                    </el-row>
                    <el-row v-else>
                        <el-date-picker
                            v-model="endDateStrHHmmss"
                            type="datetime"
                            placeholder="选择日期"
                            value-format='yyyyMMddHHmmss'
                            @change="changeTime"
                            size="small"
                        >
                        </el-date-picker>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type: "DAY",
            startDateStr: "",
            endDateStr: "",
            startDateStrHHmmss: "",
            endDateStrHHmmss: "",
            choose: "逐日查询",
            inquire: "",
            anomaly: "",
            plot: "常值",
            typeArray: [
                { name: "年", value: "YER" },
                { name: "季", value: "PEN" },
                { name: "月", value: "MON" },
                { name: "旬", value: "TEN" },
                { name: "日", value: "DAY" },
                { name: "时", value: "HOR" },
                { name: "分", value: "MIN" },
            ],
            typeList: [{ name: "逐日查询" }, { name: "时段查询" }],
            anomalyoptions: ["上年", "近十年", "常年"],
            plotoptions: ["常值"],
        };
    },
    mounted() {
        this.setUser();
    },
    methods: {
        setUser() {
            const userData = {
                type: this.type,
                startDateStr: this.startDateStr,
                endDateStr: this.endDateStr,
                startDateStrHHmmss: this.startDateStrHHmmss,
                endDateStrHHmmss: this.endDateStrHHmmss,
                choose: this.choose,
                inquire: this.inquire,
                anomaly: this.anomaly,
                plot: this.plot,
            };
            if (this.type == "HOR") {
                this.typeList = [{ name: "逐时查询" }, { name: "时段查询" }];
                this.choose = "逐时查询";
                userData.choose = "逐时查询";
            } else if (this.type == "DAY") {
                this.typeList = [{ name: "逐日查询" }, { name: "时段查询" }];
                this.choose = "逐日查询";
                userData.choose = "逐日查询";
            } else {
                this.typeList = [{ name: "固定时段" }];
                this.choose = "固定时段";
                userData.choose = "固定时段";
            }
            this.$emit("childByValue", userData);
        },
        changeTime() {
            const userData = {
                type: this.type,
                startDateStr: this.startDateStr,
                endDateStr: this.endDateStr,
                startDateStrHHmmss: this.startDateStrHHmmss,
                endDateStrHHmmss: this.endDateStrHHmmss,
                choose: this.choose,
                inquire: this.inquire,
                anomaly: this.anomaly,
                plot: this.plot,
            };
            this.$emit("childByValue", userData);
        },
    },
};
</script>

<style lang="scss" scoped>
.StyleSet{
    font-size: 14px;
    padding-left:12px;
    span{
        padding-bottom:5px;
        display: inline-block;
    }
    /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 235px;
    }
}
@import "../../assets/css/dataQuery.scss";
</style>