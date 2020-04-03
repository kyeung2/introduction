import React from "react";
import {getCognitoUser} from './UserUtils';

export default class ResendForm extends React.Component {

    resendCode(event) {
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
    }

    render() {
        return (
            <form onSubmit={this.resendCode}>
                <input type="username" placeholder="username" name="username"/>
                <button>Resend Code</button>
            </form>

        );
    }
}