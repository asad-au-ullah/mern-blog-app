import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import AppNavbar from './components/AppNavbar';
import PostCard from './components/PostCard';
import PostForm from './components/PostForm';
import CategoryFilter from './components/CategoryFilter';
import './App.css';

const API = '/api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [category, setCategory] = useState('All');
  const [alert, setAlert] = useState(null); // { msg, variant }

  const fetchPosts = async () => {
    setLoading(true);
    const params = category !== 'All' ? { category } : {};
    const res = await axios.get(API, { params });
    setPosts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const showAlert = (msg, variant = 'success') => {
    setAlert({ msg, variant });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSavePost = async (data) => {
    if (data._id) {
      await axios.put(`${API}/${data._id}`, data);
      showAlert('✏️ Article updated successfully!');
    } else {
      await axios.post(API, data);
      showAlert('📰 Article published successfully!');
    }
    fetchPosts();
  };

  const handleEditClick = (post) => {
    setPostToEdit(post);
    setShowForm(true);
  };

  const handleWriteClick = () => {
    setPostToEdit(null);
    setShowForm(true);
  };

  const deletePost = async (id) => {
    await axios.delete(`${API}/${id}`);
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
                <PostCard post={post} onDelete={deletePost} onEdit={handleEditClick} />
              </Col>
            ))}
          </Row>
        )}

      </Container>

      <PostForm
        show={showForm}
        onClose={() => {
          setShowForm(false);
          setPostToEdit(null);
        }}
        onSubmit={handleSavePost}
        initialData={postToEdit}
      />
    </div>
  );
}

export default App;