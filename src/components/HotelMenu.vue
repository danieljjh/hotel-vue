<template>
<el-menu default-active="2" :default-openeds="dftOpen" class="el-menu-vertical-demo menu" router>
    <el-submenu index="1">
        <template slot="title">
            <i class="el-icon-location"></i>
            <span>商家产品</span>
        </template>
        <el-menu-item-group>
            <template slot="title">产品</template>
            <el-menu-item index="1-1" route="/hotel/partnerhotels">酒店及客房</el-menu-item>
            <el-menu-item index="1-2" route="/hotel/packages">套餐产品</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="价格">
            <el-menu-item index="1-3">设置价格表</el-menu-item>
        </el-menu-item-group>
        <!-- <el-submenu index="1-4">
            <template slot="title">会员</template>
            <el-menu-item index="1-4-1">会员</el-menu-item>
        </el-submenu> -->
    </el-submenu>
    <el-menu-item index="2" route="/hotel/orders">
        <i class="el-icon-menu"></i>
        <span slot="title" >预订单</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">对账</span>
    </el-menu-item>
    <el-menu-item index="4" route="/hotel/partner">
        <i class="el-icon-setting"></i>
        <span slot="title" >商家信息</span>
    </el-menu-item>
    <el-menu-item index="9" @click="logout">
        <i class="el-icon-setting"></i>
        <span slot="title">注销</span>
    </el-menu-item>
</el-menu>
</template>

<script>
export default {
    name: "backmenu",
    data() {
        return {
            dftOpen: ["1"]
        }
    },
    methods: {
        logout() {
            console.log("logout");
            localStorage.removeItem("Authorization");
            localStorage.removeItem("Idt");
            var nr = this.$router.resolve({
                name: "Login"
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        }
    }
};
</script>
<style scoped>
.menu{
    text-align: left;
}
</style>
