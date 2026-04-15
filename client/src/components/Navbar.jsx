import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>

      {/* LOGO */}
      <Link to="/" style={styles.logo}>amazon</Link>

      {/* SEARCH */}
      <input
        style={styles.search}
        type="text"
        placeholder="Search products..."
      />

      {/* RIGHT SIDE */}
      <div style={styles.right}>

        {user ? (
          <>
            <span style={styles.welcome}>Hello, {user.name}</span>

            {/* ADMIN SECTION */}
            {user.role === 'admin' && (
              <>
                <Link to="/admin/dashboard" style={styles.link}>
                  Dashboard
                </Link>

                <Link to="/admin/products" style={styles.link}>
                  Products
                </Link>

                <Link to="/admin/orders" style={styles.link}>
                  Orders
                </Link>
              </>
            )}

            <button onClick={handleLogout} style={styles.btn}>
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Sign In</Link>
        )}

        {/* CART */}
        <Link to="/cart" style={styles.cartBtn}>
          🛒 Cart
          {cartCount > 0 && (
            <span style={styles.badge}>{cartCount}</span>
          )}
        </Link>

      </div>

    </nav>
  );
}

/* ✅ STYLES ADD KARO (IMPORTANT) */
const styles = {
  nav: { background: '#131921', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '16px' },
  logo: { color: 'white', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' },
  search: { flex: 1, padding: '8px 12px', borderRadius: '4px', border: 'none', fontSize: '14px' },
  right: { display: 'flex', alignItems: 'center', gap: '12px' },
  welcome: { color: '#ccc', fontSize: '13px' },
  link: { color: 'white', textDecoration: 'none', fontSize: '14px' },
  btn: { background: 'transparent', color: 'white', border: '1px solid #555', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', fontSize: '13px' },
  cartBtn: { textDecoration: 'none', fontSize: '14px', background: '#f90', padding: '6px 12px', borderRadius: '4px', color: '#111', fontWeight: 'bold', position: 'relative' },
  badge: { background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '11px', marginLeft: '4px' }
};

/* ✅ EXPORT DEFAULT (VERY IMPORTANT) */
export default Navbar;