import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  isLoading?: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  color,
  onClick,
  isLoading = false,
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-xl p-6 text-white cursor-pointer overflow-hidden relative group",
        color,
        isLoading && "opacity-50 cursor-not-allowed"
      )}
      onClick={!isLoading ? onClick : undefined}
      whileHover={!isLoading ? { scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" } : undefined}
      whileTap={!isLoading ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute -right-4 -top-4 bg-white bg-opacity-20 rounded-full p-6 transform group-hover:rotate-12 transition-transform duration-300">
        <div className="text-white">{icon}</div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm text-white text-opacity-90 mb-4">{description}</p>
        
        <div className="flex items-center mt-2 text-sm">
          <span>Get Started</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-0 group-hover:opacity-5 rounded-full -mr-10 -mb-10 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default ActionCard;
