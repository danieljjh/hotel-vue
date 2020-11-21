<template>
<div id="app">
    <div v-if="auth == false">
        <router-view />
    </div>
    <div v-if="auth == true">
        <el-row :gutter="20" v-if="userType==='ldz' ">
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
        <el-row :gutter="20" v-if="userType==='lxs'">
            <el-col :span="4">
                <trmenu />
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
import trmenu from "@/components/TrMenu";

export default {
    name: "App",
    components: {
        BackMenu,
        hotelbackmenu,
        trmenu
    },
    data() {
        return {
            auth: false,
            userRole: "",
            userInfo: {},
            userType: ""
        };
    },
    watch: {
        $route() {
            this.checkLogin();
        }
    },
    created() {
        this.checkLogin();
    },
    methods: {
        checkLogin() {
            console.log("check login");
            const _this = this;
            try {
                var storeUser = _this.$store.getters.getUserInfo
                var token = _this.$store.getters.getAuthToken
            } catch (err) {
                localStorage.removeItem("Authorization");
                localStorage.removeItem("Idt");
                this.$router.push("/login");
            }

            console.log("app.vue store data", storeUser, token)
            if (storeUser !== null) {
                console.log("storeUser", storeUser)
                _this.auth = true;
                try {
                    _this.userRole = storeUser.idt.userRole
                    _this.userType = storeUser.idt.userType
                    _this.userInfo = storeUser.idt
                    var userData = {
                        Authorization: token,
                        Idt: storeUser.Idt
                    }
                    console.log("appvue userData", userData);
                    console.log("app vue", _this.userType)
                } catch (err) {
                    localStorage.removeItem("Authorization");
                    localStorage.removeItem("Idt");
                    this.$router.push("/login");
                }
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
