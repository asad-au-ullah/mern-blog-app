import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import AppNavbar from './components/AppNavbar';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import CategoryFilter from './components/CategoryFilter';
import './App.css';

const API = import.meta.env.VITE_BACKEND_URL || '';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'All';
  });
  const [alert, setAlert] = useState(null); // { msg, variant }

  const fetchPosts = async () => {
    setLoading(true);
    const params = category !== 'All' ? { category } : {};
    const res = await axios.get(`${API}/api/posts`, { params });
    setPosts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();

    const params = new URLSearchParams(window.location.search);
    if (category !== 'All') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    const newSearch = params.toString() ? `?${params.toString()}` : '';
    if (window.location.search !== newSearch) {
      window.history.pushState(null, '', newSearch || window.location.pathname);
    }
  }, [category]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setCategory(params.get('category') || 'All');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showAlert = (msg, variant = 'success') => {
    setAlert({ msg, variant });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSavePost = async (data) => {
    await axios.post(`${API}/api/posts`, data);
    showAlert('📰 Article published successfully!');
    fetchPosts();
  };

  const handleWriteClick = () => {
    setShowForm(true);
  };

  const deletePost = async (id) => {
    await axios.delete(`${API}/api/posts/${id}`);
    fetchPosts();
    showAlert('🗑️ Article deleted', 'danger');
  };

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <AppNavbar onWriteClick={handleWriteClick} />

      <Container className="py-4 flex-grow-1 overflow-auto custom-scroll">

        {/* Alert message */}
        {alert && (
          <Alert variant={alert.variant}>{alert.msg}</Alert>
        )}

        {/* Category filter */}
        <CategoryFilter active={category} onChange={setCategory} />

        {/* Loading spinner */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : posts.length === 0 ? (
          <Alert variant="light">
            No posts yet. Be the first to write one! 📰
          </Alert>
        ) : (
          // 3-column responsive grid using Bootstrap Row + Col
          <Row xs="1" md="2" lg="3" className="g-4">
            {posts.map(post => (
              <Col key={post._id}>
                <PostCard post={post} onDelete={deletePost} />
              </Col>
            ))}
          </Row>
        )}

      </Container>

      <PostForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSavePost}
      />
    </div>
  );
}

export default App;