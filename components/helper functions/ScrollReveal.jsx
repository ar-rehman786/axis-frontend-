"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "" }) {
    const controls = useAnimation();
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start("visible");
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [controls]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.9, ease: "easeOut" }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
            }}
        >
            {children}
        </motion.div>
    );
}
