<template>
<div class="container">
    <h1>订单列表</h1>
    <el-row>
        <el-card>
            <el-form label-width="80px">
                <el-row :gutter="20">
                    <el-col :md="8">
                        <el-form-item label="订单状态">
                            <el-select v-model="orderStatus" placeholder="请选择状态">
                                <el-option label="待确认" value="open"></el-option>
                                <el-option label="已确认" value="confirmed"></el-option>
                                <el-option label="已取消" value="cancel"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12">
                        <el-form-item label="酒店名称">
                            <el-input placeholder="输入关键字进行过滤" v-model="hotelName" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :md="12">
                        <el-form-item label="入住日期">
                            <el-date-picker v-model="checkInDays" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="selectChkInDays">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12">
                        <el-form-item label="下单日期">
                            <el-date-picker v-model="orderDays" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="selectOrdDays">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-button type="primary" @click="searchOrder">搜索</el-button>
                </el-row>
            </el-form>
        </el-card>
    </el-row>
    <el-row>
        <el-table :data="bookings" style="width: 100%">
            <el-table-column prop="orderStatus" label="订单状态" width="180">
            </el-table-column>
            <el-table-column prop="travelNo" label="团号" width="180">
            </el-table-column>
            <el-table-column prop="orderId" label="编号">
            </el-table-column>
            <el-table-column prop="orderSummary" label="项目" />
            <el-table-column prop="checkIn" label="入住">
            </el-table-column>
            <el-table-column prop="checkOut" label="离店">
            </el-table-column>
            <el-table-column prop="qty" label="房间数量">
            </el-table-column>
            <el-table-column prop="orderTotal" label="总金额" />

        </el-table>
    </el-row>

</div>
</template>

<script>
const moment = require("moment")

export default {
    name: "hotelBookings",
    data() {
        return {
            orderStatus: "",
            hotelName: "",
            checkInDays: {},
            orderDays: {},
            createdOnRange: null,
            checkInRange: null,
            bookings: []
        }
    },
    methods: {
        selectChkInDays(e) {
            // this.checkIn = moment(e[0]).format("YYYY-MM-DD")
            // this.checkOut = moment(e[1]).format("YYYY-MM-DD")
            this.checkInRange = {
              start: moment(e[0]).format("YYYY-MM-DD"),
              end: moment(e[1]).format("YYYY-MM-DD")
            }
            console.log("select days", e, this.checkInRange)
        },
        selectOrdDays(e) {
            this.createdOnRange = {
              start: moment(e[0]).format("YYYY-MM-DD"),
              end: moment(e[1]).format("YYYY-MM-DD")
            }
            console.log("select days", e, this.createdOnRange)
        },
        searchOrder() {
          const that = this
          var user = this.$store.getters.getUserInfo
          var data = {
            checkInRange: that.checkInRange,
            createdOnRange: that.createdOnRange,
            hotelName: that.hotelName,
            orderStatus: that.orderStatus,
            customerId: user.customerId
          }
          const url = "/bookings/search-order"
          that.$http.post(that.$api + url, data).then(
            res => {
              console.log("bookings", res.data)
              that.bookings = res.data
            }
          )
        }
    }
};
</script>
