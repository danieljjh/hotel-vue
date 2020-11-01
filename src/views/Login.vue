<template>
<div class="container">
    <!-- <h2>Index</h2> -->
    <h2>Welcome to Hotel Cloud {{nick}}</h2>
    <!-- <input type="text" v-model="loginForm.username" placeholder="用户名" />
                                <input type="text" v-model="loginForm.password" placeholder="密码" />
                                <button @click="login">登录</button> -->
    <!-- {{userToken}} -->
    <!-- <img alt="ogo" src="../assets/logo.jpg" /> -->

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
// import links from "@/components/links";

export default {
    name: "login",
    components: {},
    data() {
        return {
            // loginForm: {
            //     username: "",
            //     password: ""
            // },
            userType: "",
            userRole: "",
            isLocal: false,
            nick: "",
            userToken: "",
            customerId: ""
        };
    },
    mounted() {
        var _this = this
        _this.wechatHandleClick()

        const c = _this.getLoginCode("code")
        console.log("query code", this.$route.query.code, this.$route.from)
        this.wxLogin()
        if (c === undefined) {
            _this.wechatHandleClick()
        } else {
            _this.wxLogin(c)
        }
        if (process.env.NODE_ENV === "development") {
            _this.isLocal = true
        }
    },
    methods: {
        ...mapMutations(["setToken"]),

        getLoginCode(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
            var r = window.location.search.substr(1).match(reg)
            console.log("r", r)
            if (r != null) return unescape(r[2])
        },
        wxLogin(code) {
            var _this = this
            // let c = _this.getLoginCode('code')
            // console.log('c', c)
            if (code !== undefined) {
                _this.$http.post(_this.$wx + "/wx/wxapi/wxauth", {
                    code: code
                }).then(
                    (res) => {
                        console.log("login", code, res.data)
                        if (res.data.errcode === 0) {
                            const userInfo = {
                                Authorization: res.data.tks.u_token,
                                Idt: res.data.tks.idt
                            }
                            _this.nick = userInfo.Idt.nick
                            localStorage.setItem("Authorization", JSON.stringify(userInfo.Authorization))
                            localStorage.setItem("Idt", JSON.stringify(userInfo.Idt))
                            _this.setToken(userInfo)
                            _this.$router.push("/");
                        } else {
                            _this.unknow = "没找到用户信息，Do I Know you？"
                            console.log("not login")
                        }
                    }
                )
                // _this.$router.push("/index");
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
                        nick: "蒋哥",
                        userRole: _this.userRole,
                        unionid: "og-931L_VSbKFeESCtHB6VrkPbLY",
                        dist_openid: "o0ygE5lQVnKHrSwrJ3FNFx_1LIXU",
                        xcx_openid: "ovF374i3zwl2_6lBK5ZWq2BoIVuA"
                    },
                    u_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTA0MzI4MzAsIm5iZiI6MTU5MDQzMjgzMCwianRpIjoiZGRhNzNlMDctMTcyOC00NDVjLTgxYmQtMzc4ZDZjMDBlN2U1IiwiaWRlbnRpdHkiOnsibmljayI6Ilx1ODQ4Ylx1NTRlNSIsInVuaW9uaWQiOiJvZy05MzFMX1ZTYktGZUVTQ3RIQjZWcmtQYkxZIiwieGN4X29wZW5pZCI6Im92RjM3NGkzendsMl82bEJLNVpXcTJCb0lWdUEiLCJkaXN0X29wZW5pZCI6Im8weWdFNWxRVm5LSHJTd3JKM0ZORnhfMUxJWFUiLCJyb2xlcyI6WyJjdXN0IiwiZGlzdCIsIm1hbmFnZSIsIm1lbWJlciJdfSwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.KQ6-2KSr2-_2I5lQDx-gmgrW63l4Bd5zDfRhFl0NhIM"
                }
            }
            if (_this.userType === "ptnr") {
                _this.customerId = "MLoODbqov46z07va"
                res.tks.idt.customerId = _this.customerId
            } else {
                res.tks.idt.customerId = "ldz"
            }
            res.tks.idt.userType = _this.userType

            var userInfo = {
                Authorization: res.tks.u_token,
                Idt: res.tks.idt
            }
            console.log("userInfo", userInfo)
            _this.nick = userInfo.Idt.nick
            localStorage.setItem("Authorization", JSON.stringify(userInfo.Authorization))
            localStorage.setItem("Idt", JSON.stringify(userInfo.Idt))
            _this.setToken(userInfo)
            _this.$router.push("/");
        },
        wechatHandleClick() {
            const ba64Css = ""
            console.log(ba64Css)
            // var obj = new WxLogin({
            //     self_redirect: false,
            //     id: "qrcode",
            //     appid: "wx4a07bd62f5eaba75",
            //     scope: "snsapi_login",
            //     redirect_uri: encodeURIComponent("https://wx.aijuncai.com/bk/login"),
            //     state: "1211111",
            //     style: "black",
            //     href: "data:text/css;base64," + ba64Css
            // })
        }
        // login() {
        //     let _this = this;
        //     if (this.loginForm.username === "" || this.loginForm.password === "") {
        //         alert("账号或密码不能为空");
        //     } else {
        //         this.axios({
        //                 method: "post",
        //                 url: "/user/login",
        //                 data: _this.loginForm
        //             })
        //             .then(res => {
        //                 console.log(res.data);
        //                 _this.userToken = "Bearer " + res.data.data.body.token;
        //                 // 将用户token保存到vuex中
        //                 _this.changeLogin({ Authorization: _this.userToken });
        //                 _this.$router.push("/");
        //                 alert("登陆成功");
        //             })
        //             .catch(error => {
        //                 // alert("账号或密码错误");
        //                 // console.log(error);
        //                 _this.userToken = "Bearer";
        //                 // 将用户token保存到vuex中
        //                 _this.changeLogin({ Authorization: _this.userToken });
        //                 _this.$router.push("/");
        //                 alert("登陆成功");
        //             });
        //     }
        // }
    }
};
</script>

<style scoped>
.container {
    margin-top: 10%;
    margin-left: 20%;
}
</style>
