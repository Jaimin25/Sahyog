import { useParams } from 'react-router-dom';

const FundraiserPage = () => {
    const { id } = useParams();
    return <div>{id}</div>;
};

export default FundraiserPage;
