<template>
<div class="container">
    <!-- <h2>Index</h2> -->
    <h2>Welcome to Hotel Cloud {{nick}}</h2>
    <h5>扫码登录</h5>
    <div id="qrcode"></div>
    <!-- <div v-if="isLocal"> -->
    <div>
        <el-select v-model="userType" placeholder="请选择角色">
            <el-option label="酒店/商家经营者" value="ptnr"></el-option>
            <el-option label="旅行社" value="lxs"></el-option>
            <el-option label="平台管理员" value="ldz"></el-option>
        </el-select>
        <el-button @click="fakeLogin">模拟登录</el-button>
    </div>
</div>
</template>

<script>
import {
    mapMutations
} from "vuex";

export default {
    name: "login",
    components: {},
    data() {
        return {
            userType: "",
            userRole: "",
            isLocal: false,
            nick: "",
            userToken: "",
            customerId: "",
            unknow: ""
        };
    },
    mounted() {
        var _this = this
        _this.wechatHandleClick()
        if (process.env.NODE_ENV === "development") {
            _this.isLocal = true
        }
        console.log("query code", this.$route.query.code, this.$route.from)
        try {
            var c = this.$route.query.code
            if (c === undefined) {
                _this.wechatHandleClick()
            } else {
                _this.wxLogin(c)
            }
        } catch (err) {
            console.log("login err", err)
        }
    },
    methods: {
        ...mapMutations(["setToken"]),

        wxLogin(code) {
            var _this = this
            // let c = _this.getLoginCode('code')
            // console.log('c', c)
            if (code !== undefined) {
                _this.$http.post("https://hotel.i568.me/ht/wxapi/wxauth", {
                    code: code
                }).then(
                    (res) => {
                        console.log("login", code, res.data)
                        if (res.data.errcode === 0) {
                            const userInfo = {
                                Authorization: res.data.tks.u_token,
                                Idt: res.data.tks.idt
                            }
                            _this.nick = userInfo.Idt.name
                            localStorage.setItem("Authorization", JSON.stringify(userInfo.Authorization))
                            localStorage.setItem("Idt", JSON.stringify(userInfo.Idt))
                            _this.setToken(userInfo)
                            var storeUser = _this.$store.getters.getUserInfo
                            console.log("verify store data", storeUser)
                            _this.$router.push("/");
                        } else {
                            _this.unknow = "没找到用户信息，请注册或添加用户"
                            console.log("not login")
                        }
                    }
                )
                // _this.$router.push("/");
            }
            // _this.$router.push("/");
        },
        fakeLogin() {
            // 模拟登录
            const _this = this
            var res = {
                errcode: 0,
                tks: {
                    idt: {
                        name: "蒋哥",
                        openid: "someOpenid",
                        userRole: _this.userRole,
                        unionid: "og-931L_VSbKFeESCtHB6VrkPbLY",
                        userType: _this.userType
                    },
                    u_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTA0MzI4MzAsIm5iZiI6MTU5MDQzMjgzMCwianRpIjoiZGRhNzNlMDctMTcyOC00NDVjLTgxYmQtMzc4ZDZjMDBlN2U1IiwiaWRlbnRpdHkiOnsibmljayI6Ilx1ODQ4Ylx1NTRlNSIsInVuaW9uaWQiOiJvZy05MzFMX1ZTYktGZUVTQ3RIQjZWcmtQYkxZIiwieGN4X29wZW5pZCI6Im92RjM3NGkzendsMl82bEJLNVpXcTJCb0lWdUEiLCJkaXN0X29wZW5pZCI6Im8weWdFNWxRVm5LSHJTd3JKM0ZORnhfMUxJWFUiLCJyb2xlcyI6WyJjdXN0IiwiZGlzdCIsIm1hbmFnZSIsIm1lbWJlciJdfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.KQ6-2KSr2-_2I5lQDx-gmgrW63l4Bd5zDfRhFl0NhIM"
                }
            }
            if (_this.userType === "ptnr") {
                _this.customerId = "MLoODbqov46z07va"
                res.tks.idt.customerId = _this.customerId
            } else if (_this.userType === "lxs") {
                _this.customerId = "MLoODbqov46z07va"
                res.tks.idt.customerId = _this.customerId
            } else {
                res.tks.idt.customerId = "ldz"
            }
            const userInfo = {
                Authorization: res.tks.u_token,
                Idt: res.tks
            }
            console.log("userInfo", userInfo)
            _this.nick = userInfo.Idt.name
            localStorage.setItem("Authorization", JSON.stringify(userInfo.Authorization))
            localStorage.setItem("Idt", JSON.stringify(userInfo.Idt))
            _this.setToken(userInfo)
            // var storeUser = _this.$store.getters.getUserInfo
            // console.log("verify store data", storeUser)
            _this.$router.push("/");
        },
        wechatHandleClick() {
            const ba64Css = ""
            /*eslint-disable */
            var obj = new WxLogin({
                self_redirect: false,
                id: "qrcode",
                appid: "wxcd5525acb6754d0d",
                scope: "snsapi_login",
                redirect_uri: encodeURIComponent("https://hotel.i568.me/back/login"),
                state: "1211111",
                style: "black",
                href: "data:text/css;base64," + ba64Css
            })
        }
    }
};
</script>

<style scoped>
.container {
    margin-top: 10%;
    margin-left: 20%;
}
</style>
