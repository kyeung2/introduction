import React from "react";
import {getCognitoUser} from './UserUtils';

function ResendForm() {

    const resendCode = event => {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");

        getCognitoUser(username).resendConfirmationCode(function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log(`Code resent: ${result}`);
        });
    };

    return (
        <form onSubmit={resendCode}>
            <input type="username" placeholder="username" name="username"/>
            <button>Resend Code</button>
        </form>
    );
}

export default ResendForm