import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NavBar({ isAdmin, onViewChange }) {
  return (
    <nav style={{ 
      padding:'1rem 2rem', 
      background:'white', 
      color:'black', 
      display:'flex',
      alignItems:'center',
      boxShadow:'0 2px 10px rgba(0,0,0,0.1)',
      position:'sticky',
      top:0,
      zIndex:100
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
          color:'black', 
          background:'none', 
          border:'none', 
          fontSize:'1rem', 
          cursor:'pointer',
          padding:'0.5rem 1rem',
          transition:'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.05)'}
        onMouseOut={(e) => e.target.style.background = 'none'}
      >
        Home
      </button>
      <button
        onClick={() => onViewChange(true)}
        style={{ 
          color:'black', 
          background:'none', 
          border:'none', 
          fontSize:'1rem', 
          cursor:'pointer',
          padding:'0.5rem 1rem',
          transition:'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.05)'}
        onMouseOut={(e) => e.target.style.background = 'none'}
      >
        Admin
      </button>
    </nav>
  )
}

function HeroSection() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '5rem 2rem',
      textAlign: 'center',
      color: 'white',
      marginBottom: '3rem'
    }}>
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
      }}>
        Welcome to MShop
      </h1>
      <p style={{
        fontSize: '1.3rem',
        maxWidth: '600px',
        margin: '0 auto',
        opacity: 0.95
      }}>
        Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
      </p>
      <button style={{
        marginTop: '2rem',
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        background: 'white',
        color: '#667eea',
        border: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-3px)';
        e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
      }}>
        Shop Now
      </button>
    </div>
  )
}

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' });
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/products', form);
    setForm({ name: '', description: '', price: '', image: '' });
    fetchProducts();
    alert('Product added successfully');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Helper function to get image path
  const getImagePath = (product, index) => {
    // If product has an image field, use it
    if (product.image) {
      return product.image;
    }
    // Otherwise, use item1.jpeg, item2.jpeg, item3.jpeg based on index
    const imageNumber = (index % 3) + 1;
    return `/assets/item${imageNumber}.jpg`;
  };

  return (
    <div style={{ fontFamily:'Helvetica, Arial, sans-serif', color:'#333', background:'#f5f5f5', minHeight:'100vh' }}>
      <NavBar isAdmin={isAdmin} onViewChange={(val) => setIsAdmin(val)} />

      {!isAdmin && <HeroSection />}

      <div style={{ padding:'2rem' }}>
        {isAdmin ? (
          <div style={{ 
            background:'white', 
            padding:'2rem', 
            borderRadius:'10px', 
            boxShadow:'0 4px 10px rgba(0,0,0,0.1)',
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
                   marginBottom:'1rem', 
                   padding:'0.7rem', 
                   width:'100%', 
                   border:'1px solid #ddd', 
                   borderRadius:'6px'
                 }}
              />
              <input
                placeholder="Image URL (optional)"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
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
                   background:'#667eea', 
                   color:'white', 
                   border:'none', 
                   borderRadius:'6px', 
                   fontWeight:'bold',
                   transition:'all 0.3s ease',
                   cursor:'pointer'
                 }}
                onMouseOver={(e) => e.target.style.background = '#764ba2'}
                onMouseOut={(e) => e.target.style.background = '#667eea'}
              >
                Add Product
              </button>
            </form>
          </div>
        ) : (
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <h1 style={{ marginBottom:'2rem', color:'#111', fontSize:'2.5rem', textAlign:'center' }}>Our Products</h1>
            <div 
              style={{ 
                display:'grid', 
                gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', 
                gap:'2rem'
              }}>
              {products.map((p, index) => (
                <div 
                   key={p.id} 
                   style={{ 
                     background:'white', 
                     borderRadius:'12px', 
                     boxShadow:'0 4px 15px rgba(0,0,0,0.1)', 
                     transition:'all 0.3s ease',
                     cursor:'pointer',
                     overflow:'hidden'
                   }}
                   onMouseOver={(e) => {
                     e.currentTarget.style.transform = 'translateY(-8px)';
                     e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                   }}
                   onMouseOut={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                   }}
                >
                   <img 
                     src={getImagePath(p, index)} 
                     alt={p.name}
                     style={{
                       width:'100%',
                       height:'350px',
                       objectFit:'cover',
                       borderBottom:'1px solid #eee'
                     }}
                   />
                   <div style={{ padding:'1.5rem' }}>
                     <h2 style={{ marginBottom:'0.5rem', color:'#111', fontSize:'1.4rem' }}>{p.name}</h2>
                     <p style={{ marginBottom:'1rem', color:'#666', lineHeight:'1.5' }}>{p.description}</p>
                     <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                       <strong style={{ fontSize:'1.5rem', color:'#667eea' }}>${p.price}</strong>
                       <button style={{
                         padding:'0.5rem 1.2rem',
                         background:'#667eea',
                         color:'white',
                         border:'none',
                         borderRadius:'6px',
                         cursor:'pointer',
                         fontWeight:'600',
                         transition:'all 0.3s ease'
                       }}
                       onMouseOver={(e) => e.target.style.background = '#764ba2'}
                       onMouseOut={(e) => e.target.style.background = '#667eea'}>
                         Add to Cart
                       </button>
                     </div>
                   </div>
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