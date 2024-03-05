import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  IconButton,
  Input,
  Text,
  useEditableControls,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { CheckIcon, X } from 'lucide-react';
import { useState } from 'react';

const EditFundraiserLocation = ({
  fundraiser,
  fundraiserCity,
  fundraiserState,
  fundraiserZipCode,
  setFundraiserZipCode,
  setFundraiserCity,
  setFundraiserState,
}) => {
  const [editing, setEditing] = useState(false);
  const [zipCode, setZipCode] = useState(2);
  const toast = useToast();

  const handleCheckZipCode = async (getSubmitButtonProps) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${zipCode}`);
      const resData = res.data;

      if (resData[0].Status === 'Success') {
        const city = resData[0].PostOffice[0].District;
        const state = resData[0].PostOffice[0].State;
        setFundraiserCity(city);
        setFundraiserState(state);
        setFundraiserZipCode(zipCode);
        getSubmitButtonProps().onClick();
      } else {
        setFundraiserZipCode(fundraiser.zipCode);
        setFundraiserCity(fundraiser.fundraiserCity);
        setFundraiserState(fundraiser.fundraiserState);
        toast({
          title: 'Invalid Zip Code',
          position: 'top-right',
          isClosable: true,
          status: 'error',
          duration: 1000,
        });
        getSubmitButtonProps().onClick();
      }
    } catch (e) {
      toast({
        title: 'Error',
        description: e.message,
        status: 'error',
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
    setEditing(isEditing);
    return isEditing ? (
      <ButtonGroup className="flex items-center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          onClick={() => handleCheckZipCode(getSubmitButtonProps)}
        />
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
      defaultValue={Number(fundraiser.zipCode)}
      className="flex items-center"
      isPreviewFocusable={false}
    >
      <Text flex="1" hidden={editing}>
        {fundraiserCity}, {fundraiserState} - {fundraiserZipCode}
      </Text>

      <Input as={EditableInput} value={zipCode} type="number" onChange={(e) => setZipCode(e.target.value)} />

      <EditableControls />
    </Editable>
  );
};

export default EditFundraiserLocation;
