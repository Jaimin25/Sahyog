import { Button, CardFooter, Skeleton } from '@chakra-ui/react';

const CardFundraiserFooter = ({
  activeStep,
  setActiveStep,
  deleteDraft,
  loading,
  deleting,
  isFetching,
  fundraiserFor,
  beneficiaryName,
  fundraiserCause,
  fundraiserGoal,
  coverMediaUrl,
  fundraiserTitle,
  fundraiserStory,
  fundraiserCity,
  fundraiserState,
  handleSubmitFormOne,
  handleSubmitFormTwo,
  handleSubmitFormThree,
  handleSubmitFormFour,
  publishFundraiser,
  draftFundraiser,
}) => {
  return (
    <CardFooter gap="4px">
      <div className="flex-1">
        <Button
          onClick={() => activeStep >= 1 && setActiveStep(activeStep - 1)}
          isDisabled={activeStep === 0 || deleting || loading}
        >
          Previous
        </Button>
      </div>
      {draftFundraiser && (draftFundraiser.status === 'review' || draftFundraiser.status === 'draft') && (
        <Button
          colorScheme="red"
          variant="ghost"
          onClick={() => {
            deleteDraft();
          }}
          isLoading={deleting}
          isDisabled={loading}
        >
          Discard
        </Button>
      )}

      {activeStep === 0 &&
        (isFetching ? (
          <Skeleton>
            <Button>Continue</Button>
          </Skeleton>
        ) : (
          <Button
            colorScheme="teal"
            onClick={() => {
              handleSubmitFormOne();
            }}
            isLoading={loading}
            isDisabled={
              fundraiserFor === 'myself'
                ? !fundraiserFor || !fundraiserCity || !fundraiserState
                : !beneficiaryName || !fundraiserFor || !fundraiserCity || !fundraiserState || isFetching || deleting
            }
          >
            Continue
          </Button>
        ))}

      {activeStep === 1 && (
        <Button
          colorScheme="teal"
          onClick={() => handleSubmitFormTwo()}
          isLoading={loading}
          isDisabled={!fundraiserCause || !fundraiserGoal || deleting}
        >
          Continue
        </Button>
      )}
      {activeStep === 2 && (
        <Button
          colorScheme="teal"
          onClick={() => handleSubmitFormThree()}
          isLoading={loading}
          isDisabled={!coverMediaUrl || deleting}
        >
          Continue
        </Button>
      )}
      {activeStep === 3 && (
        <Button
          colorScheme="teal"
          onClick={() => handleSubmitFormFour()}
          isLoading={loading}
          isDisabled={!fundraiserTitle || !fundraiserStory || deleting}
        >
          Review
        </Button>
      )}
      {activeStep === 4 && (
        <Button
          colorScheme="teal"
          isLoading={loading}
          onClick={() => publishFundraiser()}
          isDisabled={loading || deleting}
        >
          Publish
        </Button>
      )}
    </CardFooter>
  );
};

export default CardFundraiserFooter;
