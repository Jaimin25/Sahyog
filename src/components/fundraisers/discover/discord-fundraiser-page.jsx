import { Card, CardBody } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import FundriaserCard from '../../cards/fundrasiersCard';
import { useFundraisers } from '../../providers/fundraisers-provider';
import FundriaserCardSkeleton from '../../skeleton/fundraiser-card-skeleton';

const DiscoverFundraiserPage = ({ categoryFilter }) => {
    const { fundraisers, isFetching } = useFundraisers();

    const [filteredFundraisers, setFilteredFundraisers] =
        useState([]);

    useEffect(() => {
        if (!isFetching) {
            if (categoryFilter === 'all' || !categoryFilter) {
                setFilteredFundraisers(fundraisers);
            } else if (
                fundraisers.some(
                    (fundraiser) =>
                        fundraiser.fundraiserCause ===
                        categoryFilter
                )
            ) {
                setFilteredFundraisers(
                    fundraisers.filter(
                        (fundraiser) =>
                            fundraiser.fundraiserCause ===
                            categoryFilter
                    )
                );
            } else {
                setFilteredFundraisers(null);
            }
        }
    }, [categoryFilter, isFetching]);

    return (
        <>
            <div>
                {isFetching ? (
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <FundriaserCardSkeleton
                            fundraiserTitle="Fundraiser Title"
                            fundraiserStory="Fundraiser Story"
                            fundraiserGoal={0}
                            amountRaised={0}
                            coverMediaUrl="https://media.freshbooks.com/wp-content/uploads/2021/11/how-does-crowdfunding-work.jpg"
                        />
                        <FundriaserCardSkeleton
                            fundraiserTitle="Fundraiser Title"
                            fundraiserStory="Fundraiser Story"
                            fundraiserGoal={0}
                            amountRaised={0}
                            coverMediaUrl="https://media.freshbooks.com/wp-content/uploads/2021/11/how-does-crowdfunding-work.jpg"
                        />
                        <FundriaserCardSkeleton
                            fundraiserTitle="Fundraiser Title"
                            fundraiserStory="Fundraiser Story"
                            fundraiserGoal={0}
                            amountRaised={0}
                            coverMediaUrl="https://media.freshbooks.com/wp-content/uploads/2021/11/how-does-crowdfunding-work.jpg"
                        />
                    </div>
                ) : filteredFundraisers &&
                  filteredFundraisers.length > 0 ? (
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {filteredFundraisers.map(
                            (fundraiser) => (
                                <FundriaserCard
                                    key={fundraiser.id}
                                    fundraiserTitle={
                                        fundraiser.fundraiserTitle
                                    }
                                    fundraiserStory={
                                        fundraiser.fundraiserStory
                                    }
                                    fundraiserGoal={
                                        fundraiser.fundraiserGoal
                                    }
                                    creatorName={
                                        fundraiser.creatorName
                                    }
                                    profilePicUrl={
                                        fundraiser.profilePicUrl
                                    }
                                    amountRaised={
                                        fundraiser.amountRaised
                                    }
                                    coverMediaUrl={
                                        fundraiser.coverMediaUrl
                                    }
                                />
                            )
                        )}
                    </div>
                ) : (
                    filteredFundraisers === null && (
                        <Card width="100%">
                            <CardBody width="100%">
                                <h1>No fundraisers found</h1>
                            </CardBody>
                        </Card>
                    )
                )}
            </div>
        </>
    );
};

export default DiscoverFundraiserPage;
