import {
    Card,
    CardBody,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

import DiscoverFundraiserPage from '../../components/fundraisers/discover/discord-fundraiser-page';
import { capitalizeString } from '../../lib/utils';

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

const DiscoverFundraisersPage = () => {
    const [categoryFilter, setCategoryFilter] = useState('all');
    return (
        <div className="space-y-4 bg-teal-500 px-4 py-8 sm:px-10 md:px-14">
            <Card>
                <CardBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftAddon>
                                <Search />
                            </InputLeftAddon>
                            <Input placeholder="Search for fundraiser" />
                        </InputGroup>
                        <HStack width="100%">
                            <HStack>
                                <Text>Filter by category</Text>
                                Filter by category
                                <Select
                                    placeholder="All"
                                    value={categoryFilter}
                                    onChange={(e) =>
                                        setCategoryFilter(
                                            e.target.value
                                        )
                                    }
                                >
                                    {categories.map(
                                        (category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {capitalizeString(
                                                    category
                                                )}
                                            </option>
                                        )
                                    )}
                                </Select>
                            </HStack>
                        </HStack>
                    </VStack>
                </CardBody>
            </Card>
            <DiscoverFundraiserPage
                categoryFilter={categoryFilter}
            />
        </div>
    );
};

export default DiscoverFundraisersPage;
