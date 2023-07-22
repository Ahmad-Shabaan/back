const express = require("express");
const cors = require("cors");
// const products = require("./routes/products");
const { adsPhotos } = require("./routes/ads");
const session = require("express-session");
const crypto = require("crypto");
const fs = require('fs');
const path = require('path');

const router = express.Router();

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 8000;


// Read the current contents of products.js
const productsFilePath = path.join(__dirname, './routes/products.js');
const productsContents = fs.readFileSync(productsFilePath, 'utf-8');

// Convert the contents into a JavaScript object
const products = eval(productsContents);

// Add the new product to the array
// products.push({ name: 'Grape', price: 4 });

// Convert the array back into a string
// const updatedProductsContents = 'module.exports = ' + JSON.stringify(products, null, 2) + ';';

// Write the updated contents back to the file
// fs.writeFileSync(productsFilePath, updatedProductsContents);




const myMiddlewareFunc = function (req, res, next) {
  // Do something here
  next(); // Call next() to move on to the next middleware function or route handler
};
router.get("/products", myMiddlewareFunc, function (req, res) {
  res.json(products);
});

router.get("/ads", myMiddlewareFunc, function (req, res) {
  res.json(adsPhotos);
});
// Use your middleware function for all routes
app.use("/", router);
app.use(express.json());
app.get("/", (req, res) => {
  const message = 'مرحبا مستر جمال'
  res.json({message});
});
const secret = crypto.randomBytes(32).toString("hex");
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none", // Add this to allow cross-site usage
      secure: true, // Add this to only allow cookies to be sent over https
      maxAge: 3600000, // Optional, set the cookie age in milliseconds
    },
  })
);

//   app.get("/products", (req, res) => {
//   const data = products;
//   res.json(data);
// });
// const lenProd = products[1].products.length-1;
// console.log(products[2].products)
// products[2].products.push({ id: 201, name:"ahmed"});
// console.log(products[2].products[1])
// console.log(products[1].products[lenProd].id);
// products

app.post("/products/:categoryId", (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  // Get the data from the request body
  const newProduct = req.body;
  // Generate a new ID for the product
  const lenProd = products[categoryId - 100001].products.length-1;
  const oldId = products[categoryId - 100001].products[lenProd].id;
  const newId = oldId +1;

  // Add the new product to the array
  products[categoryId - 100001].products.push({ id: newId, ...newProduct });

  // Convert the array back into a string
const updatedProductsContents = 'module.exports = ' + JSON.stringify(products, null, 2) + ';';

// Write the updated contents back to the file
fs.writeFileSync(productsFilePath, updatedProductsContents);

  // console.log(products[categoryId - 100001].products.find(newId))

  // Return the new product with the generated ID
  const message = 'تم اضافة المنتج بنجاح';
  res.status(201).json({ message });
  // res.send("تم اضافة المنتج بنجاح");
});

// Route for updating a product by ID (PUT)
app.put("/products/:id", (req, res) => {
  // Get the ID from the request parameters
  const id = parseInt(req.params.id);

  // Find the index of the product with the matching ID in the array
  const index = products.findIndex((p) => p.id === id);

  // Return a 404 error if the product doesn't exist
  if (index === -1) {
    return res.status(404).send("Product not found");
  }

  // Update the product with the new data from the request body
  const updatedProduct = { ...products[index], ...req.body };
  products[index] = updatedProduct;

  // Return the updated product
  res.json(updatedProduct);
});

// Route for deleting a product by ID (DELETE)
app.delete("/products/:catId/:id", (req, res) => {
  // Get the ID from the request parameters
  const catId = parseInt(req.params.catId);
  const id = parseInt(req.params.id);
console.log(catId);
console.log(id);

  // Find the index of the product with the matching ID in the array
  const catIndex = products.findIndex((cat) => cat.id === catId);

  const index = products[catIndex].products.findIndex((p) => p.id === id);
  console.log(products[catIndex])
  console.log(catIndex)
  console.log(index);

  // Return a 404 error if the product doesn't exist
  if (index === -1) {
    return res.status(404).send("Product not found");
  }

  // Remove the product from the array
  const deletedProduct = products[catIndex].products.splice(index, 1);
  // Convert the array back into a string
  const updatedProductsContents = 'module.exports = ' + JSON.stringify(products, null, 2) + ';';

  // Write the updated contents back to the file
  fs.writeFileSync(productsFilePath, updatedProductsContents);

  // Return the deleted product
  const message = 'تم جذف المنتج';
  res.json({message});
});

// Start the server on port 8000

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
