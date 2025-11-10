function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Diligent Shop. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

