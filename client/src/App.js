import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NavBar({ isAdmin, onViewChange }) {
  return (
    <nav style={{ padding:'1rem 2rem', background:' #333', color:'white', marginBottom:'2rem' }}>
      <span style={{ fontSize:'1.5rem', fontWeight:'bold', marginRight:'2rem' }}>MShop</span>
      <button
        onClick={() => onViewChange(false)}
        style={{ marginRight:'1rem', color:'white', background:'none', border:'none', fontSize:'1rem', cursor:'pointer' }}>
        Home
      </button>
      <button
        onClick={() => onViewChange(true)}
        style={{ color:'white', background:'none', border:'none', fontSize:'1rem', cursor:'pointer' }}>
        Admin
      </button>
    </nav>
  )
}

function App() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({ name: '', description: '', price: '' });

  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/products', form);
    setForm({ name: '', description: '', price: '' });
    fetchProducts();
    alert('Product added successfully');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Navbar at the top */}
      <NavBar isAdmin={isAdmin} onViewChange={(val) => setIsAdmin(val)} />

      {/* Main content below */}
      <div style={{ padding:'2rem' }}>
        {isAdmin ? (
          <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
              />
              <br /><br />
              <button type="submit">Add Product</button>
            </form>
          </div>
        ) : (
          <div>
            <h1>Products</h1>
            <ul>
              {products.map((p) => (
                <li key={p.id}>
                   {p.name} - ${p.price}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}

export default App;
