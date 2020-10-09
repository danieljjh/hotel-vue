<template>
<div class="container">
    <h1>商家列表</h1>
    <div class="container">
        <el-popover placement="bottom-right" title="新增商家" width="800" trigger="click">

            <el-row>
                <el-form :model="newCustomer" label-width="120px">
                    <el-row :gutter="20">
                        <el-col :md="10">
                            <el-form-item label="商家名称">
                                <el-input v-model="newCustomer.customerName" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="10">
                            <el-form-item label="类型">
                                <el-input v-model="newCustomer.customerType" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="联系电话">
                            <el-input v-model="newCustomer.contactPhone" />
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="角色">
                            <el-input v-model="newCustomer.customerRoles" />
                        </el-form-item>
                    </el-row>
                    <!-- <el-row>
                                    <el-form-item label="地址">
                                        <el-input v-model="newHotel.hotelAddress" />
                                    </el-form-item>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :md="8">
                                        <el-form-item label="城市">
                                            <el-input v-model="newHotel.city" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="8">
                                        <el-form-item label="行政区">
                                            <el-input v-model.number="newHotel.district" type="number" />
                                        </el-form-item>
                                    </el-col>
                                </el-row> -->
                    <el-row>
                        <el-button type="primary" @click="savenewCustomer">保存</el-button>

                    </el-row>
                </el-form>
            </el-row>
            <el-button type="warning" slot="reference">新增商家</el-button>
        </el-popover>
    </div>
    <el-row>
        <el-table :data="customers" style="width: 100%">
            <el-table-column prop="customerName" label="全称" width="180"></el-table-column>
            <el-table-column prop="isActive" label="状态" width="180"></el-table-column>

            <el-table-column prop="companyNo" label="公司执照" width="180"></el-table-column>
            <el-table-column prop="customerType" label="类型" width="180"></el-table-column>
            <el-table-column prop="customerRoles" label="角色" width="180"></el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="editCustomer(scope.row)">修改</el-button>

                </template>

            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="bottom">
                        <p>商家: {{ scope.row.customerName }}</p>
                        <p>商家 微信扫码 后绑定微信号，从公众号获取登录密码</p>
                        <img class="qr" :src="invUrl" />
                        <el-button slot="reference" type="primary" size="mini" @click="inviteQR(scope.row)">邀请二维码</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</div>
</template>

<script>
export default {
    name: "customers",
    data() {
        return {
            customers: [],
            newCustomer: {},
            invUrl: ""
        }
    },
    created() {
        this.getCustomer()
    },
    methods: {
        getCustomer() {
            var that = this;
            var url = "/user/filter-customer"
            var filter = {
                isActive: true
            }
            that.$http.post(that.$api + url, filter).then(
                (res) => {
                    console.log("customers", res.data)
                    that.customers = res.data
                }
            )
        },
        editCustomer(row) {
            console.log("cust", row)
        },
        inviteQR(row) {
            console.log("invite", row)
            var that = this
            var custId = row.customerId
            var url = "/user/gen-user-qr"
            that.$http.get(that.$api + url, {
                params: {
                    user: custId,
                    src: "cust"
                }
            }).then(
                (res) => {
                    console.log(res.data)
                    that.invUrl = res.data.qr_url
                }
            )
        },
        savenewCustomer() {
            var that = this
                       var url = "/user/create-customer"
            that.newCustomer.customerRoles = that.newCustomer.customerRoles.split(",")
            that.$http.post(that.$api + url, that.newCustomer).then(
                (res) => {
                    console.log("customers", res.data)
                    that.customers.push(res.data)
                }
            )
        }
    }
}
</script>

<style scoped>
.qr {
    width: 200px;
}
</style>
