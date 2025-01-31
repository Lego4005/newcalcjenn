import { Card, CardBody, Spinner } from "@heroui/react";

export default function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
      <Card className="p-8 bg-background/80">
        <CardBody className="flex flex-col items-center gap-4">
          <Spinner size="lg" color="primary" />
          <p className="text-default-600">Loading...</p>
        </CardBody>
      </Card>
    </div>
  );
}