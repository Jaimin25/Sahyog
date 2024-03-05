import { Button, Input, InputGroup, Select, Skeleton, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

const FundraiserFormOne = ({
  setError,
  zipCode,
  setZipCode,
  fundraiserFor,
  fundraiserCity,
  fundraiserState,
  beneficiaryName,
  setFundraiserFor,
  setBeneficiaryName,
  setFundraiserCity,
  setFundraiserState,
  isFetching,
}) => {
  const [checkingLoc, setCheckingLoc] = useState(false);
  const handleCheckZipCode = async () => {
    setCheckingLoc(true);
    setError(null);
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
      const resData = res.data;
      setCheckingLoc(false);
      if (resData[0].Status === 'Success') {
        const city = resData[0].PostOffice[0].District;
        const state = resData[0].PostOffice[0].State;

        setFundraiserCity(city);
        setFundraiserState(state);
      } else {
        setFundraiserCity('');
        setFundraiserState('');
        setError(resData[0].Message);
      }
    } catch (e) {
      setError(e.message);
      setCheckingLoc(false);
    }
  };
  return (
    <Stack className="fundraiser-form-for">
      <Text fontWeight="semibold">Enter Zip code</Text>
      {isFetching ? (
        <Skeleton>
          <Input />
        </Skeleton>
      ) : (
        <InputGroup gap="4px">
          <Input
            placeholder="Enter zip code"
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <Button colorScheme="teal" variant="ghost" onClick={handleCheckZipCode} isLoading={checkingLoc}>
            Save
          </Button>
        </InputGroup>
      )}
      <Text fontWeight="semibold">Who you are creating this fundraiser for?</Text>
      {isFetching ? (
        <Skeleton>
          <Select />
        </Skeleton>
      ) : (
        <Select
          placeholder="None"
          onChange={(e) => setFundraiserFor(e.target.value.trim())}
          value={fundraiserFor}
          defaultValue={fundraiserFor && fundraiserFor}
          isDisabled={isFetching || !fundraiserCity || !fundraiserState}
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
          <Text fontWeight="semibold">Beneficiary Name</Text>
          <Input
            placeholder="Beneficiary name"
            value={beneficiaryName}
            onChange={(e) => setBeneficiaryName(e.target.value)}
          />
        </>
      )}
    </Stack>
  );
};

export default FundraiserFormOne;
