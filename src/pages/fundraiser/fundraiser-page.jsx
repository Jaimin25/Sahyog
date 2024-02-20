import {
    Box,
    Card,
    CardBody,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

import DiscoverFundraiser from '../../components/fundraisers/discover/discover-fundraiser';
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
    const [searchFilter, setSearchFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [uploadedFilter, setUploadedFilter] = useState('all');
    return (
        <div className="space-y-4 bg-teal-500 px-4 py-8 sm:px-10 md:px-14">
            <Card>
                <CardBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftAddon>
                                <Search />
                            </InputLeftAddon>
                            <Input
                                placeholder="Search for fundraiser"
                                value={searchFilter}
                                onChange={(e) =>
                                    setSearchFilter(
                                        e.target.value
                                    )
                                }
                            />
                        </InputGroup>
                        <div className="flex w-full flex-col items-center gap-3 md:flex-row">
                            <Flex alignItems="center" gap="8px">
                                <Box>
                                    <Text>
                                        Filter by category
                                    </Text>
                                </Box>
                                <Box>
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
                                                    key={
                                                        category
                                                    }
                                                    value={
                                                        category
                                                    }
                                                >
                                                    {capitalizeString(
                                                        category
                                                    )}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                </Box>
                            </Flex>
                            <Flex alignItems="center" gap="8px">
                                <Box>
                                    <Text>
                                        Filter by uploaded
                                    </Text>
                                </Box>
                                <Box>
                                    <Select
                                        value={uploadedFilter}
                                        onChange={(e) =>
                                            setUploadedFilter(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="newest">
                                            Newest
                                        </option>
                                        <option value="oldest">
                                            Oldest
                                        </option>
                                    </Select>
                                </Box>
                            </Flex>
                        </div>
                    </VStack>
                </CardBody>
            </Card>
            <DiscoverFundraiser
                categoryFilter={categoryFilter}
                uploadedFilter={uploadedFilter}
                searchFilter={searchFilter}
            />
        </div>
    );
};

export default DiscoverFundraisersPage;
