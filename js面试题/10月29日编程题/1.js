// 数组扁平化
let a = [1, 2, 3, [4, [5, [6]]]]
function flat1(arr,deep) {
    let res = []
    function walk(myarr, num) {
        for (let i = 0; i < myarr.length; i++) {
            if (Array.isArray(myarr[i]) && num < deep) {
                walk(myarr[i], num + 1)
            } else {
                res.push(myarr[i])
            }
        }
    }
    walk(arr, 0)
    return res
}
console.log(flat1(a,2));