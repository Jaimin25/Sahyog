import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

const DeleteFundraiserModal = ({ isOpen, onClose, handleDeleteFundraiser, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Fundraiser</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure, you want to delete this fundraiser? This task is irreversible.</Text>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="solid" colorScheme="green" onClick={handleDeleteFundraiser} isLoading={loading}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteFundraiserModal;
