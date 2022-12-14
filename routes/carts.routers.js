const express = require('express');

// Controllers
const {
  addProductToCart,
  updateCart,
  deleteProdInCart,
  purchaseCart,
  getActiveCart,
} = require('../controllers/carts.controller');

// Middlewares
const {
  findProductInCart,
  validateProdInCart,
} = require('../middlewares/find.middlewares');

const { protectSession } = require('../middlewares/auth.middlewares');

const {
  addProdInCartValidators,
  updateCartValidators,
  checkValidations,
} = require('../middlewares/validators.middlewares');

const cartsRouter = express.Router();

// Protecting below endpoints
cartsRouter.use(protectSession);

cartsRouter.get('/', getActiveCart);

cartsRouter.post(
  '/add-product',
  addProdInCartValidators,
  checkValidations,
  validateProdInCart,
  addProductToCart
);

cartsRouter.patch(
  '/update-cart',
  updateCartValidators,
  checkValidations,
  findProductInCart,
  validateProdInCart,
  updateCart
);

cartsRouter.delete('/:productId', deleteProdInCart);

cartsRouter.post('/purchase', purchaseCart);

module.exports = { cartsRouter };
