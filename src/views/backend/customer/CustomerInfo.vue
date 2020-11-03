<template>
<div class="container">
    <h1>商家信息</h1>
    <el-form ref="form" :model="partner" label-width="80px" size="mini">
        <el-form-item label="商家名称">
            <el-input v-model="partner.customerName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="partner.customerType" placeholder="请选择">
                <el-option label="旅行社" value="lxs"></el-option>
                <el-option label="连锁酒店" value="chainHotel"></el-option>
                <el-option label="单体酒店" value="hotel"></el-option>
                <el-option label="酒店代理" value="Agent"></el-option>
                <!-- <el-option label="景区代理" value="beijing"></el-option> -->
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="区域">
            <el-select v-model="partner.region" placeholder="请选择区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="联系电话">
            <el-input v-model="partner.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="权限">
            <el-checkbox-group v-model="customerRoles" size="medium">
                <el-checkbox v-for="role in roleOpts" :label="role" :key="role">{{role}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
const roleOpts = ["customer", "vendor"]
export default {
    name: "hotelhome",
    data() {
        return {
            roleOpts: roleOpts,
            partner: {},
            customerRoles: []
        }
    },
    created() {
        const custId = this.$route.query.custId
        console.log("q", custId)
        if (custId !== undefined) {
            this.getCustDtl(custId)
        }
    },
    methods: {
        onSubmit() {
            const that = this
            console.log("submit!");
            const url = that.$api + "/user/update-customer"
            that.$http.post(url, that.partner).then(
              (res) => {
                console.log(res.data)
              }
            )
        },
        getCustDtl(custId) {
            const that = this
            const url = that.$api + "/user/get-customer"
            that.$http.get(url, {
                params: {
                    custId: custId
                }
            }).then(
                (res) => {
                    console.log("customer", res.data)
                    that.partner = res.data
                    that.customerRoles = res.data.customerRoles
                }
            )
        }
    }
};
</script>
