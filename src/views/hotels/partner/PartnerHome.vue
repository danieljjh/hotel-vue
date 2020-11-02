<template>
  <div class="container">
    <h1>商家信息</h1>
    <el-form ref="form" :model="partner" label-width="80px" size="mini">
      <el-form-item label="商家名称">
        <el-input v-model="partner.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="partner.ptnrType" placeholder="请选择区域">
          <el-option label="连锁酒店" value="shanghai"></el-option>
          <el-option label="单体酒店" value="beijing"></el-option>
          <el-option label="酒店代理" value="beijing"></el-option>
          <el-option label="景区代理" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域">
        <el-select v-model="partner.region" placeholder="请选择区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="partner.contactPerson"></el-input>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="partner.resource" size="medium">
          <el-radio border label="线上品牌商赞助"></el-radio>
          <el-radio border label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "hotelhome",
  data() {
    return {
      partner: {
        name: "xxx 商家",
        region: "",
        ptnrType: "连锁酒店",
        contactPerson: "",
        bizLicense: "营业执照号",
        contactPhone: "联系电话",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      hotels: [
        {
          hotelName: "xx 酒店",
          hotelAddress: "hoteladdress",
          hotelGrade: "",
          city: ""
        },
        {
          hotelName: "xx 酒店",
          hotelAddress: "hoteladdress",
          hotelGrade: "",
          city: ""
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
