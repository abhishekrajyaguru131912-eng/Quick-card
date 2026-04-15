const router = require('express').Router();
const Order = require('../models/Order');
const { verifyToken, isAdmin } = require('../middleware/auth');

// ✅ PLACE ORDER - POST /api/orders
router.post('/', verifyToken, async (req, res) => {
    try {
        const { items, total } = req.body;

        // check if items exist
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in order' });
        }

        const order = await Order.create({
            user: req.user.id,
            items,
            total
        });

        res.status(201).json(order);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ GET MY ORDERS - GET /api/orders/my
router.get('/my', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ GET ALL ORDERS - GET /api/orders/all (admin only)
router.get('/all', verifyToken, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product', 'name price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ UPDATE ORDER STATUS - PUT /api/orders/:id (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;