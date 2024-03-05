import { Input, InputGroup, InputLeftAddon, Select, Stack, Text } from '@chakra-ui/react';
import { IndianRupee } from 'lucide-react';

import { capitalizeString, deCapitalizeString } from '../../../../lib/utils';

const categories = [
  'animals',
  'business',
  'community',
  'creative',
  'education',
  'emergency',
  'environment',
  'events',
  'medical',
  'other',
  'sports',
  'volunteer',
  'wishes',
];

const FundraiserFormTwo = ({ fundraiserCause, fundraiserGoal, setFundraiserCause, setFundraiserGoal }) => {
  return (
    <Stack className="fundraiser-form-category-goal">
      <Text fontWeight="semibold">What best describes why you&apos;re fundraising?</Text>
      <Select
        placeholder="None"
        defaultValue={fundraiserCause}
        value={deCapitalizeString(fundraiserCause)}
        onChange={(e) => setFundraiserCause(capitalizeString(e.target.value))}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </Select>
      <Text fontWeight="semibold">How much would you like to raise?</Text>
      <InputGroup>
        <InputLeftAddon>
          <IndianRupee className="h-4 w-4" />
        </InputLeftAddon>
        <Input
          type="number"
          placeholder="Amount"
          value={fundraiserGoal}
          onChange={(e) => setFundraiserGoal(e.target.value)}
          isDisabled={!fundraiserCause}
        />
      </InputGroup>
    </Stack>
  );
};

export default FundraiserFormTwo;
