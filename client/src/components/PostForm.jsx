import { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

function PostForm({ show, onClose, onSubmit, initialData }) {
    const [form, setForm] = useState({
        title: '', content: '', author: '',
        category: 'Tech', emoji: '📰',
    });

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        } else {
            setForm({ title: '', content: '', author: '', category: 'Tech', emoji: '📰' });
        }
    }, [initialData, show]);

    const handleChange = e =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = () => {
        if (!form.title || !form.content || !form.author) return;
        onSubmit(form);
        setForm({ title: '', content: '', author: '', category: 'Tech', emoji: '📰' });
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>

            <Modal.Header closeButton>
                <Modal.Title>{initialData ? '✏️ Edit Article' : '✍️ Write a New Article'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>Article Title *</Form.Label>
                        <Form.Control
                            name="title" value={form.title}
                            onChange={handleChange}
                            placeholder="Write a compelling headline…"
                        />
                    </Form.Group>

                    <Row>
                        <Col md="6">
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select name="category" value={form.category} onChange={handleChange}>
                                    {['Tech', 'Health', 'Science', 'Business', 'Sports', 'World']
                                        .map(c => <option key={c}>{c}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group className="mb-3">
                                <Form.Label>Author Name *</Form.Label>
                                <Form.Control
                                    name="author" value={form.author}
                                    onChange={handleChange} placeholder="Your name"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Article Content *</Form.Label>
                        <Form.Control
                            as="textarea" rows={5}
                            name="content" value={form.content}
                            onChange={handleChange}
                            placeholder="Write your article here…"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Post Emoji</Form.Label>
                        <Form.Control
                            name="emoji" value={form.emoji}
                            onChange={handleChange}
                            maxLength="2" placeholder="📰"
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="dark" onClick={handleSubmit}>{initialData ? '✏️ Update' : '📰 Publish'}</Button>
            </Modal.Footer>

        </Modal>
    );
}
export default PostForm;