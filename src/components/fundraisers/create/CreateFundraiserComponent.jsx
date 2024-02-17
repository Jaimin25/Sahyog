import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Stack,
    Text,
    useSteps,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
import FundraiserCardStepper from './fundraiser-card-stepper';

const steps = [{}, {}, {}, {}, {}];
const CreateFundraiserComponent = ({
    draftFundraiser,
    setDraftFundraiser,
    isFetching,
}) => {
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

    useEffect(() => {
        if (!draftFundraiser) return;
        setFundraiserFor(draftFundraiser.fundraiserFor);
        setBeneficiaryName(draftFundraiser.beneficiaryName);
        setFundraiserCause(draftFundraiser.fundraiserCause);
        setFundraiserGoal(draftFundraiser.fundraiserGoal);
        setFundraiserTitle(draftFundraiser.fundraiserTitle);
        setFundraiserStory(draftFundraiser.fundraiserStory);
        setCoverMediaUrl(draftFundraiser.coverMediaUrl);

        if (draftFundraiser.status === 'review') {
            setActiveStep(4);
        }
    }, [draftFundraiser]);

    const submitForm = async (status) => {
        const updatedCoverMediaUrl = coverMediaUrl
            ? checkForImage(coverMediaUrl)
                ? coverMediaUrl
                : `https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`
            : '';

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
                status,
            }
        );

        if (
            res.data.statusCode === 200 &&
            res.data.fundraiser.status !== 'active'
        ) {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            }
            setLoading(false);
            setDraftFundraiser(res.data.fundraiser);
        } else {
            setError(res.data.message);
            setLoading(false);
        }
        setLoading(false);
    };

    const handleSubmitFormOne = async () => {
        if (
            draftFundraiser &&
            draftFundraiser.fundraiserFor === fundraiserFor &&
            draftFundraiser.beneficiaryName === beneficiaryName
        ) {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            }
            return;
        }
        setLoading(true);
        setError(null);
        submitForm(
            draftFundraiser ? draftFundraiser.status : 'draft'
        );
    };

    const handleSubmitFormTwo = async () => {
        if (
            draftFundraiser &&
            draftFundraiser.fundraiserCause ===
                fundraiserCause &&
            draftFundraiser.fundraiserGoal === fundraiserGoal
        ) {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            }
            return;
        }
        setLoading(true);
        setError(null);
        submitForm(
            draftFundraiser ? draftFundraiser.status : 'draft'
        );
    };

    const handleSubmitFormThree = async () => {
        if (
            draftFundraiser &&
            draftFundraiser.coverMediaUrl === coverMediaUrl
        ) {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            }
            return;
        }
        setLoading(true);
        setError(null);
        submitForm(
            draftFundraiser ? draftFundraiser.status : 'draft'
        );
    };

    const handleSubmitFormFour = async () => {
        if (
            draftFundraiser &&
            draftFundraiser.fundraiserTitle ===
                fundraiserTitle &&
            draftFundraiser.fundraiserStory === fundraiserStory
        ) {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            }
            return;
        }
        setLoading(true);
        setError(null);
        submitForm(
            draftFundraiser ? draftFundraiser.status : 'review'
        );
    };

    const publishFundraiser = async () => {
        setLoading(true);
        setError(null);
        submitForm('active');
    };

    return (
        <div className="flex h-full w-auto flex-col items-center justify-center gap-2 bg-teal-500 p-2">
            <div className="hidden w-full justify-center md:flex">
                <Card className="md:w-1/2">
                    <FundraiserCardStepper
                        activeStep={activeStep}
                        steps={steps}
                    />
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
                                isFetching={isFetching}
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
                                    setActiveStep={setActiveStep}
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

                    {activeStep === 0 && (
                        <Button
                            colorScheme="teal"
                            onClick={() => {
                                handleSubmitFormOne();
                            }}
                            isLoading={loading}
                            isDisabled={
                                fundraiserFor === 'myself'
                                    ? !fundraiserFor
                                    : !beneficiaryName ||
                                      !fundraiserFor ||
                                      isFetching
                            }
                        >
                            Continue
                        </Button>
                    )}
                    {activeStep === 1 && (
                        <Button
                            colorScheme="teal"
                            onClick={() => handleSubmitFormTwo()}
                            isLoading={loading}
                            isDisabled={
                                !fundraiserCause ||
                                !fundraiserGoal
                            }
                        >
                            Continue
                        </Button>
                    )}
                    {activeStep === 2 && (
                        <Button
                            colorScheme="teal"
                            onClick={() =>
                                handleSubmitFormThree()
                            }
                            isLoading={loading}
                            isDisabled={!coverMediaUrl}
                        >
                            Continue
                        </Button>
                    )}
                    {activeStep === 3 && (
                        <Button
                            colorScheme="teal"
                            onClick={() =>
                                handleSubmitFormFour()
                            }
                            isLoading={loading}
                            isDisabled={
                                !fundraiserTitle ||
                                !fundraiserStory
                            }
                        >
                            Review
                        </Button>
                    )}
                    {activeStep === 4 && (
                        <Button
                            colorScheme="teal"
                            isLoading={loading}
                            onClick={() => publishFundraiser()}
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
