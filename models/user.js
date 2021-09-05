const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	firstName:String,
	lastName:String,
	email:String,
	password:String,
	isAdmin:{
		type:Boolean,
		default:false
	},
		purchasing:[
			{
				
				productId: String,
				orderedOn:{
				type:Date,
				default:new Date()
			},
				status:{
				type:String,
				default:"Ordered"
		}
			}
	]
})

const User = mongoose.model('User', userSchema)
module.exports = User;