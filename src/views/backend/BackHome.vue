<template>
  <div class="container">
    <el-col :span="3">
        <hotelbackmenu />
    </el-col>
    <el-col :span="21">
      <div class="container">
        <h1>平台首页</h1>
      </div>
    </el-col>
  </div>
</template>
<script>
import hotelbackmenu from "@/components/HotelMenu";

export default {
  name: "backhome",
  components: { hotelbackmenu }
};
</script>
