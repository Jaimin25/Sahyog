import { Button, Card, CardBody, CardHeader, FormControl, FormHelperText, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { supabase } from '../../lib/supabase';
import { baseapiurl } from '../../lib/utils';
import { useSession } from '../providers/session-provider';

const SignUpComponent = () => {
    const { saveUserDetails } = useSession();
    const [error, setError] = useState();

    const onSubmit = async (values, actions) => {
        setError(null);
        const res = await axios.post(`${baseapiurl}/api/auth/checkForName`, {
            fullname: values.fullname,
        });
        const userExists = res.data;

        if (userExists.statusCode === 200) {
            setError('User already exists with the same name');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        });

        if (data && !error) {
            const user = data.session.user;
            const res = await axios.post(`${baseapiurl}/api/auth/sign-up`, { uid: user.id, fullname: values.fullname, email: values.email });

            const userCreatedData = res.data;

            if (userCreatedData.statusCode === 200) {
                user.fullname = values.fullname;
                user.emailVerified = userCreatedData.userDetails.emailVerified;
                user.profilePicUrl = userCreatedData.userDetails.profilePicUrl;
                saveUserDetails(user);
            }
        }

        if (error) {
            setError(error.message);
        }
    };
    return (
        <div className="signup.card m-10 w-3/4 sm:w-1/2 lg:w-[30%]">
            <Card className="h-full w-full" shadow="md" border="1px" borderColor="gray.200">
                <CardHeader>
                    <Heading>Sign Up</Heading>
                </CardHeader>
                <CardBody>
                    {error && <Text color="red">{error}</Text>}
                    <Formik initialValues={{ fullname: '', email: '', password: '' }} onSubmit={onSubmit}>
                        {(props) => (
                            <Form>
                                <Stack spacing="4">
                                    <Field name="fullname">
                                        {({ field, form }) => (
                                            <FormControl isRequired>
                                                <FormLabel>Full Name</FormLabel>
                                                <Input {...field} type="text" id="fullname" placeholder="Fullname" required />
                                                <FormHelperText>Name as mentioned in your Aadhar card</FormHelperText>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="email">
                                        {({ field, form }) => (
                                            <FormControl isRequired>
                                                <FormLabel>Email</FormLabel>
                                                <Input {...field} type="email" id="email" placeholder="Email" required />
                                                <FormHelperText>Verification will be sent on this email</FormHelperText>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl isRequired>
                                                <FormLabel>Password</FormLabel>
                                                <Input type="password" id="password" placeholder="Password" {...field} required />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Text>
                                        Already have an account?{' '}
                                        <NavLink to="/auth/signin" className="font-semibold text-teal-600 underline hover:no-underline">
                                            Sign In
                                        </NavLink>
                                    </Text>
                                    <Button className="w-full" colorScheme="teal" type="submit" isLoading={props.isSubmitting}>
                                        Sign In
                                    </Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </div>
    );
};

export default SignUpComponent;
