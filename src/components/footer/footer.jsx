import { ButtonGroup, Container, Divider, IconButton, Stack, Text } from '@chakra-ui/react';
import { Github, HeartHandshake, Linkedin, Twitter } from 'lucide-react';

const Footer = () => (
    <>
        <Divider />

        <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }} maxWidth={'100%'}>
            <Stack spacing={{ base: '4', md: '5' }} className="sm:px-12">
                <Stack justify="space-between" direction="row" align="center">
                    <div className="flex items-center gap-x-1">
                        <HeartHandshake className="h-8 w-8" />
                        <a href="/" className="flex flex-col">
                            <p className="text-3xl">Sahyog</p>
                            <p className="text-xs">together we help</p>
                        </a>
                    </div>
                    <ButtonGroup variant="tertiary">
                        <IconButton as="a" href="#" aria-label="LinkedIn" icon={<Linkedin />} />
                        <IconButton as="a" href="#" aria-label="GitHub" icon={<Github />} />
                        <IconButton as="a" href="#" aria-label="Twitter" icon={<Twitter />} />
                    </ButtonGroup>
                </Stack>
                <Text fontSize="sm" color="fg.subtle">
                    &copy; {new Date().getFullYear()} Sahyog, Inc. All rights reserved.
                </Text>
            </Stack>
        </Container>
    </>
);

export default Footer;
