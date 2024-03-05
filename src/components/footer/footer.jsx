import { Button, ButtonGroup, Container, Divider, IconButton, Stack, Text } from '@chakra-ui/react';
import { Github, HeartHandshake, Linkedin, Twitter } from 'lucide-react';

const Footer = () => (
  <>
    <Divider />

    <Container as="footer" role="contentinfo" py={{ base: '12', lg: '16' }} maxWidth={'100%'}>
      <Stack spacing={{ base: '4', lg: '5' }} className="sm:px-12">
        <div className="flex flex-col items-center justify-between gap-y-10 lg:flex-row">
          <Stack direction="column">
            <div className="flex items-center gap-x-1">
              <HeartHandshake className="h-8 w-8" />
              <a href="/" className="flex flex-col">
                <p className="text-3xl">Sahyog</p>
                <p className="text-xs">together we help</p>
              </a>
            </div>
            <Divider />
            <ButtonGroup variant="tertiary">
              <IconButton as="a" href="#" aria-label="LinkedIn" icon={<Linkedin />} />
              <IconButton as="a" href="#" aria-label="GitHub" icon={<Github />} />
              <IconButton as="a" href="#" aria-label="Twitter" icon={<Twitter />} />
            </ButtonGroup>
          </Stack>
          <Stack className="text-center" spacing="14px">
            <Text fontSize="xl" as="b">
              Causes
            </Text>
            <Button variant="link" colorScheme="teal">
              Medical
            </Button>
            <Button variant="link" colorScheme="teal">
              Emergency
            </Button>
            <Button variant="link" colorScheme="teal">
              Memorial
            </Button>
            <Button variant="link" colorScheme="teal">
              Education
            </Button>
            <Button variant="link" colorScheme="teal">
              Nonprofit
            </Button>
            <Button variant="link" colorScheme="teal">
              Crisis Relief
            </Button>
          </Stack>
          <Stack className="text-center" spacing="14px">
            <Text fontSize="xl" as="b">
              Resources
            </Text>
            <Button variant="link" colorScheme="teal">
              Help Center
            </Button>
            <Button variant="link" colorScheme="teal">
              Blog
            </Button>
            <Button variant="link" colorScheme="teal">
              Sahyog Stories
            </Button>
            <Button variant="link" colorScheme="teal">
              Newsroom
            </Button>
            <Button variant="link" colorScheme="teal">
              Career
            </Button>
            <Button variant="link" colorScheme="teal">
              About
            </Button>
          </Stack>
          <Stack className="text-center" spacing="14px">
            <Text fontSize="xl" as="b">
              Support
            </Text>
            <Button variant="link" colorScheme="teal">
              Medical Finance
            </Button>
            <Button variant="link" colorScheme="teal">
              FAQs & Help Center
            </Button>
            <Button variant="link" colorScheme="teal">
              Fundraiser video
            </Button>
            <Button variant="link" colorScheme="teal">
              Trust & Safety
            </Button>
            <Button variant="link" colorScheme="teal">
              Plans & Pricing
            </Button>
            <Button variant="link" colorScheme="teal">
              Contact Us
            </Button>
          </Stack>
        </div>
        <Text fontSize="sm" color="fg.subtle" className="text-center lg:text-left">
          &copy; {new Date().getFullYear()} Sahyog, Inc. All rights reserved.
        </Text>
      </Stack>
    </Container>
  </>
);

export default Footer;
