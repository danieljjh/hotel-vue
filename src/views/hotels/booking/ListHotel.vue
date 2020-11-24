<template>
<div class="container">
    <h1>预订酒店</h1>
    <el-row>
        <el-card>
            <el-form label-width="80px">
                <el-row :gutter="20">
                    <el-col :md="8">
                        <el-form-item label="城市">
                            <el-input placeholder="输入关键字进行过滤" v-model="city" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="12">
                        <el-form-item label="酒店名称">
                            <el-input placeholder="输入关键字进行过滤" v-model="hotelName" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="日期">
                        <el-date-picker v-model="days" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="selectDays">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="searchProduct">搜索</el-button>
                </el-row>
            </el-form>
        </el-card>
        <h4>酒店和房型</h4>
        <el-row>
            <el-table :data="hotelProduct" style="width: 100%">
                <el-table-column prop="hotelName" label="酒店" width="180"></el-table-column>
                <el-table-column prop="roomName" label="房型" width="180"></el-table-column>
                <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
                <el-table-column prop="productDesc" label="产品说明" width="180"></el-table-column>
                <el-table-column prop="bedType" label="床型" width="80"></el-table-column>
                <el-table-column prop="dayprice" :formatter="priceCal" label="价格" width="180"></el-table-column>

                <el-table-column label="操作" width="60">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" size="mini" @click="toBooking(scope.row)">选择</el-button> -->
                        <el-popover trigger="click" placement="left">
                            <div class="container">
                                <h3>酒店 {{currProduct.hotelName}}</h3>
                                <h4>房型 {{currProduct.roomName}}</h4>

                            </div>
                            <el-col :md="24">
                                <el-form :model="currProduct" label-width="100px">
                                    <el-row :gutter="10">
                                        <el-col :md="12">
                                            <el-form-item label="付款方式">
                                                <el-input v-model="payTerm" disabled />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :md="12">
                                            <el-form-item label="取消条款">
                                                <el-input v-model="cancelTerm" disabled />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="10">
                                        <el-col :md="12">
                                            <el-form-item label="入住日期">
                                                <el-input v-model="checkIn" type="text" disabled />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :md="12">
                                            <el-form-item label="离店日期">
                                                <el-input v-model.number="checkOut" disabled type="text" />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <!-- <el-col :md="8">
                                            <el-form-item label="单价">
                                                <el-input v-model.number="currProduct.bookingMaxDays" disabled type="number" />
                                            </el-form-item>
                                        </el-col> -->
                                        <el-col :md="8">
                                            <el-form-item label="总价">
                                                <el-input v-model.number="orderTotal" disabled type="number" />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :md="8">
                                            <el-form-item label="旅行团编号">
                                                <el-input v-model="trNo" type="text" @change="trNoChange" />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :md="8">
                                            <el-form-item label="房间数">
                                                <el-input v-model.number="qtys" type="number" min="1" @input="qtyChange" />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-button type="primary" @click="saveOrder">下单</el-button>
                                    </el-row>
                                </el-form>
                            </el-col>
                            <el-button slot="reference" type="primary" size="mini" @click="toBooking(scope.row)">选择</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-button type="primary" >新增房型</el-button> -->
        </el-row>

    </el-row>
</div>
</template>

<script>
const moment = require("moment")

export default {
    name: "cust-list-hotel",
    data() {
        return {
            city: "",
            hotelName: "",
            filterText: "",
            days: {},
            checkIn: "",
            checkOut: "",
            cancelTerm: "",
            payTerm: "",
            currProduct: {},
            qtys: 1,
            trNo: "",
            orderTotal: 0,
            notes: "",
            hotelProduct: []
        }
    },
    created() {
        var user = this.$store.getters.getUserInfo
        this.user = user.idt
        console.log("user", user)
    },
    methods: {
        selectDays(e) {
            this.checkIn = moment(e[0]).format("YYYY-MM-DD")
            this.checkOut = moment(e[1]).format("YYYY-MM-DD")
            console.log("select days", e, this.checkIn)
        },
        searchProduct() {
            const that = this
            const filters = that.hotelName
            console.log(filters, that.$api, this.days)
            const url = "/hotels/search-hotel-product-day"
            var data = {
                filterText: that.hotelName,
                start: this.checkIn,
                end: this.checkOut,
                qty: 1
            }
            that.$http.post(that.$api + url, data).then(
                res => {
                    console.log(res.data)
                    that.hotelProduct = res.data
                }
            )
        },
        priceCal: function (row) {
            // 你想在页面展示的值
            // console.log(row)
            var total = row.price.total > 0 ? row.price.total : ""
            return total;
        },
        toBooking: function (row) {
            const that = this
            that.currProduct = row
            that.orderTotal = that.qtys * row.price.total
            const url = that.$api + "/hotels/get-hotel-product"
            that.$http.get(url, { params: { productId: row.productId } }).then(
                (res) => {
                    console.log(res)
                    that.cancelTerm = res.data.product.cancelTerm
                    that.payTerm = res.data.product.payTerm
                }
            )
            console.log("to booking", row, that.orderTotal, that.qtys)
        },
        trNoChange(e) {
            this.trNo = e
        },
        qtyChange(e) {
            const that = this
            that.qtys = e
            var orderTotal = that.qtys * that.currProduct.price.total
            that.orderTotal = orderTotal
            console.log("qtyChange change", e, orderTotal)
        },
        saveOrder() {
            const that = this
            // var total = that.qtys * that.currProduct.price.total
            var order = {
                payTerm: that.payTerm,
                cancelTerm: that.cancelTerm,
                customerId: that.user.customerId,
                productId: that.currProduct.productId,
                checkIn: that.checkIn,
                checkOut: that.checkOut,
                qty: that.qtys,
                productType: "hotel",
                travelNo: that.trNo
            }
            const url = that.$api + "/bookings/create-order"
            that.$http.post(url, order).then(
                res => {
                    console.log("new order", res.data)
                    this.$alert("订单已创建，可在待确认订单中追踪进展", "订单创建", {
                        confirmButtonText: "确定",
                        callback: action => {
                            // this.$message({
                            //     type: "info",
                            //     message: `action: ${action}`
                            // });
                        }
                    });
                }
            )
            console.log("order", order)
        }
    }
}
</script>
