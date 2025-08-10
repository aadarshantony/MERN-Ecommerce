const express = require("express");
const router = express.Router();
const {
    submitOrder,
    getAllOrders,
    updateOrderStatus,
    getMyOrders
} = require("../controllers/orderController.js");


const protect = require("../middlewares/protect.js");
const isAdmin = require("../middlewares/isAdmin.js")

router.route("/submit")
    .post(protect, submitOrder);

router.route("/")
    .get(protect, isAdmin, getAllOrders)

router.route("/:orderId")
    .put(protect, isAdmin, updateOrderStatus);

router.route("/my-orders",)
    .get(protect, getMyOrders);

module.exports = router;
