import { useRef } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { SearchProvider } from "./contexts/SearchProvider";

function App() {
  const closeMobileMenuRef = useRef(null);

  return (
    <SearchProvider>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header closeMobileMenuRef={closeMobileMenuRef} />

        {/* Main Content */}
        <Main closeMobileMenuRef={closeMobileMenuRef} />

        {/* Footer */}
        <Footer />
        <ScrollToTop />
      </div>
    </SearchProvider>
  );
}

export default App;
