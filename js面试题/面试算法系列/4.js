function binaryAdd(num1, num2) {
  // TODO
  let arr = []
  let carry = 0
  for(let i = num1.length - 1, j = num2.length - 1; i >= 0 || j >= 0; i--, j--) {
    let a = num1.charAt(i) ? Number(num1.charAt(i)) : 0
    let b = num2.charAt(j) ? Number(num2.charAt(j)) : 0
    let sum = a + b + carry;
    arr.unshift(sum % 2)
    sum >= 2 ? carry = 1 : carry = 0
    arr.unshift()
  }
  if(carry) {
    arr.unshift(carry)
  }
  return arr.join('')
}
//Example

// binaryAdd('1010', '111')

console.log(binaryAdd('1010', '111'));