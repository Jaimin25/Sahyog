import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

import { FacebookLogo } from '../../assets/socials/facebook-logo.jsx';
import { TelegramLogo } from '../../assets/socials/telegram-logo.jsx';
import { TwitterLogo } from '../../assets/socials/twitter-logo.jsx';
import { WhatsappLogo } from '../../assets/socials/whatsapp-logo.jsx';

const ShareFundraiserModal = ({ fundraiserTitle, fundraiserCreatorName, fundraiserId, isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState();
  const shareLink = `https://sahyogweb.vercel.app/fundraiser/${fundraiserId}
    `;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Help by sharing</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Stack>
              <Text size="2xl">Share link via</Text>
              <Stack direction="row" justifyContent="space-between" padding="14px">
                <FacebookShareButton url={`Fundraiser by ${fundraiserCreatorName} - ${fundraiserTitle}\n${shareLink}`}>
                  {' '}
                  <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-blue-200 fill-[#1877f2] shadow-md duration-100 hover:bg-[#1877f2] hover:fill-white hover:shadow-blue-500/50">
                    <FacebookLogo />
                  </div>
                </FacebookShareButton>

                <TwitterShareButton url={`Fundraiser by ${fundraiserCreatorName} - ${fundraiserTitle}\n${shareLink}`}>
                  <div className="fill-white-800 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/50 shadow-md duration-100 hover:bg-black hover:fill-white hover:shadow-gray-500/50">
                    <TwitterLogo />
                  </div>
                </TwitterShareButton>

                <WhatsappShareButton url={`Fundraiser by ${fundraiserCreatorName} - ${fundraiserTitle}\n${shareLink}`}>
                  <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-green-200 fill-[#25D366] shadow-md duration-100 hover:bg-[#25D366] hover:fill-white hover:shadow-green-500/50">
                    <WhatsappLogo />
                  </div>
                </WhatsappShareButton>
                <TelegramShareButton url={`Fundraiser by ${fundraiserCreatorName} - ${fundraiserTitle}\n${shareLink}`}>
                  {' '}
                  <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-sky-200 fill-[#229ED9] shadow-md duration-100 hover:bg-[#229ED9] hover:fill-white hover:shadow-sky-500/50">
                    <TelegramLogo />
                  </div>
                </TelegramShareButton>
              </Stack>
            </Stack>
            <Text>Or copy link</Text>
            <Stack padding="14px">
              <Box className="rounded-md border border-teal-500 px-4 py-2 hover:cursor-text hover:transition">
                <Text onClick={handleCopyLink}>{shareLink}</Text>
              </Box>
              {isCopied && (
                <Stack direction="row">
                  <Check className="text-green-500" />
                  <Text className="text-green-500">Copied!</Text>
                </Stack>
              )}
              <Button colorScheme="green" onClick={handleCopyLink}>
                Copy
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareFundraiserModal;
