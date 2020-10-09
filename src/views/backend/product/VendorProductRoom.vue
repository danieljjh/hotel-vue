<template>
<div class="container">
    <h2>酒店产品</h2>
    <el-row>
        <el-row :gutter="20">
            <el-table :data="hotelProducts" style="width: 100%">
                <el-table-column prop="hotelName" label="酒店名称" width="180">
                </el-table-column>
                <el-table-column prop="roomName" label="房型名称" width="180">
                </el-table-column>

                <el-table-column prop="productName" label="产品名称" width="180">
                </el-table-column>
                <!-- <el-table-column prop="startDate" label="startDate">
                </el-table-column>
                <el-table-column prop="bookingTerm" label="bookingTerm" />
                <el-table-column prop="dailyPrice" :formatter="formatDailyPrice" label="dailyPrice" /> -->

            </el-table>
        </el-row>

    </el-row>
    <el-row>

    </el-row>
</div>
</template>

<script>
export default {
    name: "productHotel",
    data() {
        return {
            hotelProducts: []
        }
    },
    mounted() {
        // this.hotels = this.loadHotelName();
        this.getProducts()
    },
    methods: {
        formatDailyPrice(row, column, cellValue) {
            console.log(row, column, cellValue)
            var ret = ""
            for (var v in cellValue) {
                ret += cellValue[v].toString() + ";"
            }
            return ret
        },
        toCreateHotel() {
            console.log("to create hotel")
            var nr = this.$router.resolve({
                name: "HotelHome"
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        },
        getProducts() {
            var that = this
            var url = "/hotels/find-hotel-product"
            var filter = { isActive: true }
            that.$http.post(that.$api + url, filter).then(
                (res) => {
                    console.log(res.data)
                    that.hotelProducts = res.data
                }
            )
        }
    }
};
</script>
