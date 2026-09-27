import express from "express";
import fs from "fs";
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ parse: true }));

const FILE = "./data/products.json";
const readProducts = () => {
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
};

const writeProducts = (products) => {
  fs.writeFileSync(FILE, JSON.stringify(products, null, 2), "utf-8");
};

app.get("/", (req, res) => {
  res.send("Products sever running");
});
//Create
app.post("/products", (req, res) => {
  const newProduct = req.body;
  const products = readProducts();
  products.push(newProduct);
  writeProducts(products);
  res
    .status(201)
    .json({ message: "Product added successfully", data: newProduct });
});
//Read
app.get("/products", (req, res) => {
  const products = readProducts();
  res
    .status(200)
    .json({ message: "All Products feteched successfully", data: products });
});
//Read by ID
app.get("/products/:id", (req, res) => {
  const products = readProducts();
  const product = products.find((prod) => prod.id === Number(req.params.id));
  if (product) {
    res.status(200).json({
      message: "Products details feteched successfully",
      data: product,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
//Update a product
app.put("/products/:id", (req, res) => {
  const products = readProducts();
  const index = products.findIndex((prod) => prod.id === Number(req.params.id));
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    writeProducts(products);
    res.status(200).json({
      message: "Products updated successfully",
      data: products[index],
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
//Delete
app.delete("/products/:id", (req, res) => {
  const products = readProducts();
  const index = products.findIndex((prod) => prod.id === Number(req.params.id));
  if (index !== -1) {
    const product = products.splice(index, 1)[0];
    writeProducts(products);
    res.status(200).json({
      message: "Products deleted successfully",
      data: product,
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
//404 Not found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
