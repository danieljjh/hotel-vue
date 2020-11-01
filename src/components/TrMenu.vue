<template>
<el-menu default-active="12" :default-openeds="dftOpen" class="el-menu-vertical-demo menu" router>
        <el-submenu index="12">
        <template slot="title">
            <i class="el-icon-date"></i>
            <span>预订酒店</span>
        </template>

        <el-menu-item index="12-0" route="/cust/listhotel">
            酒店预订
        </el-menu-item>
        <el-menu-item index="12-1" route="/hotel/orders">
            <span slot="title">待确认预订单</span>
        </el-menu-item>
        <el-menu-item index="12-2">订单历史</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
        <template slot="title">
            <i class="el-icon-present"></i>
            <span>会员和推广</span>
        </template>
        <el-menu-item index="5-1">会员</el-menu-item>
        <el-menu-item index="5-2">会员等级</el-menu-item>
    </el-submenu>
    <el-submenu index="6">
        <template slot="title">
            <i class="el-icon-school"></i>
            <span>商家信息</span>
        </template>
        <el-menu-item index="6-1" route="/hotel/partner">商家信息</el-menu-item>
        <el-menu-item index="6-2">用户和权限</el-menu-item>
        <!-- <el-submenu index="1-4">
            <template slot="title">会员</template>
            <el-menu-item index="1-4-1">会员</el-menu-item>
        </el-submenu> -->
    </el-submenu>
    <el-menu-item index="9" @click="logout">
        <i class="el-icon-turn-off"></i>
        <span slot="title">注销</span>
    </el-menu-item>
</el-menu>
</template>

<script>
export default {
    name: "trmenu",
    data() {
        return {
            dftOpen: ["12"]
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
.menu {
    text-align: left;
}
</style>
