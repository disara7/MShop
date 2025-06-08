import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/products', form);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Simple E-Commerce</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Price" type="number" onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} />
        <button type="submit">Add Product</button>
      </form>
      <hr />
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
