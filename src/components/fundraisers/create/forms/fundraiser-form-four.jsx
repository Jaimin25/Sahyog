import { Input, Stack, Text } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';

const FundraiserFormFour = ({ fundraiserTitle, fundraiserStory, setFundraiserTitle, setFundraiserStory }) => {
  return (
    <Stack className="fundriaser-form-title-story">
      <Text fontWeight="semibold">Give your fundraiser a title</Text>
      <Input
        placeholder="Donate to help..."
        value={fundraiserTitle}
        onChange={(e) => setFundraiserTitle(e.target.value)}
      />
      <Text fontWeight="semibold">Tell your story</Text>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onEditorChange={(c) => setFundraiserStory(c)}
        value={fundraiserStory}
        disabled={!fundraiserTitle}
        init={{
          height: 400,
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
    </Stack>
  );
};

export default FundraiserFormFour;
