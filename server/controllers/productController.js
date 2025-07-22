const Product = require("../models/productSchema");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error', error: err.message });
    }

}

const addProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = new Product(product);
        await newProduct.save();

        res.status(201).json({ message: 'newProduct saved', product: newProduct })
    } catch (err) {
        console.error('Error saving the product', err)
        res.status(500).json({ message: 'Server error', error: err.message });
    }

}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const updatedFields = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updatedFields },
            { new: true, runValidators: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (err) {
        console.error('Error updating product', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            product: deletedProduct
        });
    } catch (err) {
        console.error('Error deleting product', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

const getIndividualProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId)
            return res.status(400).json({ message: 'Product ID is required' });

        const product = await Product.findById(productId);

        if (!product)
            return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({
            message: 'Product found with the specified ID',
            product: product
        });
    } catch (err) {
        console.error('Error fetching a single product', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}



module.exports = {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getIndividualProduct,
}