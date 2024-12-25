import { Card, CardBody, CardHeader, Chip, Image } from '@nextui-org/react';
import { Bed, Bath, Square, Calendar, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Property } from './PropertyDashboard';

type PropertyPreviewProps = {
  property: Property;
};

export default function PropertyPreview({ property }: PropertyPreviewProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="w-full group"
        as={motion.div}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <CardHeader className="relative p-0 overflow-hidden">
          <Image
            removeWrapper
            alt="Property Image"
            className="z-0 w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-110"
            src={property.images[0]}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Chip
              className="absolute top-2 right-2"
              color={
                property.status === 'Active'
                  ? 'success'
                  : property.status === 'Pending'
                  ? 'warning'
                  : 'default'
              }
              size="sm"
              variant="flat"
            >
              {property.status}
            </Chip>
          </motion.div>
        </CardHeader>
        <CardBody>
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <motion.h3 
                className="text-2xl font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {formatPrice(property.price)}
              </motion.h3>
              <motion.div 
                className="flex items-center gap-1 text-default-500"
                whileHover={{ x: 5 }}
              >
                <Map className="w-4 h-4" />
                <span className="text-sm">{property.address}</span>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Bed, value: property.beds, label: 'Beds' },
                { icon: Bath, value: property.baths, label: 'Baths' },
                { icon: Square, value: formatNumber(property.sqft), label: 'sqft' },
                { icon: Calendar, value: property.yearBuilt, label: 'Built' },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-4 h-4 text-default-500" />
                  <div>
                    <span className="font-semibold">{item.value}</span>
                    <span className="text-default-500 text-sm"> {item.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-sm font-medium">Property Type</div>
              <div className="text-default-500 text-sm">{property.propertyType}</div>
            </motion.div>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
} 