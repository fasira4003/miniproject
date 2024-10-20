import React, { useState } from 'react';
import '../App.css';

const ProductList = ({ products, updateProduct, deleteProduct }) => {
  const [editableProductId, setEditableProductId] = useState(null);
  const [editableProduct, setEditableProduct] = useState({ name: '', price: '', image: '' });

  const handleEditClick = (product) => {
    setEditableProductId(product.id);
    setEditableProduct({ name: product.name, price: product.price, image: product.image });
  };

  const handleUpdateClick = (id) => {
    updateProduct(id, { ...editableProduct, id });
    setEditableProductId(null);
  };

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-item">
          {editableProductId === product.id ? (
            <>
              <input
                type="text"
                value={editableProduct.name}
                onChange={(e) => setEditableProduct({ ...editableProduct, name: e.target.value })}
                className="input-field"
              />
              <input
                type="number"
                value={editableProduct.price}
                onChange={(e) => setEditableProduct({ ...editableProduct, price: e.target.value })}
                className="input-field"
              />
              <button onClick={() => handleUpdateClick(product.id)} className="update-btn">Update</button>
            </>
          ) : (
            <>
              <img src={product.image} alt={product.name} className="product-image" />
              <span>{product.name} - ${product.price}</span>
              <button onClick={() => handleEditClick(product)} className="edit-btn">Edit</button>
              <button onClick={() => deleteProduct(product.id)} className="delete-btn">Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
