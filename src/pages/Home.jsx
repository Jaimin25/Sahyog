import { Button, Divider } from '@chakra-ui/react';

import fundsvg from '../assets/funds.jpg';
import FundraserCard from '../components/cards/fundrasiersCard';

const Home = () => {
    return (
        <>
            <section className="hero my-16 h-auto pt-16">
                <div className="hero.container flex w-full flex-col items-center md:flex-row">
                    <div className="hero.caption flex h-full flex-1 flex-col justify-center gap-y-4 md:ml-14">
                        <div className="flex flex-col gap-y-2 text-center md:text-left">
                            <p className="text-5xl font-bold md:text-[56px]">Crowdfunding for India</p>
                            <p className="text-base md:text-lg">Help others and one day it will return to you</p>
                        </div>
                        <div className="flex w-full flex-col items-center gap-x-2 md:flex-row">
                            <Button variant={'solid'} colorScheme="teal">
                                Start a fundraiser
                            </Button>
                            <span className="font-semibold">OR</span>
                            <Button variant={'outline'} colorScheme="teal">
                                Donate to one
                            </Button>
                        </div>
                    </div>
                    <div className="hero.img flex-1">
                        <img src={fundsvg} />
                    </div>
                </div>
            </section>
            <Divider />
            <section className="discover.fundraiser space-y-10 rounded px-4 py-14 sm:px-10 md:px-14">
                <div className="discover.container">
                    <h1 className="text-center text-3xl font-semibold sm:text-left">Discover Fundraisers</h1>
                </div>
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <FundraserCard
                        title="Help children with their education"
                        coverImgLink="https://media.licdn.com/dms/image/C4E22AQHlV-JmE3xQ3Q/feedshare-shrink_800/0/1677519795726?e=1710374400&v=beta&t=8QqLotHim7s6_o4vVzshu7ZiqC5yLzhxj4aWrjCWVZs"
                        creator="abc"
                        currentlyRaised={450}
                        goal={10000}
                    />
                    <FundraserCard
                        title="Feed a Dog"
                        coverImgLink="https://www.dhyanfoundation.com/images/fad-logo.jpg"
                        creator="abc"
                        currentlyRaised={2500}
                        goal={10000}
                    />
                    <FundraserCard
                        title="Plant a tree for life"
                        coverImgLink="https://kettocdn.gumlet.io/media/campaign/145000/145233/image/5de4ae9f75def.jpeg?w=768&dpr=1.5"
                        creator="abc"
                        currentlyRaised={25000}
                        goal={50000}
                    />
                </div>
                <div className="w-full text-center">
                    <Button variant="link" colorScheme="teal">
                        View More ➜
                    </Button>
                </div>
            </section>
        </>
    );
};

export default Home;
