function Header() {
  return <h1>Welcome to React Fiber!</h1>;
}

function Footer() {
  return <footer>Thanks for visiting.</footer>;
}

function FiberNode() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default FiberNode;
