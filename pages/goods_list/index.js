// pages/goods_list/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        goodsList: []
    },
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10

    },
    //总页数
    totalPages: 1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid = options.cid;
        this.getGoodsList();


    },
    //获取商品列表数据
    async getGoodsList() {
        const res = await request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search", data: this.QueryParams });
        //获取总条数
        const total = res.total;
        //计算总页数
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize);

        this.setData({
            // goodsList: res.goods
            //拼接数组
            goodsList: [...this.data.goodsList, ...res.goods]
        })
        //关闭下拉刷新窗口
        wx.stopPullDownRefresh();

    },
    handleTabsItemChange(e) {
        const { index } = e.detail;
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({
            tabs
        })

    },

    /**
     * 页面上拉触底事件的处理函数
     */

    onReachBottom() {
        // console.log(this.QueryParams.pagenum);
        //判断是否有下一页数据
        if (this.QueryParams.pagenum >= this.totalPages) {
            // console.log("没有");
            wx.showToast({
                title: '没有下一页数据',

            });
        } else {
            this.QueryParams.pagenum++;
            this.getGoodsList();
            // console.log(this.QueryParams);
        }
    },
    /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
    onPullDownRefresh: function () {
        //重置数组
        this.setData({

            goodsList: []
        })
        //2 重置页码
        this.QueryParams.pagenum = 1;
        //3 发送请求
        this.getGoodsList();
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})