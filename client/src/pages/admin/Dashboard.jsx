import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('products');
  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    stock: '',
    description: '',
    rating: '4.0'
  });

  const { token } = useAuth();
  const navigate = useNavigate();

  // ✅ FIX: stable headers
  const headers = useMemo(() => ({
    Authorization: 'Bearer ' + token
  }), [token]);

  // ✅ FIX: proper dependency
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(r => setProducts(r.data));

    if (token) {
      axios.get('http://localhost:5000/api/orders/all', { headers })
        .then(r => setOrders(r.data))
        .catch(() => {});
    }
  }, [headers, token]);

  const addProduct = async () => {
    if (!form.name || !form.price) {
      alert('Name and Price required!');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/products',
        {
          ...form,
          price: Number(form.price),
          originalPrice: Number(form.originalPrice),
          stock: Number(form.stock),
          rating: Number(form.rating)
        },
        { headers }
      );

      setProducts([...products, res.data]);

      setForm({
        name: '',
        price: '',
        originalPrice: '',
        category: '',
        stock: '',
        description: '',
        rating: '4.0'
      });

      alert('Product added!');
    } catch (err) {
      alert('Error: ' + err.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;

    await axios.delete(
      'http://localhost:5000/api/products/' + id,
      { headers }
    );

    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h3 style={styles.sideTitle}>Admin Panel</h3>

        {['products', 'orders', 'addProduct'].map(t => (
          <div
            key={t}
            style={{
              ...styles.sideItem,
              ...(tab === t ? styles.activeItem : {})
            }}
            onClick={() => setTab(t)}
          >
            {t === 'products'
              ? '📦 Products'
              : t === 'orders'
              ? '📋 Orders'
              : '➕ Add Product'}
          </div>
        ))}

        <div style={styles.sideItem} onClick={() => navigate('/')}>
          🏠 Back to Store
        </div>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        {/* PRODUCTS */}
        {tab === 'products' && (
          <>
            <h2 style={styles.heading}>Products ({products.length})</h2>

            <table style={styles.table}>
              <thead>
                <tr style={styles.thead}>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Stock</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td style={styles.td}>{p.name}</td>
                    <td style={styles.td}>{p.category}</td>
                    <td style={styles.td}>₹{p.price}</td>
                    <td style={styles.td}>{p.stock}</td>
                    <td style={styles.td}>
                      <button style={styles.delBtn} onClick={() => deleteProduct(p._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <>
            <h2 style={styles.heading}>Orders ({orders.length})</h2>

            {orders.map(o => (
              <div key={o._id} style={styles.card}>
                ₹{o.total} - {o.status}
              </div>
            ))}
          </>
        )}

        {/* ADD PRODUCT */}
        {tab === 'addProduct' && (
          <>
            <h2 style={styles.heading}>Add Product</h2>

            <div style={styles.formGrid}>
              {Object.keys(form).map(key => (
                <input
                  key={key}
                  placeholder={key}
                  value={form[key]}
                  onChange={e =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  style={styles.input}
                />
              ))}
            </div>

            <button style={styles.addBtn} onClick={addProduct}>
              Add Product
            </button>
          </>
        )}

      </div>
    </div>
  );
}

/* ✅ STYLES */
const styles = {
  sidebar: {
    width: '200px',
    background: '#232f3e',
    color: 'white',
    padding: '15px'
  },
  sideTitle: {
    color: '#f90',
    marginBottom: '10px'
  },
  sideItem: {
    padding: '10px',
    cursor: 'pointer'
  },
  activeItem: {
    background: '#37475a'
  },
  content: {
    flex: 1,
    padding: '20px',
    background: '#f3f3f3'
  },
  heading: {
    marginBottom: '10px'
  },
  table: {
    width: '100%',
    background: 'white'
  },
  thead: {
    background: '#ddd'
  },
  th: {
    padding: '10px'
  },
  td: {
    padding: '10px'
  },
  delBtn: {
    background: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer'
  },
  card: {
    background: 'white',
    padding: '10px',
    margin: '10px 0'
  },
  formGrid: {
    display: 'grid',
    gap: '10px'
  },
  input: {
    padding: '10px'
  },
  addBtn: {
    marginTop: '10px',
    padding: '10px',
    background: '#f90',
    border: 'none',
    cursor: 'pointer'
  }
};

export default Dashboard;