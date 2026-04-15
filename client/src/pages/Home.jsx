import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(i => i._id === product._id);

    if (exists) {
      cart = cart.map(i =>
        i._id === product._id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);

    alert(product.name + " added to cart!");
  };

  if (loading) return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;

  return (
    <div>
      <Navbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} />

      <div style={{ maxWidth: '1200px', margin: '20px auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '16px' }}>
          
          {products.map(product => (
            <div key={product._id} style={{ border: '1px solid #ddd', padding: '10px' }}>

              {/* ✅ IMAGE */}
              <img
                src={
                  product.image
                    ? `http://localhost:5000/uploads/${product.image}`
                    : "http://localhost:5000/uploads/sukuna.jpg"
                }
                alt={product.name}
                style={{ width: '100%', height: '150px', objectFit: 'contain' }}
              />

              <h4>{product.name}</h4>
              <p>₹{product.price}</p>

              <button onClick={() => navigate('/product/' + product._id)}>
                View
              </button>

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Home;