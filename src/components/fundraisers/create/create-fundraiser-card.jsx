import { Badge, Card, CardBody, CardHeader, Heading, useSteps } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { baseapiurl, checkForImage, deCapitalizeString, getYtVideoId } from '../../../lib/utils.js';
import { useSession } from '../../providers/session-provider.jsx';
import CardFundraiserFooter from './forms/card-content/card-fundraiser-footer.jsx';
import CardFundraiserForms from './forms/card-content/card-fundraisers-forms.jsx';
import FundraiserCardStepper from './fundraiser-card-stepper.jsx';

const steps = [{}, {}, {}, {}, {}];
const CreateFundraiserComponent = ({ draftFundraiser, setDraftFundraiser, isFetching }) => {
  const { accessToken, user } = useSession();
  const navigate = useNavigate();

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
  const [fundraiserCity, setFundraiserCity] = useState('');
  const [fundraiserState, setFundraiserState] = useState('');

  const [zipCode, setZipCode] = useState();

  useEffect(() => {
    if (!draftFundraiser) return;
    setFundraiserFor(draftFundraiser.fundraiserFor);
    setBeneficiaryName(draftFundraiser.beneficiaryName);
    setFundraiserCause(draftFundraiser.fundraiserCause);
    setFundraiserGoal(draftFundraiser.fundraiserGoal);
    setFundraiserTitle(draftFundraiser.fundraiserTitle);
    setFundraiserStory(draftFundraiser.fundraiserStory);
    setFundraiserCity(draftFundraiser.fundraiserCity);
    setFundraiserState(draftFundraiser.fundraiserState);
    setZipCode(draftFundraiser.zipCode);
    setCoverMediaUrl(draftFundraiser.coverMediaUrl);

    if (draftFundraiser.status === 'review') {
      setActiveStep(4);
    }
  }, [draftFundraiser]);

  const deleteDraft = async () => {
    setDeleting(true);
    setError(null);
    const res = await axios.post(`${baseapiurl}/api/user/deleteDraftFundraiser`, {
      uid: user.id,
      access_token: accessToken,
      fundraiserId: draftFundraiser._id,
    });
    const resData = res.data;
    if (resData.statusCode === 200) {
      setDraftFundraiser(null);
      setFundraiserFor('');
      setBeneficiaryName('');
      setFundraiserCause('');
      setFundraiserGoal('');
      setFundraiserTitle('');
      setFundraiserStory('');
      setFundraiserCity('');
      setFundraiserState('');
      setCoverMediaUrl('');
      setZipCode('');
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
    const nFundraiserCause = deCapitalizeString(fundraiserCause);
    const nFundraiserFor = deCapitalizeString(fundraiserFor);
    const res = await axios.post(`${baseapiurl}/api/fundraiser/saveFundraiser`, {
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
      fundraiserCity,
      fundraiserState,
      zipCode,
      coverMediaUrl: updatedCoverMediaUrl,
      status,
    });

    const resData = res.data;

    if (resData.statusCode === 200 && resData.fundraiser.status !== 'active') {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      }
      setLoading(false);
      setDraftFundraiser(resData.fundraiser);
    } else if (resData.fundraiser.status === 'active') {
      setDraftFundraiser(null);
      navigate(`/fundraiser/${resData.fundraiser._id}/manage`);
    } else {
      setError(resData.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleSubmitFormOne = async () => {
    if (
      draftFundraiser &&
      draftFundraiser.zipCode === zipCode &&
      draftFundraiser.fundraiserCity === fundraiserCity &&
      draftFundraiser.fundraiserState === fundraiserState &&
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
    submitForm(draftFundraiser ? draftFundraiser.status : 'draft');
  };

  const handleSubmitFormTwo = async () => {
    if (
      draftFundraiser &&
      draftFundraiser.fundraiserCause === fundraiserCause &&
      draftFundraiser.fundraiserGoal === fundraiserGoal
    ) {
      if (Number(fundraiserGoal) >= 10000) {
        if (activeStep < steps.length - 1) {
          setActiveStep(activeStep + 1);
        }
      } else {
        setError('Fundraiser goal should be greater than 10000');
      }
      return;
    }
    if (Number(fundraiserGoal) >= 10000) {
      setLoading(true);
      setError(null);
      submitForm(draftFundraiser ? draftFundraiser.status : 'draft');
    } else {
      setError('Minimum goal should be ₹10,000');
    }
  };

  const handleSubmitFormThree = async () => {
    if (draftFundraiser && draftFundraiser.coverMediaUrl === coverMediaUrl) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      }
      return;
    }
    setLoading(true);
    setError(null);
    submitForm(draftFundraiser ? draftFundraiser.status : 'draft');
  };

  const handleSubmitFormFour = async () => {
    if (
      draftFundraiser &&
      draftFundraiser.fundraiserTitle === fundraiserTitle &&
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
    <div className="flex h-full w-auto flex-col items-center justify-center gap-2">
      <div className="hidden w-full justify-center lg:flex">
        <Card className="lg:w-1/2">
          <FundraiserCardStepper activeStep={activeStep} steps={steps} />
        </Card>
      </div>
      <Card className="w-[99%] sm:w-4/5 lg:w-1/2">
        <CardHeader>
          {draftFundraiser && (draftFundraiser.status === 'review' || draftFundraiser.status === 'draft') && (
            <div className="flex items-center">
              <div className="flex-1">
                <Badge colorScheme="red">Draft</Badge>
              </div>
            </div>
          )}
          <Heading size="lg">Create a Fundraiser </Heading>
          <div className="block lg:hidden">
            {activeStep + 1} of {steps.length}
          </div>
        </CardHeader>
        <CardBody>
          <CardFundraiserForms
            error={error}
            setError={setError}
            zipCode={zipCode}
            setZipCode={setZipCode}
            activeStep={activeStep}
            isFetching={isFetching}
            fundraiserFor={fundraiserFor}
            fundraiserCity={fundraiserCity}
            fundraiserState={fundraiserState}
            beneficiaryName={beneficiaryName}
            fundraiserCause={fundraiserCause}
            fundraiserGoal={fundraiserGoal}
            fundraiserStory={fundraiserStory}
            fundraiserTitle={fundraiserTitle}
            coverMediaUrl={coverMediaUrl}
            setFundraiserFor={setFundraiserFor}
            setBeneficiaryName={setBeneficiaryName}
            setFundraiserCity={setFundraiserCity}
            setFundraiserState={setFundraiserState}
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
          fundraiserCity={fundraiserCity}
          fundraiserState={fundraiserState}
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
