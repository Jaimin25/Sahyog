import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    useSteps,
} from '@chakra-ui/react';
import { useState } from 'react';

import FundraiserFormFour from './forms/fundraiser-form-four';
import FundraiserFormOne from './forms/fundraiser-form-one';
import { FundraiserFormPublish } from './forms/fundraiser-form-publish';
import FundraiserFormThree from './forms/fundraiser-form-three';
import FundraiserFormTwo from './forms/fundraiser-form-two';

const steps = [{}, {}, {}, {}, {}];
const CreateFundraiserComponent = () => {
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    const [fundraiserFor, setFundraiserFor] = useState(null);
    const [beneficiaryName, setBeneficiaryName] = useState(null);
    const [fundraiserCause, setFundraiserCause] = useState(null);
    const [fundraiserGoal, setFundraiserGoal] = useState(null);
    const [fundraiserTitle, setFundraiserTitle] = useState(null);
    const [fundraiserStory, setFundraiserStory] = useState(null);
    const [coverMediaUrl, setCoverMediaUrl] = useState(null);

    return (
        <div className="flex h-full w-auto flex-col items-center justify-center gap-2 bg-teal-500 p-2">
            <div className="hidden w-full justify-center md:flex">
                <Card className="md:w-1/2">
                    <CardBody>
                        <Stepper
                            index={activeStep}
                            colorScheme="teal"
                        >
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepIndicator>
                                        <StepStatus
                                            complete={
                                                <StepIcon />
                                            }
                                            incomplete={
                                                <StepNumber />
                                            }
                                            active={
                                                <StepNumber />
                                            }
                                        />
                                    </StepIndicator>

                                    <StepSeparator />
                                </Step>
                            ))}
                        </Stepper>
                    </CardBody>
                </Card>
            </div>
            <Card className="w-[99%] sm:w-4/5 md:w-1/2">
                <CardHeader>
                    <Heading size="lg">
                        Create a Fundraiser
                    </Heading>
                    <div className="flex md:hidden">
                        {activeStep + 1} of {steps.length}
                    </div>
                </CardHeader>
                <CardBody overflowY="auto" height="10px">
                    {activeStep === 0 ? (
                        <FundraiserFormOne
                            fundraiserFor={fundraiserFor}
                            beneficiaryName={beneficiaryName}
                            setFundraiserFor={setFundraiserFor}
                            setBeneficiaryName={
                                setBeneficiaryName
                            }
                        />
                    ) : activeStep === 1 ? (
                        <FundraiserFormTwo
                            fundraiserCause={fundraiserCause}
                            fundraiserGoal={fundraiserGoal}
                            setFundraiserCause={
                                setFundraiserCause
                            }
                            setFundraiserGoal={setFundraiserGoal}
                        />
                    ) : activeStep === 2 ? (
                        <FundraiserFormThree
                            coverMediaUrl={coverMediaUrl}
                            setCoverMediaUrl={setCoverMediaUrl}
                        />
                    ) : activeStep === 3 ? (
                        <FundraiserFormFour
                            fundraiserTitle={fundraiserTitle}
                            fundraiserStory={fundraiserStory}
                            setFundraiserTitle={
                                setFundraiserTitle
                            }
                            setFundraiserStory={
                                setFundraiserStory
                            }
                        />
                    ) : (
                        activeStep === 4 && (
                            <FundraiserFormPublish
                                coverMediaUrl={coverMediaUrl}
                                fundraiserCause={fundraiserCause}
                                fundraiserGoal={fundraiserGoal}
                                fundraiserTitle={fundraiserTitle}
                                fundraiserStory={fundraiserStory}
                            />
                        )
                    )}
                </CardBody>
                <CardFooter justifyContent="space-between">
                    <Button
                        onClick={() =>
                            activeStep >= 1 &&
                            setActiveStep(activeStep - 1)
                        }
                        isDisabled={activeStep === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        colorScheme="teal"
                        onClick={() =>
                            activeStep < steps.length - 1 &&
                            setActiveStep(activeStep + 1)
                        }
                        isDisabled={
                            activeStep === 0
                                ? fundraiserFor === 'myself'
                                    ? !fundraiserFor
                                    : !beneficiaryName ||
                                      !fundraiserFor
                                : activeStep === 1
                                  ? !fundraiserCause ||
                                    !fundraiserGoal
                                  : activeStep === 2
                                    ? !coverMediaUrl
                                    : activeStep === 3
                                      ? !fundraiserTitle ||
                                        !fundraiserStory
                                      : false
                        }
                    >
                        {activeStep !== steps.length - 1
                            ? 'Continue'
                            : 'Publish'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CreateFundraiserComponent;
