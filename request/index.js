let ajaxTimes = 0;
export const request = (params) => {
    ajaxTimes++;
    //显示加载中
    wx.showLoading({
        title: '加载中',
        mask: true
    });

    return new Promise((resolve, reject) => {
        wx.request({
            // url: '',
            // data: {},
            // header: {'content-type':'application/json'},
            // method: 'GET',
            // dataType: 'json',
            // responseType: 'text',
            ...params,

            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                wx.hideLoading();
            }
        });

    })
}