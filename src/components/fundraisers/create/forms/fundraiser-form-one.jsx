import {
    Input,
    Select,
    Skeleton,
    Stack,
    Text,
} from '@chakra-ui/react';

const FundraiserFormOne = ({
    fundraiserFor,
    beneficiaryName,
    setFundraiserFor,
    setBeneficiaryName,
    isFetching,
}) => {
    return (
        <Stack>
            <Text fontWeight="semibold">
                Who you are creating this fundraiser for?
            </Text>
            {isFetching ? (
                <Skeleton>
                    <Select />
                </Skeleton>
            ) : (
                <Select
                    placeholder="None"
                    onChange={(e) =>
                        setFundraiserFor(e.target.value.trim())
                    }
                    value={fundraiserFor}
                    defaultValue={fundraiserFor && fundraiserFor}
                    isDisabled={isFetching}
                >
                    <option value="myself">Myself</option>
                    <option value="family">Family Member</option>
                    <option value="friend">Friend</option>
                    <option value="animal">Pet or Animal</option>
                    <option value="colleague">Colleague</option>
                    <option value="community">Community</option>
                    <option value="other">Other</option>
                </Select>
            )}
            {fundraiserFor && fundraiserFor !== 'myself' && (
                <>
                    <Text fontWeight="semibold">
                        Beneficiary Name
                    </Text>
                    <Input
                        placeholder="Beneficiary name"
                        value={beneficiaryName}
                        onChange={(e) =>
                            setBeneficiaryName(e.target.value)
                        }
                    />
                </>
            )}
        </Stack>
    );
};

export default FundraiserFormOne;
