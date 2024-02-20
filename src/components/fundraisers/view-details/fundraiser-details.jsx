import FundraiserDetailsSection from './sections/fundraiser-details-section';
import FundraiserDonationSection from './sections/fundraiser-donation-section';

const FundraiserDetails = ({
    fundraiser,
    isFetchingFundraiser,
}) => {
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
