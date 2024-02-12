import { Button, Card, CardBody, CardHeader, FormControl, FormHelperText, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { supabase } from '../../lib/supabase';

const SignUpComponent = () => {
    const [error, setError] = useState();
    const navigate = useNavigate();
    const onSubmit = async (values, actions) => {
        setError(null);
        const { data, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        });

        if (data && !error) {
            navigate('/dashboard');
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
                                                <FormLabel>Fullname</FormLabel>
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
