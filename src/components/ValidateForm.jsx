import {getCognitoUser} from './UserUtils';
import React from 'react';


function ValidateForm() {

    // TODO this stuff for setting state on a function component, don't need for now
    // const [username, setUsername] = useState('');
    // const [code, setCode] = useState('');

    const validateCode = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const code = data.get("code");
        const username = data.get("username");
        // setUsername(username)
        // setCode(code)

        console.log(`username:${username}, code:${code}`);

        getCognitoUser(username).confirmRegistration(code, true, function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log(`Code verified: ${result}`);
        });
    };

    return (
        <form onSubmit={validateCode}>
            <input type="username" placeholder="username" name="username"/>
            <input type="text" placeholder="verification code" name="code"/>
            <button>Validate Code</button>
        </form>
    );
}


export default ValidateForm