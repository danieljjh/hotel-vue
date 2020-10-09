import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import store from "@/store"

Vue.use(VueRouter)

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
        // component: login,
        meta: {
            title: "登录"
        }
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../views/About.vue")
    },
    {
        path: "/home",
        name: "BackHome",
        component: () => import("@/views/backend/BackHome.vue")
    },
    {
        path: "/back/hotel-list",
        name: "BackProductHotel",
        component: () => import("@/views/backend/hotel/HotelList.vue")
    },
    {
        path: "/back/vendor-product-hotel",
        name: "VendorProductHotel",
        component: () => import("@/views/backend/product/VendorProductRoom.vue")
    },
    {
        path: "/back/customer-list",
        name: "CustomerList",
        component: () => import("@/views/backend/customer/Customers.vue")
    },
    {
        path: "/hotel/partner",
        name: "PartnerlHome",
        component: () => import("@/views/hotels/partner/PartnerHome.vue")
    },
    {
        path: "/hotel/partnerhotels",
        name: "PartnerHotels",
        component: () => import("@/views/hotels/partner/PartnerHotels.vue")
    },
    {
        path: "/hotel/home",
        name: "HotelHome",
        component: () => import("@/views/hotels/product/HotelInfo.vue")
    },
    {
        path: "/hotel/room",
        name: "HotelRoom",
        component: () => import("@/views/hotels/product/HotelRoom.vue")
    },
    {
        path: "/hotel/orders",
        name: "HotelOrders",
        component: () => import("@/views/hotels/booking/HotelOrders.vue")
    },
    {
        path: "/hotel/packages",
        name: "hotelpackage",
        component: () => import("@/views/hotels/product/Packages.vue")
    },
    {
        path: "/hotel/product-hotel",
        name: "hotelproduct",
        component: () => import("@/views/hotels/product/ProductRoom.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    // const toUrl = router.to
    var token = localStorage.getItem("Authorization");
    // try {
    var userInfo = store.getters.getUserInfo
    console.log("router userInfo", userInfo)
    // } catch (err) {
    //     console.log(err)
    // }

    if (to.path === "/login") {
        next()
    } else {
        // let token = localStorage.getItem("Authorization");
        // console.log('token', token)
        if (token === undefined || token === null) {
            // console.log('no token', token)
            next("/login");
        } else {
            // console.log('get token', token)
            next();
        }
    }
});

export default router
