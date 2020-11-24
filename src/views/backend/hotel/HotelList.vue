<template>
<div class="container">
    <h1>酒店和房型</h1>
    <el-row>
        <el-button type="primary" @click="createHotels">新增酒店</el-button>
        <el-row>
            <el-card v-if="createNew">
                <el-form :model="newHotel" label-width="120px">
                    <el-row :gutter="20">
                        <el-col :md="10">
                            <el-form-item label="酒店">
                                <el-input v-model="newHotel.hotelName" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="10">
                            <el-form-item label="说明描述">
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
                                <el-input v-model="newHotel.district" type="text" />
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
    </el-row>
    <el-row class="container">
        <el-row>
            <el-table :data="hotelList" style="width: 100%">
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.hotelThumb" width="80" v-if="scope.row.hotelThumb!==null"/>
                        <img :src="dfltThumb" width="80" v-if="scope.row.hotelThumb===null"/>
                    </template>
                </el-table-column>
                <el-table-column prop="hotelName" label="酒店" width="180"></el-table-column>
                <el-table-column prop="hotelAddress" label="地址" width="180"></el-table-column>
                <el-table-column prop="city" label="城市" width="180" />
                <el-table-column prop="district" label="行政区" width="180" />
                <el-table-column prop="hotelSummary" label="说明" width="180"></el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editHotel(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="HotelDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
                <span>你将要删除 酒店 {{hotelToDel.hotelName}}, 及所有的相关产品，点击确定，继续。 或取消，则不删除</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteHotel">确 定</el-button>
                </span>
            </el-dialog>
        </el-row>
    </el-row>
</div>
</template>

<script>
export default {
    name: "hotellists",
    data() {
        return {
            dfltThumb: require("@/assets/logo.png"),
            newHotel: {},
            newRoom: {},
            currRoom: {},
            createNew: false,
            hotelList: [],
            rooms: [],
            filterText: "",
            currentHotel: {},
            addRoom: false,
            chgRoom: false,
            dialogVisible: false,
            hotelToDel: {}
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
        modifyRoom(row) {
            // alert("显示 " + this.currentHotel.hotelName + "相关产品")
            this.currRoom = row
            this.chgRoom = true
        },
        editHotel(row) {
            console.log("cust", row)
            var nr = this.$router.resolve({
                name: "hotelDetails",
                query: {
                    hotelId: row.hotelId
                }
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        },
        createHotels() {
            var that = this
            // that.createNew = true
            var nr = that.$router.resolve({
                name: "hotelDetails"
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_blank");
            console.log("create new hotel")
        },
        cancellNewHotel() {
            this.createNew = false
        },
        HotelDelete(row) {
            console.log(row, row.hotelId)
            this.dialogVisible = true
            this.hotelToDel = row
        },
        deleteHotel() {
            const hotelToDel = this.hotelToDel
            const url = this.$api + "/hotels/hotel-remove"
            this.$http.get(url, {
                params: {
                    hotelId: hotelToDel.hotelId,
                    status: "toDel"
                }
            }).then(
                (res) => {
                    console.log(res)
                    this.dialogVisible = false
                    this.$router.go()
                }
            )
        },
        saveNewHotel() {
            const that = this
            console.log(that.newHotel)
            const url = that.$api + "/hotels/create-hotel"
            that.$http.post(url, that.newHotel).then(
                res => {
                    console.log(res.data)
                    var newHt = res.data
                    newHt.label = res.data.hotelName
                    that.hotelList.push(newHt)
                    this.$alert("已创建新酒店，可酒店，添加房型", "输入酒店完成", {
                        confirmButtonText: "确定",
                        callback: action => {}
                    });
                }
            )
        },

        saveNewRoom() {
            const that = this
            const url = this.$api + "/hotels/create-room"
            console.log("currenHotel", this.currentHotel)
            var roomData = {
                hotelId: this.currentHotel.hotelId,
                roomName: this.newRoom.roomName,
                bedType: this.newRoom.bedType,
                maxPerson: this.newRoom.maxPerson
            }
            this.$http.post(url, roomData).then(
                res => {
                    console.log(res.data)
                    var roomNew = res.data
                    that.rooms.push(roomNew)
                    this.$alert("已创建房型", "添加房型完成", {
                        confirmButtonText: "确定",
                        callback: action => {}
                    });
                    that.newRoom = {}
                    that.addRoom = false
                }
            )
        },
        cancelNewRoom() {
            this.addRoom = false
        }
    }
}
</script>
