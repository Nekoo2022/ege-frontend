"use client";

import { motion } from "framer-motion";
import SupportContactCards from "@/components/feature/support/SupportContactCards";
import SupportFAQ from "@/components/feature/support/SupportFAQ";
import SupportForm from "@/components/feature/support/SupportForm";

export default function SupportPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-[#5e52cb]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Служба поддержки
      </motion.h1>

      <SupportContactCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SupportForm />
        <SupportFAQ />
      </div>
    </div>
  );
}
