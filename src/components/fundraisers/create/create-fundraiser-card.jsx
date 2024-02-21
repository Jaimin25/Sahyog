import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Heading,
    useSteps,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
    baseapiurl,
    checkForImage,
    deCapitalizeString,
    getYtVideoId,
} from '../../../lib/utils.js';
import { useSession } from '../../providers/session-provider.jsx';
import CardFundraiserFooter from './forms/card-content/card-fundraiser-footer.jsx';
import CardFundraiserForms from './forms/card-content/card-fundraisers-forms.jsx';
import FundraiserCardStepper from './fundraiser-card-stepper.jsx';

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
    const [deleting, setDeleting] = useState(false);
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

    const deleteDraft = async () => {
        setDeleting(true);
        setError(null);
        const res = await axios.post(
            `${baseapiurl}/api/user/deleteDraftFundraiser`,
            {
                uid: user.id,
                access_token: accessToken,
                fundraiserId: draftFundraiser._id,
            }
        );
        const resData = res.data;
        if (resData.statusCode === 200) {
            setDraftFundraiser(null);
            setFundraiserFor('');
            setBeneficiaryName('');
            setFundraiserCause('');
            setFundraiserGoal('');
            setFundraiserTitle('');
            setFundraiserStory('');
            setCoverMediaUrl('');
            setActiveStep(0);
            setDeleting(false);
        } else {
            setError(resData.message);
            setDeleting(false);
        }
        setDeleting(false);
    };
    const submitForm = async (status) => {
        const updatedCoverMediaUrl = coverMediaUrl
            ? checkForImage(coverMediaUrl)
                ? coverMediaUrl
                : `https://www.youtube.com/embed/${getYtVideoId(coverMediaUrl)}`
            : '';
        const nFundraiserCause =
            deCapitalizeString(fundraiserCause);
        const nFundraiserFor = deCapitalizeString(fundraiserFor);
        const res = await axios.post(
            `${baseapiurl}/api/fundraiser/saveFundraiser`,
            {
                access_token: accessToken,
                uid: user.id,
                creatorName: user.fullname,
                profilePicUrl: user.profilePicUrl,
                fundraiserTitle,
                fundraiserStory,
                fundraiserFor: nFundraiserFor,
                beneficiaryName,
                fundraiserCause: nFundraiserCause,
                fundraiserGoal,
                coverMediaUrl: updatedCoverMediaUrl,
                status,
            }
        );

        const resData = res.data;

        if (
            resData.statusCode === 200 &&
            resData.fundraiser.status !== 'active'
        ) {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            }
            setLoading(false);
            setDraftFundraiser(resData.fundraiser);
        } else {
            setError(resData.message);
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
        submitForm('review');
    };

    const publishFundraiser = async () => {
        setLoading(true);
        setError(null);
        submitForm('active');
    };

    return (
        <div className="flex h-full w-auto flex-col items-center justify-center gap-2 bg-black/5 p-2">
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
                    {draftFundraiser &&
                        (draftFundraiser.status === 'review' ||
                            draftFundraiser.status ===
                                'draft') && (
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <Badge colorScheme="red">
                                        Draft
                                    </Badge>
                                </div>
                            </div>
                        )}
                    <Heading size="lg">
                        Create a Fundraiser{' '}
                    </Heading>
                    <div className="block md:hidden">
                        {activeStep + 1} of {steps.length}
                    </div>
                </CardHeader>
                <CardBody>
                    <CardFundraiserForms
                        error={error}
                        activeStep={activeStep}
                        isFetching={isFetching}
                        fundraiserFor={fundraiserFor}
                        beneficiaryName={beneficiaryName}
                        fundraiserCause={fundraiserCause}
                        fundraiserGoal={fundraiserGoal}
                        fundraiserStory={fundraiserStory}
                        fundraiserTitle={fundraiserTitle}
                        coverMediaUrl={coverMediaUrl}
                        setFundraiserFor={setFundraiserFor}
                        setBeneficiaryName={setBeneficiaryName}
                        setFundraiserCause={setFundraiserCause}
                        setFundraiserGoal={setFundraiserGoal}
                        setFundraiserStory={setFundraiserStory}
                        setFundraiserTitle={setFundraiserTitle}
                        setCoverMediaUrl={setCoverMediaUrl}
                        setActiveStep={setActiveStep}
                    />
                </CardBody>
                <CardFundraiserFooter
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    deleteDraft={deleteDraft}
                    loading={loading}
                    deleting={deleting}
                    isFetching={isFetching}
                    fundraiserFor={fundraiserFor}
                    beneficiaryName={beneficiaryName}
                    fundraiserCause={fundraiserCause}
                    fundraiserGoal={fundraiserGoal}
                    coverMediaUrl={coverMediaUrl}
                    fundraiserTitle={fundraiserTitle}
                    fundraiserStory={fundraiserStory}
                    handleSubmitFormOne={handleSubmitFormOne}
                    handleSubmitFormTwo={handleSubmitFormTwo}
                    handleSubmitFormThree={handleSubmitFormThree}
                    handleSubmitFormFour={handleSubmitFormFour}
                    publishFundraiser={publishFundraiser}
                    draftFundraiser={draftFundraiser}
                />
            </Card>
        </div>
    );
};

export default CreateFundraiserComponent;
