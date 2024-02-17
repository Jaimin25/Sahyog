import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Stack,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    Text,
    useSteps,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

import {
    baseapiurl,
    checkForImage,
    getYtVideoId,
} from '../../../lib/utils';
import { useSession } from '../../providers/session-provider';
import FundraiserFormFour from './forms/fundraiser-form-four';
import FundraiserFormOne from './forms/fundraiser-form-one';
import { FundraiserFormPublish } from './forms/fundraiser-form-publish';
import FundraiserFormThree from './forms/fundraiser-form-three';
import FundraiserFormTwo from './forms/fundraiser-form-two';

const steps = [{}, {}, {}, {}, {}];
const CreateFundraiserComponent = () => {
    const { accessToken, user } = useSession();

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [fundraiserFor, setFundraiserFor] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [fundraiserCause, setFundraiserCause] = useState('');
    const [fundraiserGoal, setFundraiserGoal] = useState('');
    const [fundraiserTitle, setFundraiserTitle] = useState('');
    const [fundraiserStory, setFundraiserStory] = useState('');
    const [coverMediaUrl, setCoverMediaUrl] = useState('');

    const handleSaveFundraiser = async () => {
        setLoading(true);
        setError(null);
        const updatedCoverMediaUrl = checkForImage(coverMediaUrl)
            ? coverMediaUrl
            : `https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`;

        const res = await axios.post(
            `${baseapiurl}/api/saveFundraiser`,
            {
                access_token: accessToken,
                uid: user.id,
                fundraiserTitle,
                fundraiserStory,
                fundraiserFor,
                beneficiaryName,
                fundraiserCause,
                fundraiserGoal,
                coverMediaUrl: updatedCoverMediaUrl,
            }
        );

        if (res.data.statusCode === 200) {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            }
        } else {
            setError(res.data.message);
            setLoading(false);
        }
        setLoading(false);
    };

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
                    <div className="block md:hidden">
                        {activeStep + 1} of {steps.length}
                    </div>
                </CardHeader>
                <CardBody overflowY="auto" height="10px">
                    <Stack>
                        {error && (
                            <Text color="red">{error}</Text>
                        )}
                        {activeStep === 0 ? (
                            <FundraiserFormOne
                                fundraiserFor={fundraiserFor}
                                beneficiaryName={beneficiaryName}
                                setFundraiserFor={
                                    setFundraiserFor
                                }
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
                                setFundraiserGoal={
                                    setFundraiserGoal
                                }
                            />
                        ) : activeStep === 2 ? (
                            <FundraiserFormThree
                                coverMediaUrl={coverMediaUrl}
                                setCoverMediaUrl={
                                    setCoverMediaUrl
                                }
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
                                    fundraiserCause={
                                        fundraiserCause
                                    }
                                    fundraiserGoal={
                                        fundraiserGoal
                                    }
                                    fundraiserTitle={
                                        fundraiserTitle
                                    }
                                    fundraiserStory={
                                        fundraiserStory
                                    }
                                />
                            )
                        )}
                    </Stack>
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
                    {activeStep !== steps.length - 1 ? (
                        <Button
                            colorScheme="teal"
                            onClick={() => {
                                handleSaveFundraiser();
                            }}
                            isLoading={loading}
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
                            Continue
                        </Button>
                    ) : (
                        <Button
                            colorScheme="teal"
                            onClick={() =>
                                console.log('publish')
                            }
                        >
                            Publish
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default CreateFundraiserComponent;
