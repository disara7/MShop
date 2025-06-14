import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NavBar({ isAdmin, onViewChange }) {
  return (
    <nav style={{ 
      padding:'1rem 2rem', 
      background:'#111', 
      color:'white', 
      marginBottom:'2rem',
      display:'flex',
      alignItems:'center',
      boxShadow:'0 4px 10px -5px black'
    }}>
      <span style={{ 
        fontSize:'1.5rem', 
        fontWeight:'bold', 
        marginRight:'2rem'
      }}>MShop</span>
      <button
        onClick={() => onViewChange(false)}
        style={{ 
          marginRight:'1rem', 
          color:'white', 
          background:'none', 
          border:'none', 
          fontSize:'1rem', 
          cursor:'pointer',
          padding:'0.5rem 1rem',
          transition:'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseOut={(e) => e.target.style.background = 'none'}
      >
        Home
      </button>
      <button
        onClick={() => onViewChange(true)}
        style={{ 
          color:'white', 
          background:'none', 
          border:'none', 
          fontSize:'1rem', 
          cursor:'pointer',
          padding:'0.5rem 1rem',
          transition:'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
        onMouseOut={(e) => e.target.style.background = 'none'}
      >
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
    <div style={{ fontFamily:'Helvetica, Arial, sans-serif', color:'#333', background:'#f5f5f5', minHeight:'100vh' }}>
      {/* Navbar at the top */}
      <NavBar isAdmin={isAdmin} onViewChange={(val) => setIsAdmin(val)} />

      {/* Main content below */}
      <div style={{ padding:'2rem' }}>
        {isAdmin ? (
          <div style={{ 
            background:'white', 
            padding:'2rem', 
            borderRadius:'10px', 
            boxShadow:'0 4px 10px -5px black',
            maxWidth:'400px',
            margin:'0 auto'
          }}>
            <h1 style={{ marginBottom:'1.5rem', color:'#111' }}>Add Product</h1>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{ 
                   display:'block', 
                   marginBottom:'1rem', 
                   padding:'0.7rem', 
                   width:'100%', 
                   border:'1px solid #ddd', 
                   borderRadius:'6px'
                 }}
              />
              <input
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                style={{ 
                   display:'block', 
                   marginBottom:'1rem', 
                   padding:'0.7rem', 
                   width:'100%', 
                   border:'1px solid #ddd', 
                   borderRadius:'6px'
                 }}
              />
              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                style={{ 
                   display:'block', 
                   marginBottom:'1.5rem', 
                   padding:'0.7rem', 
                   width:'100%', 
                   border:'1px solid #ddd', 
                   borderRadius:'6px'
                 }}
              />
              <button 
                type="submit" 
                style={{ 
                   padding:'0.7rem 1.5rem', 
                   background:'#111', 
                   color:'white', 
                   border:'none', 
                   borderRadius:'6px', 
                   fontWeight:'bold',
                   transition:'all 0.3s ease',
                   cursor:'pointer'
                 }}
                onMouseOver={(e) => e.target.style.background = '#333'}
                onMouseOut={(e) => e.target.style.background = '#111'}
              >
                Add Product
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 style={{ marginBottom:'1.5rem', color:'#111' }}>Products</h1>
            <div 
              style={{ 
                display:'grid', 
                gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', 
                gap:'2rem'
              }}>
              {products.map((p) => (
                <div 
                   key={p.id} 
                   style={{ 
                     background:'white', 
                     padding:'1.5rem', 
                     borderRadius:'10px', 
                     boxShadow:'0 4px 10px -5px black', 
                     transition:'transform 0.3s ease',
                     cursor:'pointer'
                   }}
                   onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                   onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                >
                   <h2 style={{ marginBottom:'0.5rem', color:'#111' }}>{p.name}</h2>
                   <p style={{ marginBottom:'1rem', color:'#666' }}>{p.description}</p>
                   <strong>${p.price}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default App;
