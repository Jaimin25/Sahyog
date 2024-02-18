import { Skeleton } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { baseapiurl } from '../../lib/utils';
import FundriaserCard from '../cards/fundrasiersCard';

const FundraiserDiscoverSection = () => {
    const [fundraisers, setFundraisers] = useState([]);

    const fetchAllFundraisers = async () => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/getAllFundraisers`
            );
            setFundraisers(res.data.allFundraisers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllFundraisers();
    }, []);

    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {fundraisers && !fundraisers.length > 0 ? (
                <>
                    <Skeleton>
                        <FundriaserCard
                            fundraiserTitle="Fundraiser Title"
                            fundraiserStory="Fundraiser Story"
                            fundraiserGoal={0}
                            amountRaised={0}
                            coverMediaUrl="https://media.freshbooks.com/wp-content/uploads/2021/11/how-does-crowdfunding-work.jpg"
                        />
                    </Skeleton>
                    <Skeleton>
                        <FundriaserCard
                            fundraiserTitle="Fundraiser Title"
                            fundraiserStory="Fundraiser Story"
                            fundraiserGoal={0}
                            amountRaised={0}
                            coverMediaUrl="https://media.freshbooks.com/wp-content/uploads/2021/11/how-does-crowdfunding-work.jpg"
                        />
                    </Skeleton>
                    <Skeleton>
                        <FundriaserCard
                            fundraiserTitle="Fundraiser Title"
                            fundraiserStory="Fundraiser Story"
                            fundraiserGoal={0}
                            amountRaised={0}
                            coverMediaUrl="https://media.freshbooks.com/wp-content/uploads/2021/11/how-does-crowdfunding-work.jpg"
                        />
                    </Skeleton>
                </>
            ) : (
                fundraisers.length > 0 &&
                fundraisers.map((fundraiser) => (
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
                        creatorName={fundraiser.creatorName}
                        profilePicUrl={fundraiser.profilePicUrl}
                        amountRaised={fundraiser.amountRaised}
                        coverMediaUrl={fundraiser.coverMediaUrl}
                    />
                ))
            )}
        </div>
    );
};

export default FundraiserDiscoverSection;
