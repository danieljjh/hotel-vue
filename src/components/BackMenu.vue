<template>
<div>
    <el-menu default-active="1" :default-openeds="dftOpen" class="el-menu-vertical-demo menu" router>
        <h4>管理后台</h4>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-shopping-bag-2"></i>
                <span>酒店和客房</span>
            </template>
            <el-menu-item-group>
                <template slot="title">
                    <span>产品</span>
                </template>
                <el-menu-item index="1-3" route="/back/vendor-product-hotel">酒店和客房</el-menu-item>
                <el-menu-item index="1-4">景区和门票</el-menu-item>
                <el-menu-item index="1-4">套餐</el-menu-item>
            </el-menu-item-group>
            <!-- <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-date"></i>
                <span>订单</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="2-1">酒店预订单</el-menu-item>
                <el-menu-item index="2-2">预售券预约</el-menu-item>
                <el-menu-item index="2-3">商户订单</el-menu-item>
            </el-menu-item-group>
            <!-- <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
        </el-submenu> -->
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-school"></i>
                <span>商家管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="5-1" route="/back/customer-list">商家列表</el-menu-item>
                <el-menu-item index="5-2" route="/back/hotel-list">酒店</el-menu-item>
                <el-menu-item index="5-3">景区</el-menu-item>
            </el-menu-item-group>
            <!-- <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
        </el-submenu>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">消息</span>
        </el-menu-item>
        <el-submenu index="7">
            <template slot="title">
                <i class="el-icon-present"></i>
                <span>会员和推广</span>
            </template>
            <el-menu-item index="7-1">会员</el-menu-item>
            <el-menu-item index="7-2">会员等级</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">平台用户</span>
        </el-menu-item>
        <el-menu-item index="9" @click="logout">
            <i class="el-icon-turn-off"></i>
            <span slot="title">注销</span>
        </el-menu-item>
    </el-menu>
</div>
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
            console.log("logout")
            localStorage.removeItem("Authorization");
            localStorage.removeItem("Idt");

            var nr = this.$router.resolve({
                name: "Login"
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        }
    }
}
</script>

<style scoped>
.menu {
    text-align: left;
}
</style>
