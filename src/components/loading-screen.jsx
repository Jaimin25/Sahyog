import { Card, CardBody } from '@chakra-ui/react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="flex h-full items-center justify-center space-y-4 bg-black/5 px-4 py-8 sm:px-10 lg:px-14">
      <Card>
        <CardBody>
          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        </CardBody>
      </Card>
    </div>
  );
};

export default LoadingScreen;
