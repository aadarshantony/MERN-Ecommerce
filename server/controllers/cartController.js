const Product = require('../models/productSchema');
const Cart = require("../models/cartSchema");

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId)
            return res.status(500).json({ message: 'Please login to view cart' });
        
        const userCart = await Cart.findOne({ user: userId })
            .populate('items.product');
        res.status(201).json({ message: "Fetched Cart", cart: userCart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        let cart = await Cart.findOne({ user: userId }).exec();

        if (!cart) {
            cart = new Cart({ user: userId, items: [{ product: productId, quantity: 1 }] });
            await cart.save();
        } else {

            const existingItem = cart.items.find(item => item.product.toString() === productId);

            if (existingItem) {
                return res.status(409).json({ message: 'Product already in cart' });
            }

            cart.items.push({ product: productId, quantity: 1 });
            await cart.save();
        }

        const populatedCart = await cart.populate('items.product');
        populatedCart.items.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());

        res.status(201).json({ message: "Product added to cart", cart: populatedCart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { qty } = req.body;
        const { productId } = req.params

        if (!productId || qty == null) {
            return res.status(400).json({ message: 'Product ID and quantity are required' });
        }

        if (qty < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (qty > product.stock) {
            return res.status(400).json({ message: `Only ${product.stock} items in stock` });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [{ product: productId, quantity: qty }] });
        } else {
            const existingItem = cart.items.find(item => item.product.toString() === productId);
            if (existingItem) {
                existingItem.quantity = qty;
            } else {
                cart.items.push({ product: productId, quantity: qty });
            }
        }

        await cart.save();

        const populatedCart = await cart.populate('items.product');
        populatedCart.items.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());

        res.status(200).json({ message: 'Cart updated successfully', cart: populatedCart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

exports.deleteFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const initialLength = cart.items.length;

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        if (cart.items.length === initialLength) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        await cart.save();

        const populatedCart = await cart.populate('items.product');
        populatedCart.items.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp());

        res.status(200).json({ message: 'Product removed from cart', cart: populatedCart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
