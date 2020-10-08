<template>
<div class="container">
    <h1>酒店列表</h1>
    <el-row>
        <el-button type="primary" @click="createHotels">新增酒店</el-button>
        <el-card v-if="createNew">
            <el-form :model="newHotel" label-width="120px">
                <el-row :gutter="20">
                    <el-col :md="10">
                        <el-form-item label="酒店">
                            <el-input v-model="newHotel.hotelName" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="10">
                        <el-form-item label="城市">
                            <el-input v-model="newHotel.hotelSummary" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="10">
                        <el-form-item label="图片 网址">
                            <el-input v-model="newHotel.hotelThumb" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="10">

                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="地址">
                        <el-input v-model="newHotel.hotelAddress" />
                    </el-form-item>
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="8">
                        <el-form-item label="城市">
                            <el-input v-model="newHotel.city" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="行政区">
                            <el-input v-model.number="newHotel.district" type="number" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row :gutter="20">
                            <el-col :md="8">
                                <el-form-item label="付款方式">
                                    <el-input v-model="hotelProduct.payTerm" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                                <el-form-item label="取消条款">
                                    <el-input v-model="hotelProduct.cancelTerm" />
                                </el-form-item>
                            </el-col>
                        </el-row> -->
                <el-row>
                    <el-button type="primary" @click="saveNewHotel">保存</el-button>
                    <el-button type="warning" @click="cancellNewHotel">取消</el-button>

                </el-row>
            </el-form>
        </el-card>
    </el-row>
    <el-row class="">
        <el-row>

            <el-col :md="10" :lg="8">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>
                <h3>请选择酒店</h3>

                <el-tree class="filter-tree" :data="hotelList" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick">
                </el-tree>
            </el-col>
            <el-col :md="14" :lg="14">
                <h4>房型</h4>
                <el-row>
                    <h3>{{currentHotel.hotelName}}</h3>

                    <el-popover v-if="currentHotel.hotelId !== undefined " placement="bottom" title="新增房型" width="800" trigger="click">

                        <el-row>
                            <el-form :model="newRoom" label-width="120px">
                                <el-row :gutter="20">
                                    <el-col :md="10">
                                        <el-form-item label="房型名称">
                                            <el-input v-model="newRoom.roomName" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="10">
                                        <el-form-item label="床型">
                                            <el-input v-model="newRoom.bedType" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :md="10">
                                        <el-form-item label="图片 网址">
                                            <el-input v-model="newRoom.roomThumb" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="10">

                                    </el-col>
                                </el-row>
                                <!-- <el-row>
                                    <el-form-item label="地址">
                                        <el-input v-model="newHotel.hotelAddress" />
                                    </el-form-item>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :md="8">
                                        <el-form-item label="城市">
                                            <el-input v-model="newHotel.city" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="8">
                                        <el-form-item label="行政区">
                                            <el-input v-model.number="newHotel.district" type="number" />
                                        </el-form-item>
                                    </el-col>
                                </el-row> -->
                                <el-row>
                                    <el-button type="primary" @click="saveNewRoom">保存</el-button>

                                </el-row>
                            </el-form>
                        </el-row>
                        <el-button type="warning" slot="reference">新增房型</el-button>
                    </el-popover>
                    <el-table :data="rooms" style="width: 100%">
                        <el-table-column prop="roomName" label="房型" width="180"></el-table-column>
                        <el-table-column prop="bedType" label="床型" width="80"></el-table-column>
                        <!-- <el-table-column prop="roomId" label="roomId" width="180"></el-table-column> -->

                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="showProducts(scope.row)">相关产品</el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <el-button type="primary" >新增房型</el-button> -->
                </el-row>
            </el-col>

        </el-row>
    </el-row>
</div>
</template>

<script>
export default {
    name: "hotellists",
    data() {
        return {
            newHotel: {},
            newRoom: {},
            createNew: false,
            hotelList: [],
            rooms: [],
            filterText: "",
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
        var Idt = localStorage.getItem("Idt")
        if (Idt !== undefined) {
            var userInfo = JSON.parse(Idt);
        }
        this.getHotels()
        this.customerId = userInfo.customerId
    },
    methods: {
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
                    that.rooms = res.data.rooms
                    that.currentHotel = res.data.hotel
                }
            )
        },
        showProducts(row) {
            alert("显示 " + this.currentHotel.hotelName + "相关产品")
        },
        createHotels() {
            var that = this
            that.createNew = true
            console.log("create new hotel")
        },
        cancellNewHotel() {
            this.createNew = false
        },
        saveNewHotel() {

        },
        saveNewRoom() {

        }
    }
}
</script>
