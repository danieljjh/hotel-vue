<template>
<div class="container">
    <h2>酒店产品</h2>
    <el-row>
        <el-row :gutter="20">
            <el-table :data="hotels" style="width: 100%">
                <el-table-column prop="productType" label="类型" width="180">
                </el-table-column>
                <el-table-column prop="productName" label="名称" width="180">
                </el-table-column>
                <el-table-column prop="startDate" label="startDate">
                </el-table-column>
                <el-table-column prop="bookingTerm" label="bookingTerm" />
                <el-table-column prop="dailyPrice" :formatter="formatDailyPrice" label="dailyPrice" />

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
            hotels: [{
                    productId: "uiweojwox22",
                    productType: "客房",
                    productName: "xxhotel 客房",
                    roomId: "roomid-001",
                    hotelId: "hotelId-001",
                    startDate: "2020-09-01",
                    endDate: "2021-08-31",
                    dailyPrice: [
                        200,
                        200,
                        200,
                        200,
                        200,
                        300,
                        300
                    ],
                    bookingType: "立即确认",
                    bookingTerm: "不可取消",
                    vendorId: "vendor-001",
                    isActive: true
                },
                {
                    productId: "uiweojwox2",
                    productType: "客房",
                    productName: "xxhotel 客房",
                    roomId: "roomid-001",
                    hotelId: "hotelId-001",
                    startDate: "2020-09-01",
                    endDate: "2021-08-31",
                    dailyPrice: [
                        200,
                        200,
                        200,
                        200,
                        200,
                        300,
                        300
                    ],
                    bookingType: "立即确认",
                    bookingTerm: "不可取消",
                    vendorId: "vendor-001",
                    isActive: true
                }
            ]
        }
    },
    mounted() {
        // this.hotels = this.loadHotelName();
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
        }
    }
};
</script>
