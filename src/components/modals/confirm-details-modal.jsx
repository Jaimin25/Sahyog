import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';

const ConfirmDetailsModal = ({
    isOpen,
    onClose,
    setConfirmSubmit,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Once submitted, you cannot edit the details
                    again until after reviewed and validated.
                    Please re-check the details and confirm.
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant="ghost"
                        colorScheme="green"
                        onClick={() => setConfirmSubmit(true)}
                    >
                        Confirm
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmDetailsModal;
