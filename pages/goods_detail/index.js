// pages/goods_detail/index.js
/*
点击轮播图 预览大图
1.给轮播图绑定点击事件
2.调用小程序的api previewImage

*/
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {}

    },
    GoodsInfo: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { goods_id } = options;
        this.getGoodsDetail(goods_id);
    },
    //获取商品详情
    async getGoodsDetail(goods_id) {
        const goodsObj = await request({ url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail", data: { goods_id } })
        // console.log(goodsObj);
        this.GoodsInfo = goodsObj;
        this.setData({
            goodsObj: {
                goods_name: goodsObj.goods_name,
                goods_price: goodsObj.goods_price,
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),

                pics: goodsObj.pics

            }
        })
    },
    handlePreviewImage(e) {
        //构造预览数组
        //map()返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。currentTarget 表示事件绑定的当前组件
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            current,
            urls,

        });
    },
    //加入购物车
    handleCartAdd() {
        //获取缓存中的数据”cart“ 自己起的
        let cart = wx.getStorageSync("cart") || [];
        //当前商品是否已经存在于购物车数组中
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
        if (index === -1) {
            //不存在 第一次添加num 参数（自己起的名字）

            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            cart.push(this.GoodsInfo);
        } else {
            //已经存在与购物车数据 执行num++
            cart[index].num++;
        }

        wx.setStorageSync("cart", cart);
        //弹窗提示
        wx.showToast({
            title: '加入成功',
            icon: 'success',

            mask: true,

        });

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