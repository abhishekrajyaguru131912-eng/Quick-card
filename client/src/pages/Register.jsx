import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password min 6 characters'); return; }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      alert('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.logo}>amazon</div>
      <div style={styles.box}>
        <h2 style={styles.title}>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.group}>
            <label style={styles.label}>Full Name</label>
            <input style={styles.input} type="text" value={name}
              onChange={e => setName(e.target.value)} placeholder="Your full name" required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" required />
          </div>
          <div style={styles.group}>
            <label style={styles.label}>Re-enter Password</label>
            <input style={styles.input} type="password" value={confirm}
              onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" required />
          </div>
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p style={styles.switch}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f3f3f3', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '32px' },
  logo: { fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' },
  box: { background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '24px', width: '100%', maxWidth: '360px' },
  title: { fontSize: '24px', fontWeight: '700', marginBottom: '16px' },
  error: { background: '#fce8e8', color: '#c40000', padding: '8px 12px', borderRadius: '4px', marginBottom: '12px', fontSize: '14px' },
  group: { marginBottom: '14px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' },
  input: { width: '100%', padding: '9px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '10px', background: '#f90', border: 'none', borderRadius: '4px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
  switch: { textAlign: 'center', fontSize: '13px', marginTop: '16px', color: '#555' }
};

export default Register;