import {
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Stack,
    Text,
} from '@chakra-ui/react';
import { IndianRupee } from 'lucide-react';

const FundraiserFormTwo = ({
    fundraiserCause,
    fundraiserGoal,
    setFundraiserCause,
    setFundraiserGoal,
}) => {
    return (
        <Stack>
            <Text fontWeight="semibold">
                What best describes why you&apos;re fundraising?
            </Text>
            <Select
                placeholder="None"
                defaultValue={fundraiserCause}
                value={fundraiserCause}
                onChange={(e) =>
                    setFundraiserCause(e.target.value)
                }
            >
                <option value="animals">Animals</option>
                <option value="business">Business</option>
                <option value="community">Community</option>
                <option value="creative">Creative</option>
                <option value="education">Education</option>
                <option value="emergency">Emergency</option>
                <option value="environment">Environment</option>
                <option value="events">Events</option>
                <option value="medical">Medical</option>
                <option value="other">Other</option>
                <option value="sports">Sports</option>
                <option value="volunteer">Volunteer</option>
                <option value="wishes">Wishes</option>
            </Select>
            <Text fontWeight="semibold">
                How much would you like to raise?
            </Text>
            <InputGroup>
                <InputLeftAddon>
                    <IndianRupee className="h-4 w-4" />
                </InputLeftAddon>
                <Input
                    type="number"
                    placeholder="Amount"
                    value={fundraiserGoal}
                    onChange={(e) =>
                        setFundraiserGoal(e.target.value)
                    }
                    isDisabled={!fundraiserCause}
                />
            </InputGroup>
        </Stack>
    );
};

export default FundraiserFormTwo;
