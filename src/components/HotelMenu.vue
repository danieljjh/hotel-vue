<template>
<el-menu default-active="2" :default-openeds="dftOpen" class="el-menu-vertical-demo menu" router>
    <el-submenu index="1">
        <template slot="title">
            <i class="el-icon-shopping-bag-2"></i>
            <span>商家产品</span>
        </template>
        <el-menu-item-group>
            <template slot="title">产品</template>
            <el-menu-item index="1-1" route="/hotel/partnerhotels">酒店及客房</el-menu-item>
            <el-menu-item index="1-2" route="/hotel/packages">套餐产品</el-menu-item>
        </el-menu-item-group>
            <el-menu-item index="1-3">设置价格表</el-menu-item>
        <!-- <el-submenu index="1-4">
            <template slot="title">会员</template>
            <el-menu-item index="1-4-1">会员</el-menu-item>
        </el-submenu> -->
    </el-submenu>
        <el-submenu index="2">
        <template slot="title">
            <i class="el-icon-date"></i>
            <span>预订管理</span>
        </template>
            <el-menu-item index="21" route="/hotel/orders">
        <span slot="title">待确认预订单</span>
    </el-menu-item>
        <el-menu-item index="2-1">入住确认</el-menu-item>
        <el-menu-item index="2-2">订单历史</el-menu-item>
    </el-submenu>

    <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">对账</span>
    </el-menu-item>
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
.menu {
    text-align: left;
}
</style>
