import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./components/home";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "white",
              color: "#1f2937",
              border: "2px solid #e5e7eb",
              borderRadius: "16px",
              fontWeight: "700",
              boxShadow: "0 4px 0 #d1d5db",
            },
          }}
        />
      </>
    </Suspense>
  );
}

export default App;
