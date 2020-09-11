<template>
<div class="container">
    <h2>酒店产品</h2>
    <el-row>
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
    <el-row>
        <el-form :model="hotelProduct">
            <el-form-item label="酒店">
                <el-input v-model="hotelProduct.hotelName" />
            </el-form-item>
            <el-form-item label="客房">
                <el-input v-model="hotelProduct.roomName" />
            </el-form-item>
        </el-form>
    </el-row>
</div>
</template>

<script>
export default {
    name: "productHotel",
    data() {
        return {
            hotelName: "",
            hotelProduct: {},
            hotels: [],
            hotelRooms: [],
            state: "",
            timeout: null
        };
    },
    mounted() {
        this.hotels = this.loadHotelName();
    },
    methods: {
        loadHotelName() {
            // 必须有 value 字段
            return [{
                    value: "xxxx 酒店",
                    address: "长宁区新渔路144号",
                    hotelId: 131
                },
                {
                    value: "yyyy 酒店",
                    address: "上海市长宁区淞虹路661号",
                    hotelId: 132
                }
            ]
        },
        querySearch(queryString, cb) {
            var hotels = this.hotels;
            var results = queryString ? hotels.filter(this.createFilter(queryString)) : hotels;
            console.log("results", results)
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            console.log("queryString", queryString)
            return (hotels) => {
                console.log("h", hotels.value)
                return (hotels.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log("item,", item);
            var hotelId = item.hotelId
            this.hotelId = hotelId
            this.hotelName = item.value
            this.hotelRooms = [{
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
        selectRoom(e) {
            // select room for product
            console.log("e,", e)
            const _this = this
            _this.hotelProduct = {
                hotelId: _this.hotelId,
                hotelName: _this.hotelName,
                roomName: e.roomName,
                roomId: e.roomId
            }
            console.log("hotelProduct", _this.hotelProduct)
        },
        toCreateHotel() {
            console.log("to create hotel")
            var nr = this.$router.resolve({
                name: "HotelHome"
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        }
    }
};
</script>
