<template>
<div class="container">
    <h2>酒店产品</h2>
    <!-- <el-row>
        <h3>请选择酒店和房间， 如无，则先去添加酒店 </h3>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-button type="primary" @click="toCreateHotel">添加酒店及客房</el-button>
            </el-col>
            <el-col :span="16">
                <el-autocomplete style="width: 80%" class="inline-input" v-model="state" label="检查酒店名称" :fetch-suggestions="querySearch" placeholder="请输入酒店名称" @select="handleSelect">
                    <template slot="prepend">酒店名称</template>
                </el-autocomplete>
                <el-table :data="hotelRooms" style="width: 100%">
                    <el-table-column prop="roomName" label="房间名称" width="180"></el-table-column>
                    <el-table-column prop="roomDesc" label="说明" width="180"></el-table-column>
                    <el-table-column prop="roomType" label="类型"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="selectRoom(scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>

    </el-row>
    <el-divider></el-divider> -->

    <el-row>
        <el-col :md="18">
            <el-form :model="hotelProduct" label-width="100px">
                <el-row :gutter="20">
                    <el-col :md="10">
                        <el-form-item label="酒店">
                            <el-input v-model="hotelProduct.hotelName" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="10">
                        <el-form-item label="客房">
                            <el-input v-model="hotelProduct.roomName" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="10">
                        <el-form-item label="产品名称">
                            <el-input v-model="hotelProduct.productTitle" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="10">

                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="产品说明">
                        <el-input v-model="hotelProduct.prodDesc" />
                    </el-form-item>
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="8">
                        <el-form-item label="提前预订天数">
                            <el-input v-model="hotelProduct.leadDays" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="最小预订天数">
                            <el-input v-model="hotelProduct.minDays" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="最大预订天数">
                            <el-input v-model="hotelProduct.maxDays" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="8">
                        <el-form-item label="付款方式">
                            <el-radio-group v-model="hotelProduct.payTerm">
                                <el-radio label="预付"></el-radio>
                                <el-radio label="到店支付"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8">
                        <el-form-item label="取消条款">
                            <el-radio-group v-model="hotelProduct.cancelTerm">
                                <el-radio label="不可取消"></el-radio>
                                <el-radio label="提前2天取消"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-button type="primary">保存</el-button>
                </el-row>
            </el-form>
        </el-col>
    </el-row>

    <el-divider></el-divider>

    <el-row>
        <h4>价格</h4>
        <el-row :gutter="20">
            <el-col :md="12">
                <el-table :data="pricePlan" style="width: 100%">
                    <el-table-column prop="startDay" label="开始日期" width="80"></el-table-column>
                    <el-table-column prop="endDay" label="截止日期" width="80"></el-table-column>
                    <el-table-column prop="price" label="单价"></el-table-column>
                    <el-table-column label="操作" width="60">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="selectPrice(scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :md="10">
                <el-form :model="priceLine" label-width="80px">
                    <el-form-item label="开始日期">
                        <el-date-picker v-model="priceLine.startDay" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="截止日期">
                        <el-date-picker v-model="priceLine.endDay" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="有效">
                        <el-switch v-model="priceLine.isActive" active-text="有效" inactive-text="停售">
                        </el-switch>
                    </el-form-item>
                    <el-row>
                        <el-table :data="wdPrice" style="width: 100%">
                            <el-table-column prop="weekDay" label="周天" width="120"></el-table-column>
                            <el-table-column prop="dayPrice" label="价格" width="120"></el-table-column>
                            <el-table-column label="操作" width="80">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" @click="removeDaprice(scope.row, scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-popover placement="right" width="400" trigger="click">
                        <el-row>
                            <el-col :md="12">
                                <el-form-item label="周天数">
                                    <el-input v-model="weekDay" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="价格">
                                    <el-input v-model="dayPrice" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-button type="warning" @click="addWprice()">添加</el-button>

                            <!-- {{articles}} -->
                        </el-row>

                        <div slot="reference" class="name-wrapper">
                            <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
                            <!-- <el-button size="mini" >显示</el-button> -->
                            <el-button>添加每天价格</el-button>

                        </div>
                    </el-popover>
                    <el-divider></el-divider>

                    <el-button type="primary" @click="savePricePlan()">保存价格表</el-button>
                </el-form>
            </el-col>

        </el-row>
    </el-row>

</div>
</template>

<script>
export default {
    name: "productHotel",
    data() {
        return {
            pricePlan: [],
            priceLine: {},
            hotelName: "",
            hotelProduct: {},
            hotels: [],
            hotelRooms: [],
            state: "",
            timeout: null,
            weekDay: "",
            dayPrice: 0,
            wdPrice: []
        };
    },
    mounted() {
        this.hotels = this.loadHotelName();
    },
    methods: {
        loadHotelName() {
            // 必须有 value 字段
            return [{
                    value: "xxxx 酒店",
                    address: "长宁区新渔路144号",
                    hotelId: 131
                },
                {
                    value: "yyyy 酒店",
                    address: "上海市长宁区淞虹路661号",
                    hotelId: 132
                }
            ]
        },
        querySearch(queryString, cb) {
            var hotels = this.hotels;
            var results = queryString ? hotels.filter(this.createFilter(queryString)) : hotels;
            console.log("results", results)
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            console.log("queryString", queryString)
            return (hotels) => {
                console.log("h", hotels.value)
                return (hotels.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log("item,", item);
            var hotelId = item.hotelId
            this.hotelId = hotelId
            this.hotelName = item.value
            this.hotelRooms = [{
                    roomId: 999,
                    roomName: "xx房间",
                    roomDesc: "xx房间",
                    roomFacility: [],
                    roomType: "大床房",
                    roomDtl: []
                },
                {
                    roomId: 9991,
                    roomName: "xx房间",
                    roomDesc: "xx房间",
                    roomFacility: [],
                    roomType: "大床房",
                    roomDtl: []
                }
            ]
        },
        selectRoom(e) {
            // select room for product
            console.log("e,", e)
            const _this = this
            _this.hotelProduct = {
                hotelId: _this.hotelId,
                hotelName: _this.hotelName,
                roomName: e.roomName,
                roomId: e.roomId
            }
            console.log("hotelProduct", _this.hotelProduct)
        },
        toCreateHotel() {
            console.log("to create hotel")
            var nr = this.$router.resolve({
                name: "HotelHome"
            });
            // window.open(nr.href, "_blank");
            window.open(nr.href, "_self");
        },
        selectPrice(e) {
            console.log(e)
        },
        addWprice() {
            const _this = this
            console.log("day price", _this.weekDay, _this.dayPrice)

            _this.wdPrice.push({
                weekDay: _this.weekDay,
                dayPrice: _this.dayPrice
            })
            console.log(_this.wdPrice)
        },
        removeDaprice(row, index) {
            console.log(row, index)
            // this.wdPrice.pop(index)
            this.wdPrice.splice(index, 1)
        },
        savePricePlan() {
            console.log("save price line", this.priceLine)
            this.pricePlan.push(this.priceLine)
        }
    }
};
</script>
