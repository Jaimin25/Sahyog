import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { HeartHandshake, Menu as MenuIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { useSession } from '../providers/session-provider';

const Navbar = () => {
  const { user, session } = useSession();

  return (
    <header className="navbar fixed top-0 z-10 w-full bg-white">
      <div>
        <nav className="flex h-auto w-full items-center p-3 shadow sm:px-16 lg:px-14">
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
            <div className="navbar.menu hidden gap-2 lg:flex">
              <div>
                <NavLink to={session ? '/fundraiser/create' : '/auth/signin'}>
                  <Button colorScheme="teal">Start a Fundraiser</Button>
                </NavLink>
              </div>

              <div>
                <NavLink to="/fundraisers/discover">
                  <Button variant="ghost" colorScheme="teal">
                    Fundraisers
                  </Button>
                </NavLink>
              </div>
              <div>
                <NavLink to="/how-it-works">
                  <Button variant="ghost" colorScheme="teal">
                    How it works
                  </Button>
                </NavLink>
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
            <div className="flex lg:hidden">
              <Menu>
                <MenuButton as={Button}>
                  <MenuIcon className="h-7 w-7 text-black" />
                </MenuButton>
                <MenuList>
                  <NavLink to={session ? '/fundraiser/create' : '/auth/signin'}>
                    <MenuItem color="teal">Start a Fundraiser</MenuItem>
                  </NavLink>

                  <NavLink to="/fundraisers/discover">
                    <MenuItem>Fundraisers</MenuItem>
                  </NavLink>

                  <NavLink to="/how-it-works">
                    <MenuItem>How it works</MenuItem>
                  </NavLink>

                  {user ? (
                    <NavLink to="/dashboard">
                      <MenuItem>Dashboard</MenuItem>
                    </NavLink>
                  ) : (
                    <NavLink to="/auth/signin">
                      <MenuItem>Sign In</MenuItem>
                    </NavLink>
                  )}
                </MenuList>
              </Menu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
