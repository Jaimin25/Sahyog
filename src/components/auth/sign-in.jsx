import { Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { supabase } from '../../lib/supabase';

const SignInComponent = () => {
    const [error, setError] = useState();

    const onSubmit = async (values, actions) => {
        setError(null);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });

        if (data && !error) {
            window.location.assign('/dashboard');
        }

        if (error) {
            setError(error.message);
        }
    };

    return (
        <div className="signin.card m-10 w-3/4 sm:w-1/2 lg:w-[30%]">
            <Card className="h-full w-full" shadow="md" border="1px" borderColor="gray.200">
                <CardHeader>
                    <Heading>Sign In</Heading>
                </CardHeader>
                <CardBody>
                    {error && <Text color="red">{error}</Text>}
                    <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
                        {(props) => (
                            <Form>
                                <Stack spacing="4">
                                    <Field name="email">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel>Email</FormLabel>
                                                <Input {...field} type="email" id="email" placeholder="Email" required />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel>Password</FormLabel>
                                                <Input type="password" id="password" placeholder="Password" {...field} required />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Text>
                                        Don&apos;t have an account?{' '}
                                        <NavLink to="/auth/signup" className="font-semibold text-teal-600 underline hover:no-underline">
                                            Sign Up
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

export default SignInComponent;
