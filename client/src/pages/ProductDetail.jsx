import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/' + id)
      .then(res => { setProduct(res.data); setLoading(false); })
      .catch(err => { console.log(err); setLoading(false); });
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '40px' }}>Product not found</div>;

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '24px auto', padding: '0 16px' }}>
        <p style={{ color: '#007185', cursor: 'pointer', marginBottom: '16px' }} onClick={() => navigate('/')}>
          ← Back to Home
        </p>
        <div style={styles.box}>
          <div style={styles.imgBox}>📦</div>
          <div style={styles.info}>
            <h1 style={styles.name}>{product.name}</h1>
            <p style={styles.brand}>{product.category}</p>
            <p style={styles.rating}>⭐ {product.rating}</p>
            <div style={styles.priceRow}>
              <span style={styles.price}>₹{product.price?.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span style={styles.original}>₹{product.originalPrice?.toLocaleString()}</span>
              )}
            </div>
            <p style={styles.desc}>{product.description}</p>
            <p style={styles.stock}>
              {product.stock > 0
                ? '✅ In Stock (' + product.stock + ' left)'
                : '❌ Out of Stock'}
            </p>
            <button style={styles.cartBtn} onClick={() => { alert('Added to cart!'); }}>
              Add to Cart
            </button>
            <button style={styles.buyBtn} onClick={() => navigate('/cart')}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  box: { background: 'white', borderRadius: '8px', padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' },
  imgBox: { background: '#f8f8f8', width: '280px', height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', borderRadius: '8px', flexShrink: 0 },
  info: { flex: 1, minWidth: '200px' },
  name: { fontSize: '22px', fontWeight: '400', marginBottom: '8px' },
  brand: { color: '#007185', fontSize: '14px', marginBottom: '8px' },
  rating: { fontSize: '14px', marginBottom: '12px' },
  priceRow: { display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' },
  price: { fontSize: '28px', fontWeight: '400' },
  original: { textDecoration: 'line-through', color: '#888', fontSize: '16px' },
  desc: { fontSize: '14px', color: '#444', lineHeight: '1.7', marginBottom: '12px' },
  stock: { fontSize: '14px', color: '#067D62', fontWeight: '600', marginBottom: '16px' },
  cartBtn: { width: '100%', padding: '10px', background: '#f90', border: 'none', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', marginBottom: '8px', fontSize: '14px' },
  buyBtn: { width: '100%', padding: '10px', background: '#fa8900', border: 'none', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }
};

export default ProductDetail;