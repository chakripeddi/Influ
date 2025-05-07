
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface BrandWelcomeBannerProps {
  brandName: string;
  stats: Stat[];
}

const BrandWelcomeBanner: React.FC<BrandWelcomeBannerProps> = ({ brandName, stats }) => {
  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, {brandName}!</h1>
        <p className="text-muted-foreground mb-6">
          Here's an overview of your campaign performance and latest activities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            className="hover-scale"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <Card className="border-l-4 border-l-brand-purple">
              <CardContent className="flex items-center p-4">
                <div className="bg-muted rounded-full p-3 mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrandWelcomeBanner;
