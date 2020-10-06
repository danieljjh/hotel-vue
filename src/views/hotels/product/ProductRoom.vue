<template>
<div class="container">
    <h2>酒店产品</h2>
    <!-- <el-row>
        <h3>请选择酒店和房间， 如无，则先去添加酒店 </h3>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-button type="primary" @click="toCreateHotel">添加酒店及客房</el-button>
            </el-col>
            <el-col :span="16">
                <el-autocomplete style="width: 80%" class="inline-input" v-model="state" label="检查酒店名称" :fetch-suggestions="querySearch" placeholder="请输入酒店名称" @select="handleSelect">
                    <template slot="prepend">酒店名称</template>
                </el-autocomplete>
                <el-table :data="hotelRooms" style="width: 100%">
                    <el-table-column prop="roomName" label="房间名称" width="180"></el-table-column>
                    <el-table-column prop="roomDesc" label="说明" width="180"></el-table-column>
                    <el-table-column prop="roomType" label="类型"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="selectRoom(scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>

    </el-row>
    <el-divider></el-divider> -->

    <el-row>
        <el-col :md="18">
            <el-form :model="hotelProduct" label-width="100px">
                <el-row :gutter="20">
                    <el-col :md="10">
                        <el-form-item label="酒店">
                            <el-input v-model="hotelProduct.hotelName" :disabled="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :md="10">
                        <el-form-item label="客房">
                            <el-input v-model="hotelProduct.roomName" :disabled="true" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="10">
                        <el-form-item label="产品名称">
                            <el-input v-model="hotelProduct.productName" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="10">

                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="产品说明">
                        <el-input v-model="hotelProduct.productDesc" />
                    </el-form-item>
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="8">
                        <el-form-item label="提前预订天数">
                            <el-input v-model.number="hotelProduct.bookingLeadDays" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="最小预订天数">
                            <el-input v-model.number="hotelProduct.bookingMinDays" type="number" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="最大预订天数">
                            <el-input v-model.number="hotelProduct.bookingMaxDays" type="number" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="8">
                        <el-form-item label="付款方式">
                            <el-input v-model="hotelProduct.payTerm" />

                            <!-- <el-radio-group v-model="hotelProduct.payTerm">
                                <el-radio label="预付"></el-radio>
                                <el-radio label="到店支付"></el-radio>
                            </el-radio-group> -->
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="取消条款">
                            <el-input v-model="hotelProduct.cancelTerm" />

                            <!-- <el-radio-group v-model="hotelProduct.cancelTerm">
                                <el-radio label="不可取消"></el-radio>
                                <el-radio label="提前2天取消"></el-radio>
                            </el-radio-group> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="saveProduct">保存</el-button>
                </el-row>
            </el-form>
        </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-row v-if="hotelProduct.productId!==undefined">
        <h4>价格</h4>
        <el-row>
            <template>
                <el-popover placement="right" title="价格" width="700" height="600" offset="0" trigger="click">
                    <h3>新增价格计划</h3>
                    <el-form :model="priceLine" label-width="80px">
                        <el-form-item label="开始日期">
                            <el-date-picker v-model="priceLine.start" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="截止日期">
                            <el-date-picker v-model="priceLine.end" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="有效">
                            <el-switch v-model="priceLine.isActive" active-text="有效" inactive-text="停售">
                            </el-switch>
                        </el-form-item>
                        <el-row>
                            <el-table :data="priceLine.weekPrice" style="width: 100%">
                                <el-table-column prop="weekDay" label="周天" width="120"></el-table-column>
                                <el-table-column prop="price" label="价格" width="120"></el-table-column>
                            </el-table>
                        </el-row>
                        <!-- <el-popover placement="right" width="400" trigger="click"> -->
                        <el-row>
                            <el-col :md="12">
                                <el-form-item label="周天数">
                                    <el-input v-model="weekDay" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="价格">
                                    <el-input v-model="dayPrice" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-button type="warning" @click="addWpriceNew()">添加/更新价格</el-button>

                            <!-- {{articles}} -->
                        </el-row>
                        <!-- </el-popover> -->
                        <el-divider></el-divider>

                        <el-button type="primary" @click="savePricePlan()">保存价格表</el-button>
                    </el-form>
                    <el-button slot="reference" class="name-wrapper" type="primary" size="mini" @click="newPricePlan">新增</el-button>

                </el-popover>
            </template>
        </el-row>
        <el-row :gutter="20">
            <el-table :data="pricePlan" style="width: 100%">
                <el-table-column prop="start" label="开始日期" width="80"></el-table-column>
                <el-table-column prop="end" label="截止日期" width="80"></el-table-column>
                <el-table-column prop="minPrice" label="单价"></el-table-column>
                <el-table-column prop="priceByDay" label="单价"></el-table-column>
                <el-table-column label="操作" width="60">
                    <template slot-scope="scope">
                        <el-popover placement="bottom" title="价格" width="700" height="600" offset="0" trigger="click">
                            <el-form :model="priceLine" label-width="80px">
                                <el-form-item label="开始日期">
                                    <el-date-picker v-model="priceLine.start" type="date" placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="截止日期">
                                    <el-date-picker v-model="priceLine.end" type="date" placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>

                                <el-form-item label="有效">
                                    <el-switch v-model="priceLine.isActive" active-text="有效" inactive-text="停售">
                                    </el-switch>
                                </el-form-item>
                                <el-row>
                                    <el-table :data="priceLine.weekPrice" style="width: 100%">
                                        <el-table-column prop="weekDay" label="周天" width="120"></el-table-column>
                                        <el-table-column prop="price" label="价格" width="120"></el-table-column>
                                    </el-table>
                                </el-row>
                                <!-- <el-popover placement="right" width="400" trigger="click"> -->
                                <el-row>
                                    <el-col :md="12">
                                        <el-form-item label="周天数">
                                            <el-input v-model="weekDay" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="价格">
                                            <el-input v-model="dayPrice" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-button type="warning" @click="addWprice()">添加/更新价格</el-button>

                                    <!-- {{articles}} -->
                                </el-row>
                                <!-- </el-popover> -->
                                <el-divider></el-divider>

                                <el-button type="primary" @click="savePricePlan()">保存价格表</el-button>
                            </el-form>
                            <el-button slot="reference" class="name-wrapper" type="primary" size="mini" @click="selectPrice(scope.row)">修改</el-button>

                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>

        </el-row>

    </el-row>

</div>
</template>

<script>
export default {
    name: "productHotel",
    data() {
        return {
            pricePlan: [],
            priceLine: {},
            hotelProduct: {},
            hotel: [],
            hotelRoom: [],
            state: "",
            timeout: null,
            weekDay: "",
            dayPrice: 0,
            wdPrice: []
        };
    },
    created() {
        var type = this.$route.query.type
        var strId = this.$route.query.strId
        this.customerId = "MLoODbqov46z07va"
        this.userName = "someone"
        if (type === "room") {
            console.log("new product", strId)
            this.getRoomInfo(strId)
        } else {
            this.productId = strId
            this.getProduct(strId)
        }
    },
    methods: {
        getProduct(productId) {
            var that = this
            var url = "/hotels/get-hotel-product"
            that.$http.get(that.$api + url, {
                params: {
                    productId: productId
                }
            }).then(
                (res) => {
                    console.log("product", res.data)
                    that.hotelRoom = res.data.hotelRoom.hotelRoom
                    that.hotel = res.data.hotelRoom.hotelInfo
                    that.hotelProduct = res.data.product
                    that.hotelProduct.hotelName = res.data.hotelInfo.hotelName
                    that.hotelProduct.roomName = res.data.hotelRoom.roomName
                    that.hotelProduct.roomId = res.data.hotelRoom.roomId
                    console.log("edit product", that.hotelProduct)
                    that.getPricePlan(productId)
                }
            )
        },
        saveProduct() {
            var that = this
            if (that.productId === undefined) {
                console.log("new product", that.hotelProduct)
            } else {
                console.log(" product", that.hotelProduct)
            }
            that.hotelProduct.customerId = that.customerId
            that.hotelProduct.updatedBy = that.userName
            var url = "/hotels/create-hotel-product"
            that.$http.post(that.$api + url, that.hotelProduct).then(
                (res) => {
                    console.log("upsert produce", res.data)
                    that.hotelProduct = res.data
                    that.productId = res.data.productId
                    var nr = this.$router.resolve({
                        name: "hotelproduct",
                        query: {
                            type: "product",
                            strId: that.productId
                        }
                    });
                    // window.open(nr.href, "_blank");
                    window.open(nr.href, "_self");
                }
            )
        },
        getPricePlan(productId) {
            var that = this
            var url = "/hotels/get-hotel-product-price"
            that.$http.post(that.$api + url, {
                productId: productId,
                isActive: true
            }).then(
                (res) => {
                    console.log("priceplan", res.data)
                    that.pricePlan = res.data
                }
            )
        },
        newPricePlan() {
            // var that = this
            console.log("newPricePlan")
            var weekPrice = []
            for (var x = 1; x < 8; x++) {
                weekPrice.push({
                    weekDay: x,
                    price: 0
                })
            }
            this.priceLine.weekPrice = weekPrice
            this.priceLine.productId = this.productId
            this.priceLine.priceName = "新计划"
            this.priceLine.isActive = true
            this.priceLine.updatedBy = "someone"
            this.priceLine.minPrice = 0
            console.log("this.pricePlan", this.priceLine)
        },
        getRoomInfo(roomId) {
            var that = this
            var url = "/hotels/get-hotel-room"
            that.$http.get(that.$api + url, {
                params: {
                    roomId: roomId
                }
            }).then(
                (res) => {
                    console.log("room", res.data)
                    that.hotelRoom = res.data.hotelRoom
                    that.hotel = res.data.hotelInfo
                    that.hotelProduct = {
                        hotelName: res.data.hotelInfo.hotelName,
                        roomName: res.data.hotelRoom.roomName,
                        roomId: res.data.hotelRoom.roomId
                    }
                    console.log("hotelProduct", that.hotelProduct)
                }
            )
        },
        selectPrice(e) {
            console.log("current priceplan", e)
            this.priceLine = e
            var dp = e.dayPrice
            var weekPrice = []
            for (var x in dp) {
                weekPrice.push({
                    weekDay: parseInt(x) + 1,
                    price: dp[x]
                })
            }
            this.priceLine.weekPrice = weekPrice
        },
        addWprice() {
            const _this = this
            var days = _this.weekDay.replace(/[^0-9]/g, " ").split(" ")
            var wprice = _this.priceLine.weekPrice
            console.log("reg", days)
            if (days.length === 1) {
                var d = parseInt(days) - 1
                wprice[d].weekDay = d + 1
                wprice[d].price = parseInt(_this.dayPrice)
            } else {
                var weekDay = days
                for (var x in weekDay) {
                    var i = parseInt(weekDay[x]) - 1
                    console.log("x : i", x, i)
                    if (x !== "" && i >= 0 && i < 7) {
                        wprice[i].weekDay = i + 1
                        wprice[i].price = parseInt(_this.dayPrice)
                    }
                }
                _this.priceLine.weekPrice = wprice
            }
        },
        addWpriceNew() {
            const _this = this
            var days = _this.weekDay.replace(/[^0-9]/g, " ").split(" ")
            var wprice = _this.priceLine.weekPrice
            console.log("reg", days)
            if (days.length === 1) {
                var d = parseInt(days) - 1
                wprice[d].weekDay = d + 1
                wprice[d].price = parseInt(_this.dayPrice)
            } else {
                var weekDay = days
                console.log("weekDay", weekDay)
                for (var i = 0; i < weekDay.length; i++) {
                    var x = parseInt(weekDay[i])
                    console.log("x : i", x, i)
                    if (x !== "" && x >= 0 && x < 7) {
                        wprice[x - 1].weekDay = x
                        wprice[x - 1].price = parseInt(_this.dayPrice)
                    }
                }
            }
            _this.priceLine.weekPrice = wprice
            console.log("_this.priceLine.weekPrice", _this.priceLine.weekPrice)
        },
        removeDaprice(row, index) {
            console.log(row, index)
            // this.wdPrice.pop(index)
            this.wdPrice.splice(index, 1)
        },
        savePricePlan() {
            var that = this
            var dayPrice = []
            var weekPrice = that.priceLine.weekPrice
            for (var i in weekPrice) {
                dayPrice.push(weekPrice[i].price)
            }
            var newPriceLine = that.priceLine
            newPriceLine.dayPrice = dayPrice
            console.log("newPriceLine start", typeof (newPriceLine.start))
            console.log("dayPrice", dayPrice)
            console.log(newPriceLine)
            var url = "/hotels/create-hotel-product-price"
            that.$http.post(that.$api + url, newPriceLine).then(
                (res) => {
                    console.log("res", res.data)
                    if (newPriceLine.id === undefined) {
                        this.pricePlan.push(res.data)
                    }
                }
            )

            // this.pricePlan.push(this.priceLine)
        }
    }
};
</script>
