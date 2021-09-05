const Cart = require("../models/cartModel");
const Product = require("../models/product");
const User = require("../models/user");

exports.addToCart = (req, res) => {
  let userId = req.decodedUser.id;
    let productId = req.params.prodId;
  Product.findOne({ _id: productId }, function (err, result) {
    if (err) {
      res.send({ error: err });
    } else {
      Cart.findOne({ userId: userId }, (err, foundCart) => {
        if (err) {
          res.send({ error: err });
        } else if (foundCart) {
          let foundProductInfo = foundCart.productInfo.find(
            (o) => o.productId === productId
          );
          if (foundProductInfo) {
            
            foundProductInfo.productQty += req.body.productQty;
            foundCart.totalAmount +=
              foundProductInfo.productPrice * req.body.productQty;

            foundCart.save((err, save) => {
              if (err) {
                res.send({ error: err });
              } else {
                res.send(save);
              }
            });
          } else {
            let newProductInfo = {
              productId: productId,
              productName: result.name,
              productPrice: result.price,
              productQty: req.body.productQty,
              productDescription: result.description,
            };
            foundCart.productInfo.push(newProductInfo);
            foundCart.totalAmount += result.price * req.body.productQty;
            foundCart.save((err, save) =>
              err ? res.send({ error: err }) : res.send(save)
            );
          }
        } else {
          let newCart = new Cart({
            totalAmount: result.price * req.body.productQty,
          
            userId: userId,
            productInfo: [
              {
                productId: productId,
                productName: result.name,
                productPrice: result.price,
                productDescription: result.description,
                productQty: req.body.productQty,
              },
            ],
          });
          newCart.save((err, save) => {
            if (err) {
              res.send({ error: err });
            } else {
              res.send(save);
            }
          });
        }
      });
    }
  });
};

exports.getCart = (req, res) => {
  let id = req.decodedUser.id;

  Cart.find({ userId: id }, (err, foundCart) => {
    if (err) {
      console.log(err);
    } else {
      if (foundCart.length > 0) {
        let carts = foundCart.map((cart) => {
          return cart.productInfo;
        });
        let merged = [].concat.apply([], carts);
        res.send(merged);
      } else {
        res.send({ error: `You don't have any cart` });
      }
    }
  });
};

exports.getUserCart = (req,res)=>{
  let userId = req.decodedUser.id
  Cart.findOne({userId: userId}, (err,foundCart) => res.send(foundCart))
}

exports.getAllCarts = (req,res) => {
  Cart.find({}, (err,foundCarts) => res.send(foundCarts))
}


exports.deleteCart = (req,res)=> {
	Cart.deleteMany({}, (err, foundCarts) => res.send(true)   )
}

exports.deleteUserCart = (req,res)=> {
let userId = req.decodedUser.id
let productId = req.params.productId
// let productId = req.body.productId
  Cart.findOne({userId: userId}, (err,foundCart) => {
    if(err){
      res.send({error: err.message})
    }else {
      
      let index = foundCart.productInfo.findIndex(obj => obj.productId === productId)
      if(index !== -1){
        foundCart.productInfo.splice(index, 1)
        foundCart.save((err,success) => (err) ? res.send({error: err.message}) : res.send(foundCart.productInfo))
      }else res.send({notInCart: true})
    }
  })
}