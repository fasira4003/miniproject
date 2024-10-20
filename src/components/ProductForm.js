import React, { useState } from 'react';
import '../App.css';

const ProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({ id: '', name: '', price: '', image: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.name && product.price && product.image) {
      addProduct({ ...product, id: Date.now() });
      setProduct({ id: '', name: '', price: '', image: null });
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
        <h1>เพิ่มสินค้า</h1>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="input-field"
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="input-file"
      />
      {product.image && <img src={product.image} alt="Product Preview" className="preview-image" />}
      <button type="submit" className="add-btn">Add Product</button>
    </form>
  );
};

export default ProductForm;
