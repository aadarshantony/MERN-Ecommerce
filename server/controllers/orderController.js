const Order = require("../models/OrderSchema.js");
const Cart = require("../models/cartSchema.js");

exports.submitOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        const orderedItems = cart.items.map(item => ({
            productId: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
        }));

        const totalPrice = orderedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const newOrder = new Order({
            user: userId,
            items: orderedItems,
            paymentMethod: "COD",
            paymentStatus: "pending",
            status: "placed",
            totalPrice
        });

        await newOrder.save();

        await Cart.findOneAndUpdate({ user: userId }, { items: [] });

        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (err) {
        console.error("Order creation error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.status(200).json({ orders });
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder
        });
    } catch (err) {
        console.error("Error updating order status:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        console.log("Logged-in user from token:", req.user);
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            orders
        });
    } catch (err) {
        console.error("Error fetching user's orders:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};
