const path = require('path');
const { commerce, random, lorem } = require('faker');
const { NAME } = require(path.resolve(__dirname, 'constants'));

const generateSelected = () => {
  const { productName, price, color } = commerce;
  const { uuid, boolean } = random;
  const { paragraph } = lorem;

  const result = [...Array(50)].map(() => {
    const name = productName();
    const timeStamp = new Date().getTime();
    const id = `${name.replace(/ /g, '')}${uuid()}${timeStamp}`;

    return {
      name,
      id,
      selected: boolean(),
      description: paragraph(),
      price: `$${price()}`,
      color: color(),
    };
  });

  return result;
};

const routes = app => {
  app.get(`/${NAME}/selected`, function(req, res, next) {
    res.json(generateSelected());
  });
};

module.exports = routes;
