import { Card, CardBody, Divider } from "@heroui/react";
import { History, DollarSign, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Property } from './PropertyDashboard';

type PropertyHistoryProps = {
  property: Property;
};

type HistoryEvent = {
  date: string;
  event: string;
  price?: number;
  agent?: string;
  description: string;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export default function PropertyHistory({ property }: PropertyHistoryProps) {
  // Mock history data - replace with real data from Supabase
  const history: HistoryEvent[] = [
    {
      date: '2023-12-01',
      event: 'Listed',
      price: property.price,
      agent: 'John Smith',
      description: 'Property listed on MLS',
    },
    {
      date: '2023-11-15',
      event: 'Price Change',
      price: 475000,
      description: 'Price reduced by $25,000',
    },
    {
      date: '2023-11-01',
      event: 'Open House',
      agent: 'Sarah Johnson',
      description: '25 visitors attended',
    },
    {
      date: '2023-10-15',
      event: 'Listed',
      price: 500000,
      agent: 'John Smith',
      description: 'Initial listing',
    },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-2">Property History</h3>
        <p className="text-default-500">
          Track this property's history and market activity
        </p>
      </motion.div>

      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {history.map((event, index) => (
          <motion.div key={index} variants={item}>
            <Card className="w-full hover:shadow-lg transition-shadow">
              <CardBody className="py-3">
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="bg-default-100 p-2 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <History className="w-5 h-5 text-default-500" />
                  </motion.div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{event.event}</h4>
                        <p className="text-small text-default-500">
                          {formatDate(event.date)}
                        </p>
                      </div>
                      {event.price && (
                        <motion.div 
                          className="flex items-center gap-1 text-default-500"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <DollarSign className="w-4 h-4" />
                          <span>{formatPrice(event.price)}</span>
                        </motion.div>
                      )}
                    </div>
                    
                    <Divider className="my-2" />
                    
                    <motion.div 
                      className="text-small"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <p>{event.description}</p>
                      {event.agent && (
                        <div className="flex items-center gap-1 mt-1 text-default-400">
                          <User className="w-3 h-3" />
                          <span>{event.agent}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
} 