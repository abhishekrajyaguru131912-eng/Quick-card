import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    updateCart(cart.filter(i => i._id !== id));
  };

  const changeQty = (id, delta) => {
    updateCart(cart.map(i =>
      i._id === id
        ? { ...i, qty: Math.max(1, i.qty + delta) }
        : i
    ));
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = async () => {
    if (cart.length === 0) return alert('Cart is empty!');
    setLoading(true);

    try {
      await axios.post(
        'http://localhost:5000/api/orders',
        {
          items: cart.map(i => ({
            product: i._id,
            quantity: i.qty,
            price: i.price
          })),
          total: subtotal
        },
        { headers: { Authorization: 'Bearer ' + token } }
      );

      alert('Order placed successfully!');
      updateCart([]);
      navigate('/');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} />

      <div style={{ maxWidth: '1000px', margin: '24px auto' }}>
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item._id} style={styles.item}>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                <button onClick={() => changeQty(item._id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => changeQty(item._id, 1)}>+</button>

                <button onClick={() => removeItem(item._id)}>
                  Remove
                </button>
              </div>
            ))}

            <h3>Total: ₹{subtotal}</h3>

            <button onClick={placeOrder}>
              {loading ? 'Placing...' : 'Place Order'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  item: {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px'
  }
};

export default Cart;