const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentOrder = async(req,res)=>{
    try{
      let instance = new Razorpay({ key_id: process.env.VITE_RAZORPAY_API_KEY_ID, key_secret: process.env.VITE_RAZORPAY_API_KEY_SECRET })
      const {fees} = req.body;
      const order = await instance.orders.create({
      amount: fees, //Mandatory
      currency: "INR", //Mandatory
      receipt: "Booking Doctor", //Optional
      })
      console.log(order)
      if (!order) {
        return res.status(500).send("Error");
      }
  
      res.json(order);
    }
    catch(error)
    {
      console.log(error)
      res.status(500).json({error:error})
    }
  }

const paymentValidate =  async (req, res) => {
    // Check if a user with the provided email already exists
    console.log("Validation API")
    const {email, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const sha = crypto.createHmac("sha256", process.env.VITE_RAZORPAY_API_KEY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Invalid Transaction" });
    }
    
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      email:email
    });
}
module.exports = {paymentOrder,paymentValidate};