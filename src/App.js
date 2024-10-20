import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // ควบคุมการแสดง modal

  // โหลดข้อมูลจาก LocalStorage เมื่อหน้าเว็บโหลดขึ้น
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // บันทึกข้อมูลลง LocalStorage เมื่อ state ของ products เปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    setIsModalOpen(false); // ปิด modal เมื่อเพิ่มสินค้าแล้ว
  };

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const deleteProduct = (id) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts(filteredProducts);
  };

  return (
    <div className="App">
      <h1>Clothing Store</h1>

      {/* ปุ่ม Add Product */}
      <button onClick={() => setIsModalOpen(true)} className="add-btn">Add Product</button>

      {/* Modal สำหรับการเพิ่มสินค้า */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <ProductForm addProduct={addProduct} />
          </div>
        </div>
      )}

      <ProductList
        products={products}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  );
};

export default App;
