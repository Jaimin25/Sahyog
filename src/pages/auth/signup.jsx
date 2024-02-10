import { Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { NavLink } from 'react-router-dom';

const SignUpPage = () => {
    function validateName(value) {
        console.log(value);
    }

    return (
        <div className="flex h-full w-full flex-1 items-center justify-center pt-16">
            <div className="m-10 w-3/4 sm:w-1/2 lg:w-[30%]">
                <Card className="h-full w-full" shadow="md" border="1px" borderColor="gray.200">
                    <CardHeader>
                        <Heading>Sign Up</Heading>
                    </CardHeader>
                    <CardBody>
                        <Formik
                            initialValues={{ fullname: '', email: '', password: '' }}
                            onSubmit={(values, actions) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    actions.setSubmitting(false);
                                }, 2000);
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Stack spacing="4">
                                        <Field name="fullname" validate={validateName}>
                                            {({ field, form }) => (
                                                <FormControl>
                                                    <FormLabel>Fullname</FormLabel>
                                                    <Input {...field} type="text" id="fullname" placeholder="Fullname" required />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="email" validate={validateName}>
                                            {({ field, form }) => (
                                                <FormControl>
                                                    <FormLabel>Email</FormLabel>
                                                    <Input {...field} type="email" id="email" placeholder="Email" required />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="password" validate={validateName}>
                                            {({ field, form }) => (
                                                <FormControl>
                                                    <FormLabel>Password</FormLabel>
                                                    <Input type="password" id="password" placeholder="Password" {...field} required />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Text>
                                            Already have an account?{' '}
                                            <NavLink to="/auth/signin" className="text-teal-600">
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
        </div>
    );
};

export default SignUpPage;