import { Stack, Text } from '@chakra-ui/react';

import FundraiserFormFour from '../fundraiser-form-four';
import FundraiserFormOne from '../fundraiser-form-one';
import FundraiserFormPublish from '../fundraiser-form-publish';
import FundraiserFormThree from '../fundraiser-form-three';
import FundraiserFormTwo from '../fundraiser-form-two';

const CardFundraiserForms = ({
    error,
    activeStep,
    isFetching,
    fundraiserFor,
    fundraiserCause,
    beneficiaryName,
    fundraiserGoal,
    fundraiserStory,
    fundraiserTitle,
    coverMediaUrl,
    setFundraiserFor,
    setBeneficiaryName,
    setFundraiserCause,
    setFundraiserGoal,
    setFundraiserStory,
    setFundraiserTitle,
    setCoverMediaUrl,
    setActiveStep,
}) => {
    return (
        <Stack>
            {error && <Text color="red">{error}</Text>}
            {activeStep === 0 ? (
                <FundraiserFormOne
                    isFetching={isFetching}
                    fundraiserFor={fundraiserFor}
                    beneficiaryName={beneficiaryName}
                    setFundraiserFor={setFundraiserFor}
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
                <FundraiserFormThree
                    coverMediaUrl={coverMediaUrl}
                    setCoverMediaUrl={setCoverMediaUrl}
                />
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
                        fundraiserTitle={fundraiserTitle}
                        fundraiserStory={fundraiserStory}
                    />
                )
            )}
        </Stack>
    );
};

export default CardFundraiserForms;
