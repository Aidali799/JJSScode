import { request } from "../../request/index.js";

Page({
    data: {
        //轮播图数组
        swiperList: [],
        //导航 数组
        catesList: [],
        //楼层数据
        floorList: []

    },
    onLoad: function (options) {
        // //1.发送异步请求获取轮播图数据
        // var reqTask = wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',

        //     success: (result) => {
        //         this.setData({ swiperList: result.data.message })
        //     },

        // });
        // request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata" })
        //     .then(result => {
        //         this.setData({ swiperList: result.data.message })
        //     })
        this.getSwiperList();
        this.getCateList();
        this.getFloorList();
    },
    //获取轮播图数据
    getSwiperList() {
        var reqTask = wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',

            success: (result) => {
                this.setData({ swiperList: result.data.message })
            },

        });

    },
    //获取 分类导航数据
    getCateList() {
        var reqTask = wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',

            success: (result) => {
                this.setData({ catesList: result.data.message })
            },

        });

    },
    //获取 分类导航数据
    getFloorList() {
        var reqTask = wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',

            success: (result) => {
                this.setData({ floorList: result.data.message })
            },

        });

    }
})
