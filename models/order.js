const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema ({
	
	totalAmount:Number,
	
	purchasedOn:{
		type:Date,
		default: new Date
	},
	userId:String,
	firstName:String,

	ordered:[
		{	
			name:String,
			productId:String,
			quantity:Number,

		}
	]


})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order