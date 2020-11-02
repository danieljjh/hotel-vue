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
                                                <el-input v-model="currProduct.payTerm" />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :md="12">
                                            <el-form-item label="取消条款">
                                                <el-input v-model="currProduct.cancelTerm" />
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
                                        <el-col :md="8">
                                            <el-form-item label="单价">
                                                <el-input v-model.number="currProduct.bookingMaxDays" disabled type="number" />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :md="8">
                                            <el-form-item label="总价">
                                                <el-input v-model.number="orderTotal" disabled type="number" />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :md="8">
                                            <el-form-item label="旅行团编号">
                                                <el-input v-model="trNo" type="text" />
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
            currProduct: {},
            qtys: 1,
            trNo: "",
            orderTotal: 0,
            notes: "",
            hotelProduct: [{
                hotelName: "qqq",
                roomName: "twin bed2",
                productName: "ttt",
                productDesc: "ttt",
                productId: "DkNdV19Rsp45zKrn",
                price: {
                    dayprice: {
                        "2020-10-11": 220,
                        "2020-10-12": 0,
                        "2020-10-13": 220,
                        "2020-10-14": 220,
                        "2020-10-15": 220,
                        "2020-10-16": 220,
                        "2020-10-17": 220,
                        "2020-10-18": 220,
                        "2020-10-19": 0,
                        "2020-10-20": 220
                    },
                    total: 1760
                }
            }]
        }
    },
    created() {
        var user = this.$store.getters.getUserInfo
        this.user = user
    },
    methods: {
        selectDays(e) {
            this.checkIn = moment(e[0]).format("YYYY-MM-DD")
            this.checkOut = moment(e[1]).format("YYYY-MM-DD")
            console.log("select days", e, this.checkIn)
        },
        searchProduct() {
            const that = this
            const filters = that.filterText
            console.log(filters, that.$api, this.days)
            const url = "/hotels/search-hotel-product-day"
            var data = {
                filterText: "qq",
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
        },
        qtyChange(e) {
            const that = this
            that.qtys = e
            var total = that.qtys * that.currProduct.price.total
            that.total = total
            console.log("qtyChange change", e, total)
        },
        saveOrder() {
            const that = this
            var order = {
                customerId: that.user.customerId,
                productId: that.currProduct.productId,
                qty: that.qtys,
                orderTotal: that.total
            }
            console.log("order", order)
        }
    }
}
</script>
