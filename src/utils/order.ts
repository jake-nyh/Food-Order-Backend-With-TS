const digit = 6

 const generateOrderId = (digitCount: number = digit)=>{
    return Math.floor(Math.random() * 10 ** digitCount)
}