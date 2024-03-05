import {
  CardBody,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
} from '@chakra-ui/react';

const FundraiserCardStepper = ({ activeStep, steps }) => {
  return (
    <CardBody>
      <Stepper index={activeStep} colorScheme="teal">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </CardBody>
  );
};

export default FundraiserCardStepper;
