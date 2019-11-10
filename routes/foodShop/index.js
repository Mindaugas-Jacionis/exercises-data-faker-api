const path = require('path');
const { NAME } = require(path.resolve(__dirname, 'constants'));
const { generateProducts } = require(path.resolve(__dirname, 'utils'));

const FOUR_HOURS = 4 * 60 * 60 * 1000;
const memoizedProducts = {};

const routes = app => {
  app.get(`/${NAME}/products`, (req, res) => {
    const { timestamp, products } = memoizedProducts || {};
    const shouldGetNewList = !timestamp || (timestamp && Date.now() - timestamp > FOUR_HOURS);
    const updatedProducts = shouldGetNewList ? generateProducts() : products;

    if (shouldGetNewList) {
      memoizedProducts.timestamp = Date.now();
      memoizedProducts.products = updatedProducts;
    }

    res.json(updatedProducts);
  });
};

module.exports = routes;
