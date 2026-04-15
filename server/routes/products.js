const router = require('express').Router();
const Product = require('../models/Product');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// ✅ GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Invalid product ID" });
  }
});

// ✅ CREATE PRODUCT WITH IMAGE (ADMIN ONLY)
router.post('/', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description, countInStock } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, category required' });
    }

    const product = await Product.create({
      name,
      price,
      category,
      description: description || "",
      image: req.file ? req.file.filename : "", // ✅ image save
      countInStock: countInStock || 0
    });

    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE PRODUCT (ADMIN ONLY)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// ✅ DELETE PRODUCT (ADMIN ONLY)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.json({ message: 'Product deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;