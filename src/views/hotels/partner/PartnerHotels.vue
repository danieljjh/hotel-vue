<template>
<div class="container ">
    <h1>商家酒店产品列表</h1>
    <el-row>
        <el-button type="primary" @click="getHotels">新增酒店产品</el-button>
        <el-card class="box-card box1" v-if="showNewProd">
            <el-row class="" >
                <el-col :span="12">
                    <el-row>
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                        </el-input>
                        <el-col :md="6">
                            <h3>请选择酒店</h3>
                            <el-tree class="filter-tree" :data="hotelList" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick">
                            </el-tree>
                        </el-col>
                        <el-col :md="18">
                            <h4>房型</h4>
                            <el-row>
                                <el-table :data="productRoom" style="width: 100%">
                                    <el-table-column prop="roomName" label="产品名称" width="180"></el-table-column>
                                    <el-table-column prop="bedType" label="床型" width="80"></el-table-column>
                                    <!-- <el-table-column prop="roomId" label="roomId" width="180"></el-table-column> -->

                                    <el-table-column label="操作" width="60">
                                        <template slot-scope="scope">
                                            <el-button type="primary" size="mini" @click="newRoomProd(scope.row)">选择</el-button>

                                        </template>
                                    </el-table-column>
                                </el-table>
                                <!-- <el-button type="primary" >新增房型</el-button> -->
                            </el-row>
                        </el-col>

                    </el-row>
                </el-col>
                <el-col :span=12>
                    <el-form :model="hotelProduct" label-width="120px">
                        <el-row :gutter="20">
                            <el-col :md="10">
                                <el-form-item label="酒店">
                                    <el-input v-model="hotelProduct.hotelName" :disabled="true" />
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
                            <el-button type="warning" @click="cancell">取消</el-button>

                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>

    </el-row>
    <el-row>
        <el-table :data="hotelProducts" style="width: 100%">
            <el-table-column prop="hotelName" label="酒店" width="180"></el-table-column>
            <el-table-column prop="roomlName" label="房型" width="180"></el-table-column>

            <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
            <el-table-column prop="productDesc" label="说明" width="180"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="editRoomProd(scope.row)">修改</el-button>

                </template>
            </el-table-column>
        </el-table>
    </el-row>

</div>
</template>

<script>
export default {
    name: "ptnrhotels",
    data() {
        return {
            customerId: "",
            showNewProd: false,
            filterText: "",
            hotelProducts: [],
            productRoom: [],
            defaultProps: {
                children: "hotelRoom",
                label: "label"
            },
            hotelList: [],
            hotelProduct: {},
            currentHotel: {}
        }
    },
    watch: {
        filterText(val) {
            console.log("watch", val)
            this.$refs.tree.filter(val);
        }
    },
    created() {
        var customerId = "MLoODbqov46z07va"
        // this.getHotels()
        this.customerId = customerId
        this.getHotelProducts(customerId)
    },
    methods: {
        getHotelProducts(custId) {
            var that = this
            that.$http.post(that.$api + "/hotels/find-hotel-product", {
                customerId: custId
            }).then(
                (res) => {
                    console.log("products", res.data)
                    that.hotelProducts = res.data
                }
            )
        },
        editRoomProd(e) {
            console.log(e)
            // var itemCode = e.itemCode;
            var nr = this.$router.resolve({
                name: "hotelproduct",
                query: {
                    type: "product",
                    strId: e.productId
                }
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        },
        getHotels() {
            var that = this
            that.showNewProd = true
            console.log("api", that.$api)
            that.$http.get(that.$api + "/hotels/get-hotelrooms-tree", {
                params: {
                    filter_str: ""
                }
            }).then(
                (res) => {
                    console.log("hotels", res.data)
                    that.hotelList = res.data
                }
            )
        },
        filterNode(value, data) {
            var that = this
            if (that.hotelList.length === 0) {
                that.getHotels("qq")
            }

            console.log("value", data)
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeClick(data) {
            var that = this
            console.log(data, data.hotelId);
            that.$http.get(that.$api + "/hotels/get-hotel-info", {
                params: {
                    hotelId: data.hotelId
                }
            }).then(
                (res) => {
                    console.log("hotelDtl", res.data)
                    that.productRoom = res.data.rooms
                    that.currentHotel = res.data.hotel
                }
            )
        },
        newRoomProd(row) {
            var that = this
            console.log("new", row)
            var hotelProduct = {
                hotelName: that.currentHotel.hotelName,
                roomName: row.roomName,
                roomId: row.roomId,
                customerId: that.customerId,
                updatedBy: "some one",
                bookingLeadDays: 1,
                bookingMinDays: 1,
                bookingMaxDays: 30
            }
            that.hotelProduct = hotelProduct
            console.log("that.hotelProduct", that.hotelProduct)
            // var nr = this.$router.resolve({
            //     name: "hotelproduct",
            //     query: {
            //         type: "room",
            //         strId: row.roomId
            //     }
            // });
            // window.open(nr.href, "_blank");
        },
        saveProduct() {
            var that = this
            var url = "/hotels/create-hotel-product"
            that.$http.post(that.$api + url, that.hotelProduct).then(
                (res) => {
                    console.log("upsert produce", res.data)
                    var newHotelProd = res.data
                    newHotelProd.hotelName = that.hotelProduct.hotelName
                    that.hotelProducts.push(newHotelProd)
                }
            )
        },
        cancell() {
            this.showNewProd = false
        },
        formatDailyPrice(row, column, cellValue) {
            console.log(row, column, cellValue)
            var ret = ""
            for (var v in cellValue) {
                ret += cellValue[v].toString() + ";"
            }
            return ret
        },
        toHotelDtl(e) {
            // var itemCode = e.itemCode;
            var nr = this.$router.resolve({
                name: "HotelHome",
                query: {
                    hotelId: 2
                }
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        }
    }
};
</script>

<style scoped>
.newhotel {
    margin-top: 30px;
}
.box1{
    margin-bottom: 20px;
}
</style>
