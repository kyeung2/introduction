import React from "react";
import {AuthenticationDetails} from 'amazon-cognito-identity-js';
import {getCognitoUser} from "./UserUtils";

export default class LoginForm extends React.Component {

    login(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");
        console.log(`username:${username}, password:${password}`);

        var authenticationData = {
            Username: username,
            Password: password,
        };

        var authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        getCognitoUser(username).authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                var accessToken = result.getAccessToken().getJwtToken();

                console.log(result);
                console.log(`accessToken: ${accessToken}`)
            },

            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
        });

    }

    render() {
        return (
            <form onSubmit={this.login}>
                <input type="username" placeholder="username" name="username"/>
                <input type="password" placeholder="password" name="password"/>
                <button>Login</button>
            </form>
        );
    }
}