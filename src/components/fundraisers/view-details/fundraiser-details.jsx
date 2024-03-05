import FundraiserDetailsSkeleton from '../../skeletons/fundraiser-details-skeleton';
import FundraiserDonationSkeleton from '../../skeletons/fundraiser-donations-skeleton';
import FundraiserUpdatesSkeleton from '../../skeletons/fundraiser-updates-skeleton';
import FundraiserDetailsSection from './sections/fundraiser-details-section';
import FundraiserDonationSection from './sections/fundraiser-donation-section';
import FundraiserUpdatesSection from './sections/fundraiser-updates-section';

const FundraiserDetails = ({
  fundraiser,
  isFetchingFundraiser,
  fundraiserUpdates,
  isFetchingFundraiserUpdates,
  isFetchingFundraiserDonations,
  fundraiserDonations,
}) => {
  if (isFetchingFundraiser) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <FundraiserDetailsSkeleton coverMediaUrl="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" />
        <FundraiserDonationSkeleton />
        <FundraiserUpdatesSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <FundraiserDetailsSection fundraiser={fundraiser} isFetchingFundraiser={isFetchingFundraiser} />
      <FundraiserDonationSection
        fundraiser={fundraiser}
        isFetchingFundraiser={isFetchingFundraiserDonations}
        fundraiserDonations={fundraiserDonations}
      />
      <FundraiserUpdatesSection
        fundraiserUpdates={fundraiserUpdates}
        isFetchingFundraiserUpdates={isFetchingFundraiserUpdates}
      />
    </div>
  );
};

export default FundraiserDetails;
