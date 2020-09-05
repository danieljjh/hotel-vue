<template>
  <div class="container">
    <h1>商家酒店产品列表</h1>
    <el-row>
      <el-button type="primary" @click="createNew">新增酒店产品</el-button>
    </el-row>
    <el-row>
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
  </div>
</template>

<script>
export default {
  name: "ptnrhotels",
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
  methods: {
    createNew() {
      console.log("new")
            var nr = this.$router.resolve({
        name: "hotelproduct",
        query: {
          hotelId: 2
        }
      });
      // window.open(nr.href, "_blank");
      window.open(nr.href, "_self");
    },
    onSubmit() {
      console.log("submit!");
    },
    formatDailyPrice(row, column, cellValue) {
      console.log(row, column, cellValue)
      var ret = ""
      for (var v in cellValue) {
        ret += cellValue[v].toString() + ";"
      }
      return ret
    },
    toHotelDtl(e) {
      // var itemCode = e.itemCode;
      var nr = this.$router.resolve({
        name: "HotelHome",
        query: {
          hotelId: 2
        }
      });
      // window.open(nr.href, "_blank");
      window.open(nr.href, "_self");
    }
  }
};
</script>
