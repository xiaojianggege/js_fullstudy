// function mul(n) {
//   // n 的 阶乘
//   if(n <= 1){
//     return 1
//   }
//   return n * mul(n - 1)
// }
// console.log(mul(5))

function fb(n) {
  if (n==1 || n==2) {
    return 1
  }
  return fb(n - 1) + fb(n - 2)
}
console.log(fb(5))