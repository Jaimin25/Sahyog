import { Alert, AlertIcon, Card, CardBody, CardHeader, Grid, Heading, Stack, Text } from '@chakra-ui/react';

import UserActiveFundraisersCard from '../../cards/user-fundraisers-card';
import UserDeletedFundraisersCard from '../../cards/user-fundraisers-card-deleted';
import UserFundraisersDraftCard from '../../cards/user-fundraisers-draft-card';
import UserFundraiserCardSkeleton from '../../skeletons/user-fundraiser-card-skeleton';

const UserFundraisers = ({ loading, userFundraisers }) => {
  return (
    <Card className="flex-1" padding="10px">
      <CardHeader>
        <Heading>Fundraisers</Heading>
      </CardHeader>
      <CardBody>
        {loading ? (
          <UserFundraiserCardSkeleton
            fundraiserTitle="Fundraiser Title"
            coverMediaUrl="https://media.freshbooks.com/wp-content/uploads/2021/11/how-does-crowdfunding-work.jpg"
            createdAt="2142"
          />
        ) : (
          <Stack>
            {!loading && userFundraisers && userFundraisers.length === 0 && (
              <Alert>
                <AlertIcon />
                You have no fundraisers yet
              </Alert>
            )}
            {userFundraisers.some((fundraiser) => fundraiser.status === 'draft' || fundraiser.status === 'review') && (
              <>
                <Text fontSize="xl" fontWeight="bold">
                  Drafts
                </Text>
                {userFundraisers
                  .filter((fundraiser) => fundraiser.status === 'draft' || fundraiser.status === 'review')
                  .map((fundraiser) => (
                    <UserFundraisersDraftCard
                      key={fundraiser._id}
                      fundraiserTitle={fundraiser.fundraiserTitle}
                      coverMediaUrl={fundraiser.coverMediaUrl}
                      createdAt={fundraiser.createdAt}
                    />
                  ))}
              </>
            )}
            {userFundraisers.some((fundraiser) => fundraiser.status === 'active') && (
              <>
                <Text fontSize="xl" fontWeight="bold">
                  Published
                </Text>

                <Grid width="100%" gap="10px">
                  {userFundraisers
                    .filter((fundraiser) => fundraiser.status === 'active')
                    .map((fundraiser) => (
                      <UserActiveFundraisersCard
                        key={fundraiser._id}
                        fundraiserId={fundraiser._id}
                        fundraiserTitle={fundraiser.fundraiserTitle}
                        coverMediaUrl={fundraiser.coverMediaUrl}
                        createdAt={fundraiser.createdAt}
                      />
                    ))}
                </Grid>
              </>
            )}
            {userFundraisers.some((fundraiser) => fundraiser.status === 'deleted') && (
              <>
                <Text fontSize="xl" fontWeight="bold">
                  Deleted
                </Text>
                {userFundraisers
                  .filter((fundraiser) => fundraiser.status === 'deleted')
                  .map((fundraiser) => (
                    <UserDeletedFundraisersCard
                      key={fundraiser._id}
                      fundraiserId={fundraiser._id}
                      fundraiserTitle={fundraiser.fundraiserTitle}
                      coverMediaUrl={fundraiser.coverMediaUrl}
                      createdAt={fundraiser.createdAt}
                    />
                  ))}
              </>
            )}
          </Stack>
        )}
      </CardBody>
    </Card>
  );
};

export default UserFundraisers;
