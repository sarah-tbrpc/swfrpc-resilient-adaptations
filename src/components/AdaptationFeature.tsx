import React, { HTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface AdaptationFeatureProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function AdaptationFeature({ icon: Icon, title, description, delay = 0, ...props }: AdaptationFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-4 p-6 bg-white rounded-2xl ring-1 ring-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-1 transition-all"
      {...(props as any)}
    >
      <div className="w-12 h-12 rounded-xl bg-[#e6f4f7] text-[#009bba] flex items-center justify-center">
        <Icon className="w-6 h-6" strokeWidth={2} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
