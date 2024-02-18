import FundriaserCard from '../cards/fundrasiersCard';
import { useFundraisers } from '../providers/fundraisers-provider';
import FundriaserCardSkeleton from '../skeleton/fundraiser-card-skeleton';

const FundraiserDiscoverSection = () => {
    const { fundraisers } = useFundraisers();

    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {fundraisers && !fundraisers.length > 0 ? (
                <>
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
