<template>
<div class="container">
    <h1>预订酒店</h1>
    <el-row>
        <el-card>
            <el-form label-width="80px">
                <el-row :gutter="20">
                    <el-col :md="8">
                        <el-form-item label="城市">
                            <el-input placeholder="输入关键字进行过滤" v-model="city" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="12">
                        <el-form-item label="酒店名称">
                            <el-input placeholder="输入关键字进行过滤" v-model="hotelName" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="日期">
                        <el-date-picker v-model="days" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="searchProduct">搜索</el-button>
                </el-row>
            </el-form>
        </el-card>
        <h4>酒店和房型</h4>
        <el-row>
            <el-table :data="hotelProduct" style="width: 100%">
                <el-table-column prop="hotelName" label="酒店" width="180"></el-table-column>
                <el-table-column prop="roomName" label="房型" width="180"></el-table-column>
                <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
                <el-table-column prop="productDesc" label="产品说明" width="180"></el-table-column>
                <el-table-column prop="bedType" label="床型" width="80"></el-table-column>
                <el-table-column prop="dayprice" :formatter="priceCal" label="价格" width="180"></el-table-column>

                <el-table-column label="操作" width="60">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="newRoomProd(scope.row)">选择</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-button type="primary" >新增房型</el-button> -->
        </el-row>

    </el-row>
</div>
</template>

<script>
export default {
    name: "cust-list-hotel",
    data() {
        return {
            city: "",
            hotelName: "",
            filterText: "",
            days: "",
            hotelProduct: []
        }
    },
    created() {

    },
    methods: {
        searchProduct() {
            const that = this
            const filters = that.filterText
            console.log(filters, that.$api)
            const url = "/hotels/search-hotel-product-day"
            var data = {
                filterText: "qq",
                start: "2020-10-11",
                end: "2020-10-21",
                qty: 1
            }
            that.$http.post(that.$api + url, data).then(
                res => {
                    console.log(res.data)
                    that.hotelProduct = res.data
                }
            )
        },
        priceCal: function (row, column, cellValue) {
            // 你想在页面展示的值
            console.log(row, cellValue)
            var total = row.price.total > 0 ? row.price.total : ""
            return total;
        }
    }
}
</script>
