import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Article from "./pages/Article";
import Admin from "./pages/Admin";


function App() {
  return (
    <Router>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Simple Header */}
        <header style={{ padding: "15px", borderBottom: "1px solid #ddd" }}>
          <h1>Nepal Daily Insights</h1>
          <p>Your trusted digital news portal</p>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>

        {/* Footer */}
        <footer style={{ marginTop: "40px", padding: "15px", borderTop: "1px solid #ddd" }}>
          <p>© {new Date().getFullYear()} Nepal Daily Insights</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
