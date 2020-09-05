<template>
<div class="container">
    <h1>酒店信息</h1>
    <el-form ref="form" :model="hotel" label-width="80px" size="mini">
        <el-form-item label="酒店名称">
            <el-input v-model="hotel.hotelName"></el-input>
        </el-form-item>
        <el-form-item label="城市">
            <el-select v-model="hotel.ciity" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="酒店地址">
            <el-input v-model="hotel.hotelAddress"></el-input>
        </el-form-item>
        <el-form-item label="等级">
            <el-select v-model="hotel.hotelGrade" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="酒店设施">
            <el-checkbox-group v-model="hotel.hotelFacility">
                <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
                <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
                <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
    <el-row>
        <h3>客房列表</h3>
        <el-row>
                    <el-button type="primary" size="mini" @click="newRoom">新建客房</el-button>

        </el-row>
        <el-table :data="hotelRooms" style="width: 100%">
            <el-table-column prop="roomName" label="房间名称" width="180"></el-table-column>
            <el-table-column prop="roomDesc" label="说明" width="180"></el-table-column>
            <el-table-column prop="roomType" label="类型"></el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="roomDtl(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</div>
</template>

<script>
export default {
    name: "hotelroom",
    data() {
        return {
            hotel: {
                hotelName: "xxx",
                city: "xx",
                hotelAddress: "",
                hotelGrade: "",
                hotelFacility: "",
                hotelPics: []
            },
            hotelRooms: [{
                    roomName: "xx房间",
                    roomDesc: "xx房间",
                    roomFacility: [],
                    roomType: "大床房",
                    roomDtl: []
                },
                {
                    roomName: "xx房间",
                    roomDesc: "xx房间",
                    roomFacility: [],
                    roomType: "大床房",
                    roomDtl: []
                }
            ]
        };
    },
    created() {
            const hotelId = this.$route.query.hotelId
            console.log("q", hotelId)
            if (hotelId !== undefined) {
                this.getHotelDtl(hotelId)
            }
    },
    methods: {
        getHotelDtl(hotelId) {
            const url = "https://jsonblob.com/api/6a81b857-ee72-11ea-b1f3-5fb2df3ea656"
            this.$http.get(url).then(
                (res) => {
                    console.log("gethotel", res.data)
                }
            )
        },
        onSubmit() {
            console.log("submit!");
        },
        roomDtl(e) {
            console.log(e);
            var nr = this.$router.resolve({
                name: "HotelRoom",
                query: {
                    hotelId: 3,
                    roomId: 2
                }
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        },
        newRoom() {
            var nr = this.$router.resolve({
                name: "HotelRoom",
                query: {
                    hotelId: 3,
                    roomId: 0
                }
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        }
    }
};
</script>
