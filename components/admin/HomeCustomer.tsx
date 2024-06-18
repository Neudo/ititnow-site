import React from 'react';

function HomeCustomer({userData}: {userData:{name:string}}) {
    console.log(userData)
    return (
        <div> Bienvenue, {userData.name}.</div>
    );
}

export default HomeCustomer;
