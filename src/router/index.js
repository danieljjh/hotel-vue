import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

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
        name: "BackHOme",
        component: () => import("@/views/backend/BackHome.vue")
    },
    {
        path: "/hotel/partner",
        name: "PartnerlHome",
        component: () => import("@/views/hotels/PartnerHome.vue")
    },
    {
        path: "/hotel/partnerhotels",
        name: "PartnerHotels",
        component: () => import("@/views/hotels/PartnerHotels.vue")
    },
    {
        path: "/hotel/home",
        name: "HotelHome",
        component: () => import("@/views/hotels/HotelHome.vue")
    },
    {
        path: "/hotel/room",
        name: "HotelRoom",
        component: () => import("@/views/hotels/HotelRoom.vue")
    },
    {
        path: "/hotel/orders",
        name: "HotelOrders",
        component: () => import("@/views/hotels/HotelOrders.vue")
    },
    {
        path: "/hotel/packages",
        name: "hotelpackage",
        component: () => import("@/views/hotels/Packages.vue")
    },
    {
        path: "/hotel/product-hotel",
        name: "hotelproduct",
        component: () => import("@/views/hotels/ProductRoom.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    // const toUrl = router.to
    const token = localStorage.getItem("Authorization");
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
