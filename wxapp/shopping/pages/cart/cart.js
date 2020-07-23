// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    totalPrice: 0,
    selectAllStatus: true
    
  },
  selectAll(){
    // 来回改变数据源中的selectAllStatus
    let selectAllStatus = this.data.selectAllStatus
    selectAllStatus = !selectAllStatus
    let carts = this.data.carts
    if(carts.length==0){
      this.setData({
        selectAllStatus: false
      })
      return 0
    }
    // 把carts数据里面的每一条数据里面的select改成false
    for(var i = 0; i < carts.length; i++){
      carts[i].selected = selectAllStatus
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    })
    
    this.getTotalPrice()
  },
  selectList(e){
    console.log(e)
    // 让当前这条数据里面的selected的值取反
    let index = e.currentTarget.dataset.index
    let selected = `carts[${index}].selected`
    this.setData({
      [selected]: !this.data.carts[index].selected
    })
    this.getTotalPrice()
    // 但凡carts数组中存在一条数据里面的select不为true 全选按钮就不能被勾选
    let carts = this.data.carts
    for (let i = 0; i < carts.length; i++){
      if(!carts[i].selected){
        this.setData({
          selectAllStatus: false
        })
      break
      }
      else{
        this.setData({
          selectAllStatus: true
        })
      }
    }
  },
  getTotalPrice(){
    //拿到carts数组中的每一条selected为true的数据，用数量*单价
    let totalPrice = 0
    let carts = this.data.carts
    for(let i = 0; i < carts.length; i++){
      if(carts[i].selected){
        totalPrice += carts[i].num*carts[i].price
      }
    }
    this.setData({
      totalPrice: totalPrice.toFixed(2)
    })
  },
  downNum(e){
    let index = e.currentTarget.dataset.index
    let carts = this.data.carts
    let num =  `carts[${index}].num`
    if(carts[index].num > 1){
      carts[index].num = carts[index].num-1
    }
    this.setData({
      [num]: carts[index].num
    }) 
    this.getTotalPrice()
  },
  upNum(e){
    let index = e.currentTarget.dataset.index
    let carts = this.data.carts
    let num =  `carts[${index}].num`
    this.setData({
      [num]: carts[index].num+1
    })
    this.getTotalPrice()

  },
  deleteGoods(e){
    let index = e.currentTarget.dataset.index
    let carts = this.data.carts
    carts.splice(index,1)
    this.setData({
      carts: carts
    })
    if(carts.length==0){
      this.setData({
        selectAllStatus: false
      })
    }
    this.getTotalPrice()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow"),
    setTimeout(()=>{
      this.setData({
        carts:[
          { id: 1, title: '新鲜芹菜 半斤', image: '/image/s5.png', num: 4, price: 0.01, selected: true },
          { id: 2, title: '素米 500g', image: '/image/s6.png', num: 1, price: 0.03, selected: true }
        ]
      }),
      this.getTotalPrice()
    },1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   console.log("onUnload")
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