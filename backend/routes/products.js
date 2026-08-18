const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      category,
      featured,
      newArrival,
      trending,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
      search
    } = req.query;

    // Build query
    let query = {};

    if (category) {
      query.categoryName = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (newArrival === 'true') {
      query.newArrival = true;
    }

    if (trending === 'true') {
      query.trending = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Build sort
    let sortOption = {};
    switch (sort) {
      case 'price-asc':
        sortOption = { price: 1 };
        break;
      case 'price-desc':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'popular':
        sortOption = { reviews: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(Number(limit))
      .skip(skip)
      .populate('category');

    const total = await Product.countDocuments(query);

    res.json({
      products,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured products
router.get('/featured/list', async (req, res) => {
  try {
    const products = await Product.find({ featured: true })
      .limit(8)
      .populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get new arrivals
router.get('/new-arrivals/list', async (req, res) => {
  try {
    const products = await Product.find({ newArrival: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get related products
router.get('/:slug/related', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    })
      .limit(4)
      .populate('category');

    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;