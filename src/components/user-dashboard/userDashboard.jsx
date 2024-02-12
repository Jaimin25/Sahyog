import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Editable, EditableInput, EditablePreview, Heading, Stack, Text } from '@chakra-ui/react';
import { ImagePlus } from 'lucide-react';
import { useState } from 'react';

import { supabase } from '../../lib/supabase';
import { useSession } from '../providers/session-provider';

const UserDashboardComponent = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useSession();
    return (
        <div className="user-dashboard-container flex h-full gap-8 p-8">
            <Card className="h-full" padding="10px">
                <Stack>
                    <Button>Account</Button>
                    <Button>Projects</Button>
                    <Button>Billing</Button>
                    <Button>Transactions</Button>
                </Stack>
            </Card>
            <Card className="flex-1" padding="10px">
                <CardHeader>
                    <Heading>Personal Details</Heading>
                </CardHeader>
                <CardBody>
                    <Stack>
                        <Text fontWeight="semibold">Profile Photo</Text>
                        <div>
                            <Button height="142px" width="142px" rounded="full" variant="outline">
                                <p className="flex flex-col items-center gap-2">
                                    <ImagePlus />
                                    Add Photo
                                </p>
                            </Button>
                        </div>
                        <Text fontWeight="semibold">Full Name</Text>
                        <Editable defaultValue={user.fullname}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                        <Text fontWeight="semibold" className="">
                            Email {!user.emailVerified && <Badge color="red">unverified</Badge>}
                        </Text>
                        <Editable defaultValue={user.email}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </Stack>
                </CardBody>
                <CardFooter gap="10px">
                    <Button>Save</Button>
                    <Button
                        variant="solid"
                        colorScheme="red"
                        onClick={async () => {
                            setLoading(true);
                            const { error } = await supabase.auth.signOut();
                            if (!error) {
                                setLoading(false);
                            }
                        }}
                        isLoading={loading}
                    >
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UserDashboardComponent;
