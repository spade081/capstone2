const mongoose = require("mongoose");
const {Schema} = mongoose;

const orderSchema = new Schema({
	userId: String,
	firstName: String,
	lastName: String,
	totalAmount: Number,
	orders:[
	{
		productId: String,
		name: String,
		description: String,
		price: Number,
		quantity:{type:Number,default:1},
		purchasedOn:{
			type: Date,
			default: new Date()
		}
	}
	]
	});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;



// const mongoose = require('mongoose');
// const {Schema} = mongoose;

// const orderSchema = new Schema ({
// 	total:Number,
// 	totalAmount:Number,
	
// 	purchasedOn:{
// 		type:Date,
// 		default: new Date
// 	},
// 	userId:String,
	

// 	ordered:[
// 		{	
			
// 			productId:String,
// 			quantity:Number

// 		}
// 	]


// })

// const Order = mongoose.model('Order', orderSchema);
// module.exports = Order