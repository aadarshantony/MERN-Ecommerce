const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                productId: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
        paymentMethod: {
            type: String,
            required: true,
            enum: ["COD", "Razorpay", "Stripe"],
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        status: {
            type: String,
            enum: [
                "placed",
                "confirmed",
                "dispatched",
                "out-for-delivery",
                "delivered",
                "cancelled",
            ],
            default: "placed",
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);
