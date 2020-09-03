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
        component: () => import("@/views/hotels/HotelOrders.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router
