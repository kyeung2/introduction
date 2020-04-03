import React from "react";
import {getCognitoUser} from './UserUtils';

export default class ValidateForm extends React.Component {

    validateCode(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const code = data.get("code");
        const username = data.get("username");
        console.log(`username:${username}, code:${code}`);

        getCognitoUser(username).confirmRegistration(code, true, function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log(`Code verified: ${result}`);
        });
    }

    render() {
        return (
            <form onSubmit={this.validateCode}>
                <input type="username" placeholder="username" name="username"/>
                <input type="text" placeholder="verification code" name="code"/>
                <button>Validate Code</button>
            </form>
        );
    }
}