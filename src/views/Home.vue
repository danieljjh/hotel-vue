<template>
<div class="home">
    <HelloWorld msg="欢迎使用留得住酒店联盟平台" />
    <!-- <el-button type="warning" @click="logOut">注销</el-button> -->

</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

export default {
    name: "Home",
    components: {
        HelloWorld
    },
    created() {
        this.msg = "home...."
        // var Idt = localStorage.getItem("Idt")
        // console.log("idt", Idt)
        console.log("store userInfo", this.$store.getters.getUserInfo)
    },
    methods: {
        logOut() {
            localStorage.removeItem("Authorization");
            localStorage.removeItem("Idt");
            this.$router.push("/login");
        }
    }
}
</script>
