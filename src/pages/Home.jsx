import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import fundsvg from '../assets/fundsvg.svg';
import FundraiserDiscoverSection from '../components/discover-section/fundraiser-discover-section';
import { useSession } from '../components/providers/session-provider';

const Home = () => {
    const { session } = useSession();
    return (
        <>
            <section className="hero my-16 flex h-auto">
                <div className="hero.container flex w-full flex-col items-center md:flex-row ">
                    <div className="hero.caption flex h-full flex-1 flex-col justify-center gap-y-4 md:ml-14">
                        <div className="flex flex-col gap-y-2 text-center md:text-left">
                            <p className="text-5xl font-bold md:text-[56px]">
                                Crowdfunding for India
                            </p>
                            <p className="text-base md:text-lg">
                                Help others and one day it will
                                return to you
                            </p>
                        </div>
                        <div className="flex w-full flex-col items-center gap-x-2 md:flex-row">
                            <NavLink
                                to={
                                    session
                                        ? '/fundraiser/create'
                                        : '/auth/signin'
                                }
                            >
                                <Button colorScheme="teal">
                                    Start a Fundraiser
                                </Button>
                            </NavLink>
                            <span className="font-semibold">
                                OR
                            </span>
                            <NavLink to="/fundraisers/discover">
                                <Button
                                    variant={'outline'}
                                    colorScheme="teal"
                                >
                                    Donate to one
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="hero.img flex-1">
                        <img src={fundsvg} alt="mainimg" />
                        {/* <Fundssvg /> */}
                    </div>
                </div>
            </section>
            <section className="discover.fundraiser.section space-y-10 bg-teal-500 px-4 py-14 sm:px-10 md:px-14">
                <div className="discover.container">
                    <h1 className="text-center text-3xl font-bold text-white sm:text-left">
                        Discover Fundraisers
                    </h1>
                </div>
                <div className="w-full">
                    <FundraiserDiscoverSection />
                </div>
                <div className="w-full text-center">
                    <NavLink to="/fundraisers/discover">
                        <Button
                            variant="link"
                            color="white"
                            _active={{
                                color: 'teal.100',
                            }}
                        >
                            View More ➜
                        </Button>
                    </NavLink>
                </div>
            </section>
        </>
    );
};

export default Home;
