"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";  
import BusLoader from "./BusLoader";

export default function AppLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remove the static HTML loader after hydration
    const staticLoader = document.getElementById("startup-loader");
    if (staticLoader) {
      staticLoader.style.opacity = "0";
      staticLoader.style.transition = "opacity 0.5s ease";
      setTimeout(() => staticLoader.remove(), 500);
    }

    // Simulate hydration delay / data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999]"
        >
          <BusLoader/>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
