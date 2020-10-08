<template>
<div id="app">
    <div v-if="auth == false">
        <router-view />
    </div>
    <div v-if="auth == true">
        <el-row :gutter="20" v-if="userType==='ldz'">
            <el-col :span="4">
                <BackMenu />
            </el-col>
            <el-col :span="20">
                <router-view />
            </el-col>
        </el-row>
        <el-row :gutter="20" v-if="userType==='ptnr'">
            <el-col :span="4">
                <hotelbackmenu />
            </el-col>
            <el-col :span="20">
                <router-view />
            </el-col>
        </el-row>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
</div>
</template>

<script>
import BackMenu from "@/components/BackMenu";
import hotelbackmenu from "@/components/HotelMenu";

export default {
    name: "App",
    components: {
        BackMenu,
        hotelbackmenu
    },
    data() {
        return {
            auth: false,
            userRole: "",
            userInfo: {}
        };
    },
    watch: {
        $route() {
            this.checkLogin();
        }
    },
    created() {
        console.log("check login");
        this.checkLogin();
    },
    methods: {
        checkLogin() {
            console.log("check login");
            const _this = this;
            var authData = localStorage.getItem("Authorization");
            var Idt = localStorage.getItem("Idt")
            console.log("idt", Idt)
            if (Idt !== undefined) {
                var userInfo = JSON.parse(Idt);
            }
            // console.log("userInfo", userInfo)
            if (authData !== null) {
                _this.auth = true;
                _this.userRole = userInfo.userRole;
                _this.userType = userInfo.userType
                _this.userInfo = userInfo
                console.log("appvue userInfo", _this.userInfo);
            }
        }
    }
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
