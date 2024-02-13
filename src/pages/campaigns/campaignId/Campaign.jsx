import { useParams } from 'react-router-dom';

const Campaign = () => {
    const params = useParams();
    return <div>{params.campaignId}</div>;
};

export default Campaign;
