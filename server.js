import express from "express";

const app = express();
const PORT = 3000;

app.get("/greetings/:username", (req, res) => {
  const { username } = req.params;
  res.send(`<h1>Hello there, ${req.params.username}!</h1>`);
});

app.get("/roll/:num", (req, res) => {
  const { num } = req.params;

  if (!isNaN(num)) {
    const maxNumber = parseInt(num, 10);

    const randomNumber = Math.floor(Math.random() * (maxNumber + 1));

    res.send(`<h1>You rolled a ${randomNumber}.</h1>`);
  } else {
    res.send(`<h1>You must specify a number.</h1>`);
  }
});

app.get("/collectibles/:index", (req, res) => {
  const { index } = req.params;
  const i = index;

  const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
  ];

  if (i >= 0 && i < collectibles.length) {
    const item = collectibles[i];
    res.send(
      `<h1>So, you want the ${item.name}? For ${item.price}, it can be yours!</h1>`
    );
  } else {
    res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
  }
});

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {

  const minPrice = req.query.minPrice
  const maxPrice = req.query.maxPrice
  const type = req.query.type

  let filteredShoes = []

  if (minPrice) {
    filteredShoes = shoes.filter(shoe => shoe.price >= minPrice);
  }

  if (maxPrice) {
    filteredShoes = shoes.filter(shoe => shoe.price <= maxPrice)
  }

  if (type) {
    filteredShoes = shoes.filter(shoe => shoe.type === type);
  }

  if (!minPrice && !maxPrice && !type) {
    filteredShoes = shoes
  }

  res.send(filteredShoes);
});

app.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});
