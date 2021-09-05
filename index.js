const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes = require('./routes/cartRoutes')
require('dotenv').config()
const cors = require('cors')//this allows your site to connect to to server

const app = express();
const port = process.env.PORT;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.DB_CONNECTION,
{
	useNewUrlParser:true, 
	useUnifiedTopology:true,
	useFindAndModify:false
})

let db = mongoose.connection;
db.on('err', console.error.bind(console, "connection Error!"));
db.once('open', ()=> console.log("We are connected to our Cloud Database"))

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/carts', cartRoutes )

app.listen(port, ()=> console.log(`Server is listening to the port ${port}`))



