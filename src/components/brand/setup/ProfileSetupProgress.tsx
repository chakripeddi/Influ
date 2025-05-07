
import React from "react";
import { motion } from "framer-motion";

interface ProfileSetupProgressProps {
  progress: number;
  steps: { id: string; label: string }[];
  activeStep: string;
}

const ProfileSetupProgress: React.FC<ProfileSetupProgressProps> = ({ 
  progress, 
  steps, 
  activeStep 
}) => {
  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <div className="absolute top-1 left-0 w-full flex justify-between px-2">
        {steps.map((step, index) => {
          const isCompleted = steps.findIndex(s => s.id === activeStep) >= index;
          return (
            <div key={step.id} className="relative">
              <div 
                className={`
                  w-2 h-2 rounded-full -mt-1 
                  ${isCompleted ? 'bg-primary' : 'bg-gray-300'} 
                  ${activeStep === step.id ? 'ring-2 ring-primary ring-offset-2' : ''}
                `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSetupProgress;
