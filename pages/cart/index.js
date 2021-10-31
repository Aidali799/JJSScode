// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false
    },
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {
        const address = wx.getStorageSync("address");
        // console.log(address);获得购物车数据
        const cart = wx.getStorageSync("cart") || [];
        this.setData({
            address
        });
        this.setCart(cart);

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    handleChooseAddress() {
        wx.getSetting({
            success: (result) => {
                //获取权限状态
                const scopeAddress = result.authSetting["scope.address"];
                if (scopeAddress === true || scopeAddress === undefined) {
                    wx.chooseAddress({
                        success: (result) => {
                            // console.log(result);
                            wx.setStorageSync("address", result);

                        },

                    });
                } else {
                    //用户拒绝过权限，诱导用户打开授权页面
                    wx.openSetting({
                        success: (result2) => {

                            wx.chooseAddress({
                                success: (result3) => {
                                    console.log(result3);
                                },

                            });
                        },

                    });
                }
            },

        });

    },
    //商品的选中
    handleItemChange(e) {
        //获取被修改的商品的id
        const goods_id = e.currentTarget.dataset.id;
        //2.获取购物车数组
        let { cart } = this.data;

        //3.获取被修改的商品对象
        let index = cart.findIndex(v => v.goods_id === goods_id);
        //选中状态取反
        cart[index].checked = !cart[index].checked;
        this.setCart(cart);

    },
    //设置购物车状态
    setCart(cart) {


        let allChecked = true;
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price;
                totalNum += v.num;
            } else {
                allChecked = false;
            }

        })
        allChecked = cart.length != 0 ? allChecked : false;
        this.setData({
            cart,
            totalPrice,
            totalNum,
            allChecked
        });
        wx.setStorageSync("cart", cart);
    },
    //商品全选
    handleItemAllCheck() {
        let { cart, allChecked } = this.data;

        allChecked = !allChecked;

        cart.forEach(v => v.checked = allChecked);

        this.setCart(cart);
    },
    //商品数量编译
    handleItemEdit(e) {
        /*
          1.获取传递过来的参数
          2.获取购物车数组
          3.找到需要修改的商品索引
          4.进行修改数量
          5.设置回缓存
        
        */
        const { operation, id } = e.currentTarget.dataset;

        let { cart } = this.data;
        const index = cart.findIndex(v => v.goods_id === id);
        //判断是否删除
        if (cart[index].num === 1 && operation == -1) {
            wx.showModal({
                title: '提示',
                content: '是否删除',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
                success: (result) => {
                    if (result.confirm) {
                        cart.splice(index, 1);
                        this.setCart(cart);
                    } else if (result.cancel) {
                        console.log("用户点击取消");
                    }
                },

            });
        } else {
            cart[index].num += operation;
            this.setCart(cart);
        }

    },
    //点击结算
    handlePay() {
        const { address, totalNum } = this.data;
        if (!address.userName) {
            wx.showToast({
                title: '您还没选择收货地址',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {

                },

            });
            return;
        }
        if (totalNum === 0) {
            wx.showToast({
                title: '您还没选择商品',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {

                },

            });
            return;
        }
        //跳转支付页面
        wx.navigateTo({
            url: '/pages/pay/index',

        });

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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