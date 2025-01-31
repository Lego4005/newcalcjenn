import { Card, CardBody, CardHeader, Chip, Image, Tooltip } from "@heroui/react";
import { Bed, Bath, Square, Calendar, Map, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { SparklineChart } from '@/components/charts/SparklineChart';
import type { Property, MetricValue } from '@/types/property';

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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMetricColor = (change?: number) => {
    if (!change) return 'hsl(var(--primary))';
    return change > 0 
      ? 'hsl(var(--success))' 
      : change < 0 
        ? 'hsl(var(--destructive))' 
        : 'hsl(var(--primary))';
  };

  const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  const renderMetricTrend = (metric?: MetricValue) => {
    if (!metric?.change) return null;
    
    const TrendIcon = metric.change > 0 ? TrendingUp : metric.change < 0 ? TrendingDown : Minus;
    const color = metric.change > 0 ? 'text-success' : metric.change < 0 ? 'text-danger' : 'text-default-500';
    
    return (
      <Tooltip
        content={`Changed from ${formatPrice(metric.previous || 0)} (${formatPercentage(metric.change)})`}
        placement="top"
      >
        <div className={`flex items-center gap-1 ${color}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {formatPercentage(metric.change)}
          </span>
        </div>
      </Tooltip>
    );
  };

  const metrics = property.metrics;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className="w-full group">
          <CardHeader className="relative p-0 overflow-hidden">
            <Image
              removeWrapper
              alt="Property Image"
              aria-label={`Image of ${property.address}`}
              className="z-0 w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-110"
              src={property.images[0]}
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Chip
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
              {property.source && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Tooltip 
                    content={`Data from ${property.source.name} (${formatDate(property.source.fetchDate)})`}
                    placement="bottom"
                  >
                    <Chip
                      className="cursor-help"
                      size="sm"
                      variant="flat"
                      startContent={<Info className="w-3 h-3" />}
                    >
                      Source
                    </Chip>
                  </Tooltip>
                </motion.div>
              )}
            </div>
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
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {formatPrice(property.price)}
                </motion.h3>
                {metrics?.propertyValue && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1"
                  >
                    {renderMetricTrend(metrics.propertyValue)}
                  </motion.div>
                )}
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

              {metrics && (
                <motion.div 
                  className="grid grid-cols-2 gap-4 mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {[
                    {
                      label: 'Cap Rate',
                      value: metrics.capRate?.current,
                      format: (v: number) => formatPercentage(v),
                      trend: metrics.capRate
                    },
                    {
                      label: 'ROI',
                      value: metrics.roi?.current,
                      format: (v: number) => formatPercentage(v),
                      trend: metrics.roi
                    },
                    {
                      label: 'Monthly Income',
                      value: metrics.monthlyIncome?.current,
                      format: formatPrice,
                      trend: metrics.monthlyIncome
                    },
                    {
                      label: 'Cash on Cash',
                      value: metrics.cashOnCash?.current,
                      format: (v: number) => formatPercentage(v),
                      trend: metrics.cashOnCash
                    }
                  ].map((metric, index) => metric.value && (
                    <motion.div
                      key={index}
                      className="space-y-1"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {metric.trend?.history && metric.trend.history.length > 0 && (
                        <div className="h-8">
                          <SparklineChart
                            data={metric.trend.history}
                            color={getMetricColor(metric.trend.change)}
                            showAnimation={true}
                            showTooltip={true}
                            height={32}
                            className="w-full"
                          />
                        </div>
                      )}
                      <div className="text-sm text-default-500">{metric.label}</div>
                      <div className="font-semibold">{metric.format(metric.value)}</div>
                      {renderMetricTrend(metric.trend)}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              <motion.div 
                className="pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Chip
                  variant="flat"
                  color="secondary"
                  size="sm"
                  className="mt-2"
                >{property.propertyType}</Chip>
              </motion.div>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
}