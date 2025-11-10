import useCart from '../hooks/useCart.js';

function CartPage() {
  const { cart, loading, error, removeItem } = useCart();

  const hasItems = cart?.items?.length > 0;

  const handleRemove = (itemId) => {
    removeItem(itemId).catch(() => {
      // error handled in context
    });
  };

  if (loading && !cart) {
    return <p>Loading cart...</p>;
  }

  return (
    <section>
      <header className="section-header">
        <h2>Your Cart</h2>
      </header>
      {error && <p className="error">Cart error: {error}</p>}
      {!hasItems && <p>Your cart is empty.</p>}
      {hasItems && (
        <div className="cart">
          <ul className="cart__items">
            {cart.items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item__info">
                  <h3>{item.product.name}</h3>
                  <p>${item.product.price?.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ${item.lineTotal.toFixed(2)}</p>
                </div>
                <button className="btn btn-secondary" onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <aside className="cart__summary">
            <h3>Summary</h3>
            <p>Total items: {cart.totals.quantity}</p>
            <p>Total amount: ${cart.totals.amount.toFixed(2)}</p>
            <button className="btn btn-primary" disabled>
              Checkout (Coming soon)
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}

export default CartPage;

