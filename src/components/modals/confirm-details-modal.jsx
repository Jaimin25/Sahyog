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

const ConfirmDetailsModal = ({ isOpen, onClose, setConfirmSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Once submitted, you cannot edit the details again until after they have been reviewed and validated. Please
          re-check the details and confirm.
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              setConfirmSubmit(false);
              onClose();
            }}
          >
            Close
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              setConfirmSubmit(true);
              onClose();
            }}
          >
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDetailsModal;
