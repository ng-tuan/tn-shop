import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProductForm from "./pages/ProductForm";
import { SearchProvider } from "./contexts/SearchProvider";

function HomePage() {
  const closeMobileMenuRef = useRef(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header closeMobileMenuRef={closeMobileMenuRef} />

      {/* Main Content */}
      <div className="flex-1">
        <Main closeMobileMenuRef={closeMobileMenuRef} />
      </div>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<ProductForm />} />
        </Routes>
      </SearchProvider>
    </Router>
  );
}

export default App;
