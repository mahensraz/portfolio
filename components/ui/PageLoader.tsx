"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  // const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
        >
          {/* Background shimmer */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(79,142,247,0.15) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold font-display"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(79,142,247,0.2) 0%, rgba(155,92,246,0.2) 100%)",
                  border: "1px solid rgba(79,142,247,0.3)",
                }}
              >
                <span className="gradient-text">MR</span>
              </div>

              {/* Rotating ring */}
              <div
                className="loader-ring absolute -inset-2 rounded-[20px] border-2 border-transparent"
                style={{
                  borderTopColor: "rgba(79,142,247,0.6)",
                  borderRightColor: "rgba(155,92,246,0.4)",
                }}
              />
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="h-[2px] w-40 overflow-hidden rounded-full bg-surface-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #4f8ef7, #9b5cf6, #22d3ee)",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Label */}
            <motion.p
              className="font-mono-custom text-xs tracking-widest text-text-muted uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading portfolio...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
