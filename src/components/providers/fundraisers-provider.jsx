import axios from 'axios';
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import { baseapiurl } from '../../lib/utils';

const FundraiserContext = createContext();

export const useFundraisers = () => {
    return useContext(FundraiserContext);
};

export const FundraiserProvider = ({ children }) => {
    const [fundraisers, setFundraisers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const fetchAllFundraisers = async () => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/fundraiser/getAllFundraisers`
            );
            const resData = res.data;

            if (resData.statusCode === 200) {
                setFundraisers(resData.allFundraisers);
                setIsFetching(false);
            } else {
                setFundraisers([]);
                setIsFetching(false);
            }
            setIsFetching(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setIsFetching(true);
        fetchAllFundraisers();
    }, []);

    return (
        <FundraiserContext.Provider
            value={{ fundraisers, isFetching }}
        >
            {children}
        </FundraiserContext.Provider>
    );
};
