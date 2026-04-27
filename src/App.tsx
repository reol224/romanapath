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
              background: "#1E1A16",
              color: "#F5EFE0",
              border: "1px solid rgba(245,239,224,0.1)",
              borderRadius: "12px",
            },
          }}
        />
      </>
    </Suspense>
  );
}

export default App;
