import React, { useContext } from 'react';
import { UserContext } from '../providers/authProviders';

const Home = () => {
    const { user } = useContext(UserContext);
    // console.log(user);
    return (
        <div>
            This is home
        </div>
    );
};

export default Home;