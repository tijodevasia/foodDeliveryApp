import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';

//placing user order for frontend

const placeOrder = async(req,res)=>{
    try {
        const newOrder =new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items =req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
    }))
      line_items.push({
        price_data:{
            currency:"inr",
            product_data:{
                name:"Delivaery Charges"
            },
            unit_amount:2*100*80
        },
        quantity:1
      })
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}
//user ordera for frontend
const userOrders =async(req,res)=>{
    try {
        const orders =await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export{placeOrder,userOrders}