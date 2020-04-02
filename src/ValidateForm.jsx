import React from "react";
import {CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';

export default class ValidateForm extends React.Component {
    constructor(props) {
        super(props);
        this.validateCode = this.validateCode.bind(this);
    }

    getCognitoUser(username) {
        const poolData = {
            UserPoolId: 'eu-west-1_46TmDKNHD',
            ClientId: '5ign0nv6b1tqnjlc7cc72nhog5',
        };

        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };

        return new CognitoUser(userData);
    }

    validateCode(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const code = data.get("code");
        const username = data.get("username");
        console.log(`username:${username}, code:${code}`);

        this.getCognitoUser(username).confirmRegistration(code, true, function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log(`Code verified: ${result}`);
        });
    }

    resendCode(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");

        this.getCognitoUser(username).resendConfirmationCode(function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log(`Code resent: ${result}`);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.validateCode}>
                    <input type="username" placeholder="username" name="username"/>
                    <input type="text" placeholder="verification code" name="code"/>
                    <button>Validate Code</button>
                </form>
                <button onClick={this.resendCode}>Resend Code</button>

            </div>
        );
    }
}