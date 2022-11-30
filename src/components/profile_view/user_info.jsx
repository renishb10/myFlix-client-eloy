import React from 'react';

function UserInfo ({email, name}) {
    return(
        <div>
            <h3 style ={{textAlign: "center", marginBottom: '10px'}}> Your Info: </h3>
            <p> Name: {name} </p>
            <p> e-mail: {email} </p>
        </div>
    )
}

export default UserInfo;