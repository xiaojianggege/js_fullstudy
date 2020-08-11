# 作用域
  [[scope]]: 每个js函数都是一个对象，对象中有些属性我们是可以访问的，但是有些不能，这些仅提供给js引擎提取，[[scope]]就是其一

# [[scope]]
  指的就是 作用域 ，其中存储了运行期上下文的集合

# 作用域链

  [[scope]] 中所存储的执行期上下文对象的集合，这个集合呈现出来的链式链接，我们把这种链式链接称作作用域链

# 闭包
  当内部函数被保存到了外部时，将会产生闭包

# 闭包的缺点 - 内存泄漏
  闭包会导致原有的作用域链不释放， 造成了内存泄漏

# 闭包的作用
  1. 实现共有变量 (企业的模块化开发)
    例如： 累加器  3.js

  2. 做缓存 4.js

  3. 可以实现封装，属性的私有化
  
  4. 模块化开发 防止污染全局变量