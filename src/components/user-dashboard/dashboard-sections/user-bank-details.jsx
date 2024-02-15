import {
    Alert,
    AlertIcon,
    Button,
    Card,
    CardBody,
    CardHeader,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import { useSession } from '../../providers/session-provider';

const UserBankDetails = () => {
    const { user } = useSession();
    return (
        <Card className="flex-1" padding="10px">
            <CardHeader>
                <Heading>Bank Details</Heading>
            </CardHeader>
            <CardBody>
                <Stack spacing="4">
                    {!user.emailVerified && (
                        <Alert>
                            <AlertIcon />
                            Please verify your email to add bank
                            details
                        </Alert>
                    )}
                    <Formik
                        initialValues={{
                            accountHolderName: '',
                            accountNumber: '',
                            ifscCode: '',
                            bankName: '',
                            accountType: '',
                        }}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                actions.setSubmitting(false);
                            }, 1000);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Stack>
                                    <Field name="accountHolderName">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel>
                                                    Account
                                                    Holder Name
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    placeholder="Account holder name"
                                                    isDisabled={
                                                        !user.emailVerified
                                                    }
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="accountNumber">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel>
                                                    Account
                                                    Number
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    placeholder="Account number"
                                                    isDisabled={
                                                        !user.emailVerified
                                                    }
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="ifscCode">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel>
                                                    IFSC Code
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    placeholder="IFSC code"
                                                    isDisabled={
                                                        !user.emailVerified
                                                    }
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="bankName">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel>
                                                    Bank Name
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    placeholder="Bank name"
                                                    isDisabled={
                                                        !user.emailVerified
                                                    }
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="accountType">
                                        {({ field, form }) => (
                                            <FormControl>
                                                <FormLabel>
                                                    Account Type
                                                </FormLabel>
                                                <Select
                                                    {...field}
                                                    placeholder="Account type"
                                                    isDisabled={
                                                        !user.emailVerified
                                                    }
                                                >
                                                    <option value="savings">
                                                        Savings
                                                    </option>
                                                    <option value="current">
                                                        Current
                                                    </option>
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
                                <Button
                                    mt={4}
                                    colorScheme="teal"
                                    isLoading={
                                        props.isSubmitting
                                    }
                                    type="submit"
                                    isDisabled={
                                        !user.emailVerified
                                    }
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default UserBankDetails;
