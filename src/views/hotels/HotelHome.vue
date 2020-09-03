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
            <el-checkbox-group v-model="hotel.type">
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
    data () {
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
            ],
            tableData: [{
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ]
        };
    },
    methods: {
        onSubmit () {
            console.log("submit!");
        },
        roomDtl (e) {
            console.log(e);
            var nr = this.$router.resolve({
                name: "HotelRoom",
                query: {
                    roomId: 2
                }
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        }
    }
};
</script>
