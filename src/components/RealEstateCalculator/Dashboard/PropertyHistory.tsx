import { Card, CardBody, Divider, Chip, Avatar } from "@heroui/react";
import { History, DollarSign, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Property } from '@/types/property';

type PropertyHistoryProps = Readonly<{
  property: Property;
}>;

type HistoryEvent = Readonly<{
  id: string;
  date: string;
  event: 'Listed' | 'Price Change' | 'Open House' | 'Offer' | 'Sale';
  price?: number;
  agent?: string;
  description: string;
}>;

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

const eventColors: Record<HistoryEvent['event'], 'primary' | 'success' | 'warning' | 'secondary' | 'danger'> = {
  'Listed': 'primary',
  'Price Change': 'warning',
  'Open House': 'secondary',
  'Offer': 'success',
  'Sale': 'success'
};

export default function PropertyHistory({ property }: PropertyHistoryProps) {
  // Mock history data - replace with real data from Supabase
  const history: HistoryEvent[] = [
    {
      id: 'hist-1',
      date: '2023-12-01',
      event: 'Listed',
      price: property.price,
      agent: 'John Smith',
      description: 'Property listed on MLS',
    },
    {
      id: 'hist-2',
      date: '2023-11-15',
      event: 'Price Change',
      price: 475000,
      description: 'Price reduced by $25,000',
    },
    {
      id: 'hist-3',
      date: '2023-11-01',
      event: 'Open House',
      agent: 'Sarah Johnson',
      description: '25 visitors attended',
    },
    {
      id: 'hist-4',
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
      hour: '2-digit',
      minute: '2-digit',
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
        className="flex items-center gap-2"
      >
        <History className="w-5 h-5 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">Property History</h3>
          <p className="text-small text-default-500">
            Track this property&apos;s history and market activity
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {history.map((event) => (
          <motion.div key={event.id} variants={item}>
            <Card className="w-full hover:shadow-lg transition-shadow">
              <CardBody className="py-3">
                <div className="flex items-start gap-4">
                  <Chip
                    color={eventColors[event.event]}
                    variant="flat"
                    startContent={<History className="w-4 h-4" />}
                  >
                    {event.event}
                  </Chip>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-default-400" />
                        <span className="text-small text-default-500">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      {event.price && (
                        <motion.div 
                          className="flex items-center gap-1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <Chip
                            color="success"
                            variant="flat"
                            size="sm"
                            startContent={<DollarSign className="w-3 h-3" />}
                          >
                            {formatPrice(event.price)}
                          </Chip>
                        </motion.div>
                      )}
                    </div>
                    
                    <Divider className="my-2" />
                    
                    <motion.div 
                      className="text-small"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="text-default-700">{event.description}</p>
                      {event.agent && (
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar
                            name={event.agent}
                            size="sm"
                            icon={<User />}
                            className="bg-default-100"
                          />
                          <span className="text-small text-default-500">
                            {event.agent}
                          </span>
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
