import { Button, Text } from '@chakra-ui/react';

import { useSession } from '../../components/providers/session-provider';
import { supabase } from '../../lib/supabase';

const UserDashboard = () => {
    const { user } = useSession();
    return (
        <div className="flex h-full flex-1">
            <div>
                <Text>User: {user.email}</Text>
                <Button
                    variant="outline"
                    colorScheme="red"
                    onClick={async () => {
                        await supabase.auth.signOut();
                    }}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default UserDashboard;
