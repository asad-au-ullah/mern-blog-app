import { Card, Badge, Button } from 'react-bootstrap';

const CAT_VARIANTS = {
    Tech: 'primary', Health: 'success', Science: 'dark',
    Business: 'warning', Sports: 'info', World: 'danger'
};

function PostCard({ post, onDelete }) {
    const excerpt = post.content.length > 150
        ? post.content.slice(0, 150) + '…'
        : post.content;

    return (
        <Card className="h-100 shadow-sm">

            <Card.Header className="d-flex justify-content-between align-items-center">
                <Badge bg={CAT_VARIANTS[post.category] || 'secondary'}>
                    {post.category}
                </Badge>
                <small className="text-muted">
                    {new Date(post.createdAt).toLocaleDateString()}
                </small>
            </Card.Header>

            <Card.Body>
                <Card.Title>{post.emoji} {post.title}</Card.Title>
                <Card.Text className="text-muted">{excerpt}</Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between align-items-center">
                <small>✍️ {post.author}</small>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(post._id)}
                >
                    🗑️ Delete
                </Button>
            </Card.Footer>

        </Card>
    );
}
export default PostCard;