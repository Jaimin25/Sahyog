import { Button } from '@chakra-ui/react';
import { HeartHandshake } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { useSession } from '../providers/session-provider';

const Navbar = () => {
    const { user } = useSession();

    return (
        <header className="navbar fixed top-0 z-10 w-full bg-white">
            <div>
                <nav className="flex h-auto w-full items-center p-3 shadow sm:px-16 md:px-14">
                    <div className="navbar.container flex w-full items-center">
                        <NavLink to="/">
                            <div className="flex items-center gap-x-1">
                                <HeartHandshake className="h-8 w-8" />
                                <div className="flex flex-col">
                                    <p className="text-3xl">Sahyog</p>
                                    <p className="text-xs">together we help</p>
                                </div>
                            </div>
                        </NavLink>
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
                                {user ? (
                                    <NavLink to="/dashboard">
                                        <Button variant="ghost" colorScheme="teal">
                                            Dashboard
                                        </Button>
                                    </NavLink>
                                ) : (
                                    <NavLink to="/auth/signin">
                                        <Button variant="ghost" colorScheme="teal">
                                            Sign In
                                        </Button>
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
