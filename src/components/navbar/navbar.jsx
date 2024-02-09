import { Button } from '@chakra-ui/react';
import { HeartHandshake } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="navbar fixed top-0 z-50 w-full bg-white">
            <div>
                <nav className="flex h-auto w-full items-center p-3 shadow">
                    <div className="navbar.container flex w-full items-center">
                        <div className="flex items-center gap-x-1">
                            <HeartHandshake className="h-8 w-8" />
                            <a href="/" className="flex flex-col">
                                <p className="text-3xl">Sahyog</p>
                                <p className="text-xs">together we help</p>
                            </a>
                        </div>
                        <div className="flex-1" />
                        <div className="navbar.menu hidden md:flex">
                            <div>
                                <Button variant="ghost" colorScheme="teal">
                                    Fundraisers
                                </Button>
                            </div>
                            <div>
                                <Button variant="ghost" colorScheme="teal">
                                    How it works
                                </Button>
                            </div>
                            <div>
                                <Button variant="ghost" colorScheme="teal">
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
