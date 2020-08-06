let data = [//  存储发送的弹幕
  {value: '蜗牛我是你粉丝！！', time: 5, color: 'red', speed: 1, fontSize: 22},
  {value: '牛逼啊 蜗牛！！', time: 10, color: 'blue', speed: 1, fontSize: 22},
  {value: '听妈妈的话吧，晚点再恋爱吧', time: 20, color: 'black', speed: 1, fontSize: 22},
  {value: '咩咩', time: 15, color: 'green', speed: 1, fontSize: 22},
  {value: '弟弟真棒', time: 24, },
  {value: '蜗牛你无敌了', time: 32, color: 'pink', speed: 1, fontSize: 22},
]

// 获取所有需要的dom元素
let canvas = document.getElementById('canvas')
let video = document.getElementById('video')
let $txt = document.getElementById('text')
let $btn = document.getElementById('btn')
let $color = document.getElementById('color')
let $range = document.getElementById('range')

//面向对象编程
// 创建 CanvasBarrage的类
class CanvasBarrage {
  constructor (canvas, video, opts = {}) { // constructor是一种用于创建和初始化的class方法
    // opts = {} 表示如果没有传值，就默认为空，防止报错，es6的语法
    if (!canvas || !video)  return
    
    this.video = video // 将传进来的参数挂载到this上
    this.canvas = canvas

    this.canvas.width = video.width// 设置canvas的宽高和video一致
    this.canvas.height = video.height

    //获取画布，操作画布
    this.ctx = canvas.getContext('2d')

    // 设置默认参数，如果没传就给带上默认样式
    let defOpts = {
      color: '#e91e63',
      speed: 1.5,
      opacity: 0.5,
      fontSize: 20,
      data: []
    }

    // 合并对象，再挂载到this上
    Object.assign(this,defOpts,opts) // assign方法 存在重复属性时后面对象覆盖前面对象
    console.log(this)
    //添加属性，用来判断播放暂停。默认就是true为暂停
    this.isPaused = true

    this.barrages = this.data.map( item => new Barrage(item, this))
    //得到所有的弹幕消息

    //渲染
    this.render()
  }

  // 渲染canvas绘制的弹幕
  render() {
    // 渲染的第一步，清除原来的画布
    this.clear()
    
    // 渲染弹幕 
    this.renderBarrage()

    if(this.isPaused === false) {
      //递归进行渲染
      requestAnimationFrame(this.render.bind(this))
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  
  renderBarrage() {
    // 首先拿到当前视频播放的时间 
    // 要根据该时间和弹幕要展示的时间作对比来判断是否要展示弹幕
    let time = this.video.currentTime // 当前video的播放时间

    //遍历所有的弹幕，每一个barrage都是Barrage的实例
    this.barrages.forEach(barrage => {
      // 用一个flag来处理是否默认渲染，默认是false
      // 并且只有在视频播放时间大于等于当前弹幕的展示时间时才处理它
      if(!barrage.flag && time >= barrage.time) {
        // 判断当前这条弹幕是否被初始化过了
        // 如果isInit是false，那么需要对当前的弹幕进行初始化的操作
        if(!barrage.isInit) {
          barrage.init()
          barrage.isInit = true
        }

        // 弹幕要从右往左渲染，所以x坐标减去当前的弹幕的speed即可
        barrage.x -= barrage.speed
        barrage.render()

        // 如果当前弹幕的x坐标比自身的宽度的负值还要小，就表示出去屏幕了
        if(barrage.x < -barrage.width) {
          barrage.flag = true // 把flag设置成true 下次就不会渲染了

        }
        

      }
    });
  }
  
  add(obj) {
    // 实际上是往barrages里添加一项Barrage实例
    this.barrages.push(new Barrage(obj, this))
  }
}

//创建Barrage类，用来实例化每一条弹幕
class Barrage {
  constructor(obj, ctx) { // obj表示每一条弹幕，
    this.value = obj.value // 弹幕内容
    this.time = obj.time // 弹幕的出现时间

    // 把obj和ctx都挂载到this上方面获取
    this.obj = obj
    this.context = ctx
  }
  // 初始化弹幕
  init() {
    // 如果数据里没有涉及到这四种参数，就直接取默认参数
    this.color = this.obj.color || this.context.color
    this.speed = this.obj.speed || this.context.speed
    this.opacity = this.obj.opacity || this.context.opacity
    this.fontSize = this.obj.fontSize || this.context.fontSize

    // 计算每一条弹幕的宽度
    let p = document.createElement('p')
    p.style.fontSize = this.fontSize + 'px'
    p.innerHTML = this.value
    document.body.appendChild(p)
    
    // 把p标签添加到body里这样就可以拿到宽度
    //设置弹幕的宽度
    this.width = p.clientWidth
    //  得到了弹幕的宽度后就把p标签移除
    document.body.removeChild(p)

    // 设置弹幕出现的位置
    this.x = this.context.canvas.width 
    this.y = this.context.canvas.height * Math.random()

    // 超出范围的出现
    if(this.y < this.fontSize){
      this.y = this.fontSize
    }else if(this.y > this.context.canvas.height - this.fontSize) {
      this.y = this.context.canvas.height - this.fontSize
    }
  }

  // 渲染每一条弹幕
  render() {
    // 设置画布文字的字体和字号
    this.context.ctx.font =  `${this.fontSize}px Arial`
    // 设置画布的文字颜色
    this.context.ctx.fillStyle = this.color
    //绘制文字
    this.context.ctx.fillText(this.value, this.x, this.y)
  }
}


// 创建CanvasBarrage的实例
let canvasBarrage = new CanvasBarrage(canvas, video, {data})
video.addEventListener('play',() => {
  canvasBarrage.isPaused = false
  canvasBarrage.render()
})

// 发送弹幕的方法
function send() {
  let value = $txt.value //输入的内容
  let time = video.currentTime // 当前视频时间
  let color = $color.value
  let fontSize = $range.value
  let obj = {
     value,
    time,
    color,
    fontSize
  }
  
  // 添加弹幕数据
  canvasBarrage.add(obj)
  $txt.value =""
}
$btn.addEventListener('click', send)

// document.onkeydown = function(ev){
//   let event = ev
//   if(event.keyCode == 13){
//     send()
//     alert('666')
//   }
// }

$txt.addEventListener('keyup', event => {
  if(event.keyCode == 13) {
    send()
  }
})