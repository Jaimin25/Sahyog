import FundraiserDetailsSkeleton from '../../skeletons/fundraiser-details-skeleton';
import FundraiserDonationSkeleton from '../../skeletons/fundraiser-donations-skeleton';
import FundraiserDetailsSection from './sections/fundraiser-details-section';
import FundraiserDonationSection from './sections/fundraiser-donation-section';

const FundraiserDetails = ({
    fundraiser,
    isFetchingFundraiser,
}) => {
    if (isFetchingFundraiser)
        return (
            <div className="grid grid-cols-3 gap-4">
                <FundraiserDetailsSkeleton coverMediaUrl="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" />
                <FundraiserDonationSkeleton />
            </div>
        );
    return (
        <div className="grid grid-cols-3 gap-4">
            <FundraiserDetailsSection
                fundraiser={fundraiser}
                isFetchingFundraiser={isFetchingFundraiser}
            />
            <FundraiserDonationSection
                fundraiser={fundraiser}
                isFetchingFundraiser={isFetchingFundraiser}
            />
        </div>
    );
};

export default FundraiserDetails;
