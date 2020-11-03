<template>
<div class="container">
    <h1>{{currentHotel.hotelName}} </h1>
    <el-row class="container">
        <el-row :gutter="20">
            <div>
                <el-popover v-if="currentHotel.hotelId !== undefined " placement="bottom" title="新增房型" width="800" trigger="manual" v-model="addRoom">
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
                            <el-row>
                                <el-col :md="8">
                                    <el-form-item label="入住人数">
                                        <el-input v-model.number="newRoom.maxPerson" type="number" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-button type="primary" @click="saveNewRoom">保存</el-button>
                                <el-button type="" @click="cancelNewRoom">隐藏</el-button>
                            </el-row>
                        </el-form>
                    </el-row>
                    <el-button type="warning" slot="reference" @click="addRoom = true">新增房型</el-button>
                </el-popover>
            </div>
        </el-row>
    </el-row>
    <el-row>
        <el-table :data="rooms" style="width: 100%">
            <el-table-column prop="roomName" label="房型" width="180"/>
            <el-table-column prop="maxPerson" label="人数" width="180" />
            <el-table-column prop="bedType" label="床型" width="80"/>
            <!-- <el-table-column prop="roomId" label="roomId" width="180"></el-table-column> -->

            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-popover placement="bottom-start" title="修改房型" width="800" trigger="manual" v-model="chgRoom">
                        <el-row>
                            <el-form :model="currRoom" label-width="120px">
                                <el-row :gutter="20">
                                    <el-col :md="10">
                                        <el-form-item label="房型名称">
                                            <el-input v-model="currRoom.roomName" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="10">
                                        <el-form-item label="床型">
                                            <el-input v-model="currRoom.bedType" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :md="10">
                                        <el-form-item label="图片 网址">
                                            <el-input v-model="currRoom.roomThumb" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="10">

                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :md="8">
                                        <el-form-item label="入住人数">
                                            <el-input v-model.number="currRoom.maxPerson" type="number" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-button type="primary" @click="updateRoom">保存</el-button>
<el-button type="primary" @click="cancelUpdateRoom">隐藏</el-button>
                                </el-row>
                            </el-form>
                        </el-row>
                    <div slot="reference" class="name-wrapper">
                        <el-button type="primary" size="mini" @click="modifyRoom(scope.row)">修改</el-button>
                    </div>
                    </el-popover>

                </template>
            </el-table-column>
        </el-table>
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
            currRoom: {},
            createNew: false,
            hotelList: [],
            rooms: [],
            filterText: "",
            currentHotel: {},
            addRoom: false,
            chgRoom: false
        }
    },
    watch: {
        filterText(val) {
            console.log("watch", val)
            this.$refs.tree.filter(val);
        }
    },
    created() {
        const hotelId = this.$route.query.hotelId
        if (hotelId !== undefined) {
            this.getHotelDtl(hotelId)
        }
    },
    methods: {
        getHotelDtl(hotelId) {
            var that = this
            console.log(hotelId);
            that.$http.get(that.$api + "/hotels/get-hotel-info", {
                params: {
                    hotelId: hotelId
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
        updateRoom() {
            var that = this
            that.chgRoom = false
        },
        cancelUpdateRoom() {
            this.chgRoom = false
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
