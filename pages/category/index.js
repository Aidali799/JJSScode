// pages/category/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //左侧菜单数据
        leftMenuList: [],
        //右侧商品数据
        rightContent: [],
        //被点击的左侧菜单
        currentIndex: 0,
        //
        scrollTop: 0
    },
    //接口返回数据
    Cates: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /**/
        //获取本地存储数据
        const Cates = wx.getStorageSync("cates");
        if (!Cates) {
            //不存在 发送数据
            this.getCates();
        } else {
            //有旧数据 定义过期事件
            if (Data.now() - Cates.time > 1000 * 10) {
                this.getCates();
            } else {
                this.Cates = Cates.data;
                let leftMenuList = this.Cates.map(v => v.cat_name);

                //
                //构造右侧商品数据
                let rightContent = this.Cates[0].children;

                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }

    },
    //获取分类数据
    async getCates() {


        const res = await request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories' });
        this.Cates = res;
        //把接口的数据存入本地存储
        wx.getStorageSync("cates", { time: Date.now(), data: this.Cates });

        //构造左侧大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);

        //
        //构造右侧商品数据
        let rightContent = this.Cates[0].children;

        this.setData({
            leftMenuList,
            rightContent
        })

    },
    /*左侧菜单的点击事件*/
    handleItemTap(e) {
        /*
        1 获取被点击标题身上的索引
        2. 给data currentIndex赋值
        3.根据不同的索引 来渲染右侧商品
                */
        const { index } = e.currentTarget.dataset;

        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex: index,
            rightContent,
            scrollTop: 0
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})