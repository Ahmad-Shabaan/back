const adsPhotos = [
  "https://res.cloudinary.com/duc04fwdb/image/upload/v1688675134/Jammal/Cover/circle-discount-sale-podium_35913-2513_jwxkbm.avif",
  "https://res.cloudinary.com/duc04fwdb/image/upload/v1688675134/Jammal/Cover/circle-discount-sale-podium_35913-2513_jwxkbm.avif",
  "https://res.cloudinary.com/duc04fwdb/image/upload/v1688675134/Jammal/Cover/circle-discount-sale-podium_35913-2513_jwxkbm.avif",

  "https://res.cloudinary.com/duc04fwdb/image/upload/v1688675134/Jammal/Cover/circle-discount-sale-podium_35913-2513_jwxkbm.avif",
];

module.exports = adsPhotos;


/**
 * 
 * 
 * 
 * // Route for updating a product by ID (PUT)
app.put("/products/:catId/:id", (req, res) => {
  // Get the ID from the request parameters
  const catId = parseInt(req.params.catId);
  const id = parseInt(req.params.id);

  // Find the index of the product with the matching ID in the array
  const catIndex = products.findIndex((cat) => cat.id === catId);

  const index = products[catIndex].products.findIndex((p) => p.id === id);

  // Return a 404 error if the product doesn't exist
  if (index === -1) {
    return res.status(404).send("Product not found");
  }

  // Update the product with the new data from the request body
  console.log(req.body)
  const updatedProduct = { ...products[catIndex].products[index], ...req.body };
  
    // Convert the array back into a string
    const updatedProductsContents = 'module.exports = ' + JSON.stringify(products, null, 2) + ';';
    // console.log(updatedProductsContents);

    // Write the updated contents back to the file
    fs.writeFileSync(productsFilePath, updatedProductsContents);

  // Return the updated product
  const message = "تم التعديل";
  res.json({message});
});
 */