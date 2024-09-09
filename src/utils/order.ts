const digit = 6

export const generateOrderId = (digitCount: number = digit)=>{
    return Math.floor(Math.random() * 10 ** digitCount)
}