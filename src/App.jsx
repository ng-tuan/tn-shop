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
    </SearchProvider>
  );
}

export default App;
