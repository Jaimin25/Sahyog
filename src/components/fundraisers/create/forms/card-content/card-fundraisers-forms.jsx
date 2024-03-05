import { Stack, Text } from '@chakra-ui/react';

import FundraiserFormFour from '../fundraiser-form-four';
import FundraiserFormOne from '../fundraiser-form-one';
import FundraiserFormPublish from '../fundraiser-form-publish';
import FundraiserFormThree from '../fundraiser-form-three';
import FundraiserFormTwo from '../fundraiser-form-two';

const CardFundraiserForms = ({
  error,
  activeStep,
  zipCode,
  setZipCode,
  isFetching,
  fundraiserFor,
  fundraiserCause,
  beneficiaryName,
  fundraiserCity,
  fundraiserState,
  fundraiserGoal,
  fundraiserStory,
  fundraiserTitle,
  coverMediaUrl,
  setFundraiserFor,
  setBeneficiaryName,
  setFundraiserCity,
  setFundraiserState,
  setFundraiserCause,
  setFundraiserGoal,
  setFundraiserStory,
  setFundraiserTitle,
  setCoverMediaUrl,
  setActiveStep,
  setError,
}) => {
  return (
    <Stack>
      {error && <Text color="red">{error}</Text>}
      {activeStep === 0 ? (
        <FundraiserFormOne
          setError={setError}
          isFetching={isFetching}
          zipCode={zipCode}
          setZipCode={setZipCode}
          fundraiserFor={fundraiserFor}
          beneficiaryName={beneficiaryName}
          fundraiserCity={fundraiserCity}
          fundraiserState={fundraiserState}
          setFundraiserFor={setFundraiserFor}
          setFundraiserCity={setFundraiserCity}
          setFundraiserState={setFundraiserState}
          setBeneficiaryName={setBeneficiaryName}
        />
      ) : activeStep === 1 ? (
        <FundraiserFormTwo
          fundraiserCause={fundraiserCause}
          fundraiserGoal={fundraiserGoal}
          setFundraiserCause={setFundraiserCause}
          setFundraiserGoal={setFundraiserGoal}
        />
      ) : activeStep === 2 ? (
        <FundraiserFormThree coverMediaUrl={coverMediaUrl} setCoverMediaUrl={setCoverMediaUrl} />
      ) : activeStep === 3 ? (
        <FundraiserFormFour
          fundraiserTitle={fundraiserTitle}
          fundraiserStory={fundraiserStory}
          setFundraiserTitle={setFundraiserTitle}
          setFundraiserStory={setFundraiserStory}
        />
      ) : (
        activeStep === 4 && (
          <FundraiserFormPublish
            setActiveStep={setActiveStep}
            coverMediaUrl={coverMediaUrl}
            fundraiserCause={fundraiserCause}
            fundraiserGoal={fundraiserGoal}
            fundraiserCity={fundraiserCity}
            fundraiserState={fundraiserState}
            fundraiserTitle={fundraiserTitle}
            fundraiserStory={fundraiserStory}
          />
        )
      )}
    </Stack>
  );
};

export default CardFundraiserForms;
