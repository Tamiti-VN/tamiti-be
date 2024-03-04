import { Category } from '../../models/category.js';
import { Product } from '../../models/product.js';
import { deleteImage } from '../../utils/cloudinary.js';
import { v2 as cloudinary } from 'cloudinary';
export const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find().populate('category', 'categoryName');
    if (!Products.length > 0) return res.json({ message: 'There is no product!!' });
    return res.status(200).json({ data: Products });
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};

export const getAllProductsWithPage = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = 5;
    let skip = (page - 1) * limit;

    // Fetch total number of products in the database
    let totalProducts = await Product.countDocuments();

    const Products = await Product.find()
      .populate('category', 'categoryName')
      .skip(skip)
      .limit(limit);

    // Calculate total pages based on total products and limit
    let totalPage = Math.ceil(totalProducts / limit);

    if (!Products.length > 0) return res.json({ message: 'There is no product!!' });

    return res.status(200).json({ page: page, limit: limit, totalPage: totalPage, data: Products });
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};

export const getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const Products = await Product.findById(id);
    if (!Products) return res.json({ message: 'Product is not existed!!' });
    return res.status(200).json(Products);
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};

export const createProduct = async (req, res) => {
  const { productName, description, price, quantity, categoryId } = req.body;
  const img = req.file.path;
  try {
    const category = await Category.findById(categoryId);
    const uploadImage = await cloudinary.uploader.upload(img, { folder: 'products' });
    console.log('upload img>>>>>>', uploadImage);
    if (uploadImage) {
      const newProduct = await Product.create({
        productName: productName,
        description: description,
        img: uploadImage.public_id,
        price: price,
        quantity: quantity,
        category: category,
      });
      return res.status(200).json(newProduct);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { productName, description, price, quantity, categoryId } = req.body;
    const { id } = req.params;
    const img = req.file;

    const category = await Category.findById(categoryId);

    const updatedProduct = {
      productName: productName,
      description: description,
      img: img,
      price: price,
      quantity: quantity,
      category: category,
    };
    if (img) {
      await Product.findById(id).then((data) => deleteImage(data.img));
      updatedProduct.img = img.filename;
    }
    const result = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id)
      .then((data) => deleteImage(data.img))
      .catch((error) => {
        console.log(error);
        res.status(500).json(err);
      });
    if (!product) return res.json({ message: 'Product is not existed!!' });
    return res.status(200).json({ message: 'Delete Success', data: product });
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};
