const Product = require("../models/productSchema");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error', error: err.message });
    }

}

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, size, stock, thumbnail, gallery } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category,
            subCategory,
            size,
            thumbnail,
            gallery,
        });

        await newProduct.save();

        res.status(201).json({ message: 'newProduct saved', product: newProduct });
    } catch (err) {
        console.error('Error saving the product', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.updateProduct = async (req, res) => {
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


exports.deleteProduct = async (req, res) => {
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

exports.getIndividualProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({message: "Product found for the corresponding id", product: product});
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

exports.getFilteredProducts = async (req, res) => {
    try {
        const filters = {};

        // Category filter (array)
        if (req.query.category) {
            const categories = req.query.category.split(",");
            filters.category = { $in: categories };
        }

        // Subcategory filter (array)
        if (req.query.subCategory) {
            const subCategories = req.query.subCategory.split(",");
            filters.subCategory = { $in: subCategories };
        }

        // Size filter (array)
        if (req.query.size) {
            const sizes = req.query.size.split(",");
            filters.size = { $in: sizes };
        }

        // Price range filter
        if (req.query.priceMin || req.query.priceMax) {
            filters.price = {};
            if (req.query.priceMin) filters.price.$gte = Number(req.query.priceMin);
            if (req.query.priceMax) filters.price.$lte = Number(req.query.priceMax);
        }

        // Query DB with filters
        const products = await Product.find(filters);

        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
 