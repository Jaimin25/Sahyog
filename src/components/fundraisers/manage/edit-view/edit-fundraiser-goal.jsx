import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  useEditableControls,
} from '@chakra-ui/react';
import { CheckIcon, X } from 'lucide-react';

const EditFundraiserGoal = ({ fundraiser, fundraiserGoal, setFundraiserGoal }) => {
  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
      <ButtonGroup className="flex items-center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<X />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Button variant="outline" {...getEditButtonProps()}>
        Edit
      </Button>
    );
  }
  return (
    <Editable
      textAlign="left"
      defaultValue={`${fundraiser.fundraiserGoal}`}
      className="flex items-center"
      isPreviewFocusable={false}
    >
      <InputGroup className="my-4 items-center">
        <InputLeftAddon>₹</InputLeftAddon>
        <EditablePreview width="100%" padding="10px" />
        <Input
          as={EditableInput}
          type="number"
          value={fundraiserGoal}
          className="p-2"
          onChange={(e) => setFundraiserGoal(e.target.value)}
        />
      </InputGroup>
      <EditableControls />
    </Editable>
  );
};

export default EditFundraiserGoal;
