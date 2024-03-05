import { Button, ButtonGroup, Editable, IconButton, Select, Text, useEditableControls } from '@chakra-ui/react';
import { CheckIcon, X } from 'lucide-react';
import { useState } from 'react';

import { capitalizeString } from '../../../../lib/utils';

const categories = [
  'animals',
  'business',
  'community',
  'creative',
  'education',
  'emergency',
  'environment',
  'events',
  'medical',
  'other',
  'sports',
  'volunteer',
  'wishes',
];

const EditFundraiserCause = ({ fundraiser, fundraiserCause, setFundraiserCause }) => {
  const [editing, setEditing] = useState(false);
  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
    setEditing(isEditing);
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
      defaultValue={fundraiser.fundraiserCause}
      className="flex items-center"
      isPreviewFocusable={false}
    >
      <Text flex="1" hidden={editing}>
        {fundraiserCause ? capitalizeString(fundraiserCause) : capitalizeString(fundraiser.fundraiserCause)}
      </Text>
      {editing && (
        <Select
          placeholder="None"
          defaultValue={fundraiserCause}
          value={fundraiserCause}
          onChange={(e) => setFundraiserCause(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </Select>
      )}
      <EditableControls />
    </Editable>
  );
};

export default EditFundraiserCause;
