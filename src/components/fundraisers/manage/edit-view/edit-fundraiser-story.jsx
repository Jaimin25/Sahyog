import { Button, ButtonGroup, Editable, IconButton, useEditableControls } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { Markup } from 'interweave';
import { CheckIcon, X } from 'lucide-react';
import { useState } from 'react';

const EditFundraiserStory = ({ fundraiser, fundraiserStory, setFundraiserStory }) => {
  const [editing, setEditing] = useState();
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
      defaultValue={fundraiser.fundraiserstory}
      className="flex items-center"
      isPreviewFocusable={false}
    >
      {!editing && <Markup content={fundraiserStory} className="flex-1" />}
      {editing && (
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          onEditorChange={(c) => setFundraiserStory(c)}
          value={fundraiserStory}
          init={{
            height: 400,
            width: '100%',
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' + 'bold italic forecolor | alignleft aligncenter ' + 'alignright alignjustify ',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      )}
      <EditableControls />
    </Editable>
  );
};

export default EditFundraiserStory;
