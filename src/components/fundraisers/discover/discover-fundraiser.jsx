import { Card, CardBody } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import FundriaserCard from '../../cards/fundraisers-card';
import FundriaserCardSkeleton from '../../skeletons/fundraiser-card-skeleton';

const DiscoverFundraiser = ({ categoryFilter, uploadedFilter, searchFilter, fundraisers, isFetching }) => {
  const [filteredFundraisers, setFilteredFundraisers] = useState(
    uploadedFilter === 'oldest'
      ? fundraisers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      : fundraisers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );

  useEffect(() => {
    if (!isFetching) {
      if (categoryFilter === 'all' || !categoryFilter) {
        setFilteredFundraisers(fundraisers);
        if (searchFilter) {
          if (
            fundraisers.some((fundraiser) =>
              fundraiser.fundraiserTitle.toLowerCase().includes(searchFilter.toLowerCase())
            )
          ) {
            setFilteredFundraisers(
              fundraisers.filter((fundraiser) =>
                fundraiser.fundraiserTitle.toLowerCase().includes(searchFilter.toLowerCase())
              )
            );
          } else {
            setFilteredFundraisers(null);
          }
        }
      } else if (
        fundraisers.some((fundraiser) => fundraiser.fundraiserCause.toLowerCase() === categoryFilter.toLowerCase())
      ) {
        if (searchFilter !== '') {
          if (filteredFundraisers) {
            if (
              filteredFundraisers.some((fundraiser) =>
                fundraiser.fundraiserTitle.toLowerCase().includes(searchFilter.toLowerCase())
              )
            ) {
              setFilteredFundraisers(
                filteredFundraisers.filter(
                  (fundraiser) =>
                    fundraiser.fundraiserCause.toLowerCase() === categoryFilter.toLowerCase() &&
                    fundraiser.fundraiserTitle.toLowerCase().includes(searchFilter.toLowerCase())
                )
              );
            } else {
              setFilteredFundraisers(null);
            }
          } else {
            if (
              fundraisers.some((fundraiser) =>
                fundraiser.fundraiserTitle.toLowerCase().includes(searchFilter.toLowerCase())
              )
            ) {
              setFilteredFundraisers(
                fundraisers.filter(
                  (fundraiser) =>
                    fundraiser.fundraiserCause.toLowerCase() === categoryFilter.toLowerCase() &&
                    fundraiser.fundraiserTitle.toLowerCase().includes(searchFilter.toLowerCase())
                )
              );
            }
          }
        } else {
          setFilteredFundraisers(
            fundraisers.filter(
              (fundraiser) => fundraiser.fundraiserCause.toLowerCase() === categoryFilter.toLowerCase()
            )
          );
        }
      } else {
        setFilteredFundraisers(null);
      }
    }
  }, [categoryFilter, uploadedFilter, isFetching, searchFilter]);

  return (
    <>
      <div>
        {isFetching ? (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        ) : filteredFundraisers && filteredFundraisers.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFundraisers.map((fundraiser) => (
              <FundriaserCard
                key={fundraiser._id}
                fundraiserId={fundraiser._id}
                fundraiserTitle={fundraiser.fundraiserTitle}
                fundraiserStory={fundraiser.fundraiserStory}
                fundraiserGoal={fundraiser.fundraiserGoal}
                creatorName={fundraiser.creatorName}
                profilePicUrl={fundraiser.profilePicUrl}
                amountRaised={fundraiser.amountRaised}
                coverMediaUrl={fundraiser.coverMediaUrl}
              />
            ))}
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

export default DiscoverFundraiser;
