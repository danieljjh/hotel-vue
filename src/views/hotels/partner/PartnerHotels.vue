<template>
<div class="container">
    <h1>商家酒店产品列表</h1>
    <el-row>
    </el-row>
    <el-row>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-col :md="6">
            <el-tree class="filter-tree" :data="hotelList" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick">
            </el-tree>
        </el-col>
        <el-col :md="18">
            <h4>房型产品</h4>
            <el-row>
        <el-button type="primary" @click="createNew">新增酒店产品</el-button>

            </el-row>
            <el-row>
                <el-table :data="productRoom" style="width: 100%">
                    <el-table-column prop="roomName" label="产品名称" width="180"></el-table-column>
                    <el-table-column prop="roomDesc" label="说明" width="180"></el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="editRoomProd(scope.row)">修改</el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-col>

    </el-row>
</div>
</template>

<script>
export default {
    name: "ptnrhotels",
    data() {
        return {
            filterText: "",
            productRoom: [],
            defaultProps: {
                children: "hotelRoom",
                label: "label"
            },
            hotelList: [{
                    id: 1,
                    city: "sh",
                    label: "xxxHotel",
                    hotelGrade: 3,
                    hotelRoom: [{
                            roomId: 999,
                            label: "xx房间",
                            roomDesc: "xx房间",
                            roomFacility: [],
                            roomType: "大床房",
                            roomDtl: []
                        },
                        {
                            roomId: 9991,
                            label: "xx房间",
                            roomDesc: "xx房间",
                            roomFacility: [],
                            roomType: "大床房",
                            roomDtl: []
                        }
                    ]
                },
                {
                    id: 1,
                    city: "sh",
                    label: "yyyHotel",
                    hotelGrade: 3,
                    hotelRoom: [{
                            roomId: 2999,
                            label: "xx房间",
                            roomDesc: "xx房间",
                            roomFacility: [],
                            roomType: "大床房",
                            roomDtl: []
                        },
                        {
                            roomId: 29991,
                            label: "xx豪华房",
                            roomDesc: "xx房间",
                            roomFacility: [],
                            roomType: "大床房",
                            roomDtl: []
                        }
                    ]
                }
            ]
        }
    },
    watch: {
        filterText(val) {
            console.log("watch", val)
            this.$refs.tree.filter(val);
        }
    },
    created() {
        this.getHotels()
    },
    methods: {
        getHotels() {
            var that = this
            that.$http.post(that.$api + "/hotels/get-hotels", { city: "shanghai" }).then(
                (res) => {
                    console.log("hotels", res.data)
                }
            )
        },
        filterNode(value, data) {
            console.log("value", data)
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeClick(data) {
            console.log(data, data.roomId);
            this.productRoom = [{
                    roomId: 999,
                    roomName: "xx房间",
                    roomDesc: "xx房间",
                    roomFacility: [],
                    roomType: "大床房",
                    roomDtl: []
                },
                {
                    roomId: 9991,
                    roomName: "xx房间",
                    roomDesc: "xx房间",
                    roomFacility: [],
                    roomType: "大床房",
                    roomDtl: []
                }
            ]
        },
        createNew() {
            console.log("new")
            var nr = this.$router.resolve({
                name: "hotelproduct",
                query: {
                    hotelId: 2
                }
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        },
        onSubmit() {
            console.log("submit!");
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
