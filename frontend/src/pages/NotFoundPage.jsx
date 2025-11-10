import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we could not find that page.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </section>
  );
}

export default NotFoundPage;

