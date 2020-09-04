<template>
<div class="container">
    <h1>套餐产品</h1>
    <el-table :data="packages" style="width: 100%">
        <el-table-column prop="productType" label="类型" width="180">
        </el-table-column>
        <el-table-column prop="productName" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="startDate" label="startDate">
        </el-table-column>
        <el-table-column prop="bookingTerm" label="bookingTerm" />
        <el-table-column prop="packageInfo" label="套餐说明" />
        <!-- <el-table-column prop="packageDtl" :formatter="formatPackage" label="packageDtl" /> -->

        <el-table-column prop="price" label="price" />
    </el-table>
    <el-row>
        <h1>门票</h1>
        <el-table :data="tickets" style="width: 100%">
            <el-table-column prop="productType" label="类型" width="180">
            </el-table-column>
            <el-table-column prop="productName" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="startDate" label="startDate">
            </el-table-column>
            <el-table-column prop="bookingTerm" label="bookingTerm" />
            <el-table-column prop="price" label="price" />
        </el-table>
    </el-row>
</div>
</template>

<script>
export default {
    name: "hotelpackage",
    data() {
        return {
            packages: [{
                    productId: "uiweojwox22",
                    productType: "套餐",
                    productName: "xxhotel 客房",
                    startDate: "2020-09-01",
                    endDate: "2021-08-31",
                    price: 900,
                    bookingType: "立即确认",
                    bookingTerm: "不可取消",
                    vendorId: "vendor-001",
                    isActive: true,
                    packageInfo: "xx 酒店 2 晚， 含早， xx 门票 3 张",
                    packageDtl: [{
                        productType: "客房",
                        roomId: "roomid-001",
                        hotelId: "hotelId-001"
                    }, {
                        productType: "门票",
                        productName: "xxhotel 门票",
                        ticketId: "ticket-001"
                    }]

                },
                {
                    productId: "uiweojwox2",
                    productType: "客房",
                    productName: "xxhotel 客房",
                    roomId: "roomid-001",
                    hotelId: "hotelId-001",
                    startDate: "2020-09-01",
                    endDate: "2021-08-31",
                    price: 880,
                    bookingType: "立即确认",
                    bookingTerm: "不可取消",
                    vendorId: "vendor-001",
                    isActive: true,
                    packageInfo: "xx 酒店 2 晚， 含早， xx 门票 3 张",
                    packageDtl: [{
                        productType: "客房",
                        roomId: "roomid-001",
                        hotelId: "hotelId-001"
                    }, {
                        productType: "门票",
                        productName: "xxhotel 门票",
                        ticketId: "ticket-001"
                    }]
                }
            ],
            tickets: [{
                    productId: "uiweojwox22",
                    productType: "门票",
                    productName: "xxhotel 门票",
                    ticketId: "ticket-001",
                    startDate: "2020-09-01",
                    endDate: "2021-08-31",
                    price: 900,
                    bookingType: "立即确认",
                    bookingTerm: "不可取消",
                    vendorId: "vendor-001",
                    isActive: true
                },
                {
                    productId: "uiweojwox2",
                    productType: "门票",
                    productName: "xxhotel 门票",
                    ticketId: "ticket-001",
                    startDate: "2020-09-01",
                    endDate: "2021-08-31",
                    price: 880,
                    bookingType: "立即确认",
                    bookingTerm: "不可取消",
                    vendorId: "vendor-001",
                    isActive: true
                }
            ]

        }
    },
    methods: {
        onSubmit() {
            console.log("submit!")
        },
        formatPackage: function (row, column, cellValue) {
            var ret = ""; // 你想在页面展示的值
            for (var i in cellValue) {
                for (var k in cellValue[i]) {
                    console.log(cellValue[i], cellValue[i][k])
                    var name = cellValue[i][k] + " "
                    ret += name
                }
                ret += "\n"
            }
            return ret;
        }
    }
};
</script>
