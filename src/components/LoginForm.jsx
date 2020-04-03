import React from "react";
import { AuthenticationDetails} from 'amazon-cognito-identity-js';
import {  getCognitoUser} from "./UserUtils";

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
                // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                //     IdentityPoolId: '...', // your identity pool id here
                //     Logins: {
                //         // Change the key below according to the specific region your user pool is in.
                //         'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_46TmDKNHD': result
                //             .getIdToken()
                //             .getJwtToken(),
                //     },
                // });
                //
                // //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                // AWS.config.credentials.refresh(error => {
                //     if (error) {
                //         console.error(error);
                //     } else {
                //         // Instantiate aws sdk service objects now that the credentials have been updated.
                //         // example: var s3 = new AWS.S3();
                //         console.log('Successfully logged!');
                //     }
                // });
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