// async function req() {
//     
//     let y= await x.json()
//     console.log(y)
    
// }
// req()
let neww=new Promise((resolve, reject) => {
    resolve("hello")
})
neww.then((e)=>{
    if (e=="hello"){
        throw new Error("this is an error");

        
    }
}).catch((error)=>{
console.log(error.message)
})