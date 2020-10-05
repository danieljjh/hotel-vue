<template>
<div class="container">
    <h1>商家酒店产品列表</h1>
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
    <el-row>

        <el-popover placement="bottom" title="标题" width="600" height="600"  offset="0" trigger="click">
            <el-row>
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>
            </el-row>
            <el-row>
                <el-col :md="6">
                    <el-tree class="filter-tree" :data="hotelList" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick">
                    </el-tree>
                </el-col>
                <el-col :md="18">
                    <h4>房型</h4>
                    <el-row>
                        <el-table :data="productRoom" style="width: 100%">
                            <el-table-column prop="roomName" label="产品名称" width="180"></el-table-column>
                            <el-table-column prop="bedType" label="床型" width="180"></el-table-column>
                            <!-- <el-table-column prop="roomId" label="roomId" width="180"></el-table-column> -->

                            <el-table-column label="操作" width="160">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="newRoomProd(scope.row)">选择</el-button>

                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- <el-button type="primary" >新增房型</el-button> -->
                    </el-row>
                </el-col>

            </el-row>
            <div slot="reference" class="name-wrapper">

                <el-button type="primary" @click="getHotels">新增产品</el-button>
            </div>
        </el-popover>
        <!--  -->

    </el-row>
</div>
</template>

<script>
export default {
    name: "ptnrhotels",
    data() {
        return {
            filterText: "",
            hotelProducts: [],
            productRoom: [],
            defaultProps: {
                children: "hotelRoom",
                label: "label"
            },
            hotelList: []
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
                    productId: e.productId
                }
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        },
        getHotels() {
            var that = this
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
            that.$http.get(that.$api + "/hotels/get-hotel-info", { params: { hotelId: data.hotelId } }).then(
                (res) => {
                    console.log("hotelDtl", res.data)
            that.productRoom = res.data.rooms
                }
            )
        },
        newRoomProd(row) {
            console.log("new")
            var nr = this.$router.resolve({
                name: "hotelproduct",
                query: {
                    roomId: row.roomId
                }
            });
            window.open(nr.href, "_blank");
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
