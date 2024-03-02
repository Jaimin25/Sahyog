import {
    Alert,
    AlertIcon,
    Button,
    Card,
    CardBody,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Stack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

import { useSession } from '../../providers/session-provider';

const UserOtherDetails = () => {
    const { user } = useSession();

    const [dob, setDob] = useState();
    const [govtIdType, setGovtIdType] = useState();

    return (
        <Card className="flex-1" padding="10px">
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
                            gender: '',
                            dateOfBirth: '',
                            validIdType: '',
                            validIdNumber: '',
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
                            <Form className="space-y-8">
                                <Stack>
                                    <Heading>
                                        Personal Details
                                    </Heading>
                                    <Stack>
                                        <Field name="gender">
                                            {({
                                                field,
                                                form,
                                            }) => (
                                                <FormControl>
                                                    <FormLabel>
                                                        Gender
                                                    </FormLabel>
                                                    <Select
                                                        {...field}
                                                        placeholder="Gender"
                                                        isRequired
                                                    >
                                                        <option>
                                                            Male
                                                        </option>
                                                        <option>
                                                            Female
                                                        </option>
                                                        <option>
                                                            Other
                                                        </option>
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="dateOfBirth">
                                            {({
                                                field,
                                                form,
                                            }) => (
                                                <FormControl>
                                                    <FormLabel>
                                                        Date of
                                                        birth
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        value={
                                                            dob
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setDob(
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        type="date"
                                                        isRequired
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <Heading>
                                        Govt. ID Details
                                    </Heading>
                                    <Stack>
                                        <Field name="validIdType">
                                            {({
                                                field,
                                                form,
                                            }) => (
                                                <FormControl>
                                                    <FormLabel>
                                                        Govt. ID
                                                        Type
                                                    </FormLabel>
                                                    <Select
                                                        {...field}
                                                        value={
                                                            govtIdType
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setGovtIdType(
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="Govt. ID"
                                                        isRequired
                                                    >
                                                        <option>
                                                            Aadhaar
                                                            card
                                                        </option>
                                                        <option>
                                                            Pan
                                                            card
                                                        </option>
                                                    </Select>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="validIdNumber">
                                            {({
                                                field,
                                                form,
                                            }) => (
                                                <FormControl>
                                                    <FormLabel>
                                                        Govt. ID
                                                        Number
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        placeholder="ID number"
                                                        isRequired
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <Heading>
                                        Bank Details
                                    </Heading>
                                    <Stack>
                                        <Field name="accountHolderName">
                                            {({
                                                field,
                                                form,
                                            }) => (
                                                <FormControl>
                                                    <FormLabel>
                                                        Account
                                                        Holder
                                                        Name
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        placeholder="Account holder name"
                                                        isDisabled={
                                                            !user.emailVerified
                                                        }
                                                        isRequired
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="accountNumber">
                                            {({
                                                field,
                                                form,
                                            }) => (
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
                                                        isRequired
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="ifscCode">
                                            {({
                                                field,
                                                form,
                                            }) => (
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
                                                        isRequired
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="bankName">
                                            {({
                                                field,
                                                form,
                                            }) => (
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
                                                        isRequired
                                                    />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="accountType">
                                            {({
                                                field,
                                                form,
                                            }) => (
                                                <FormControl>
                                                    <FormLabel>
                                                        Account
                                                        Type
                                                    </FormLabel>
                                                    <Select
                                                        {...field}
                                                        placeholder="Account type"
                                                        isDisabled={
                                                            !user.emailVerified
                                                        }
                                                        isRequired
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

export default UserOtherDetails;
