import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Input,
  useEditableControls,
} from '@chakra-ui/react';
import { CheckIcon, X } from 'lucide-react';

const EditFundraiserTitle = ({ fundraiser, fundraiserTitle, setFundraiserTitle }) => {
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
    <Editable textAlign="left" defaultValue={fundraiser.fundraiserTitle} className="flex" isPreviewFocusable={false}>
      <EditablePreview width="100%" />

      <Input as={EditableInput} value={fundraiserTitle} onChange={(e) => setFundraiserTitle(e.target.value)} />
      <EditableControls />
    </Editable>
  );
};

export default EditFundraiserTitle;
