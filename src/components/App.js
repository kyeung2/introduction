import React, {useEffect} from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import RegisterForm from "./RegisterForm"
import ValidateForm from "./ValidateForm"
import LoginForm from "./LoginForm"
import ResendForm from "./ResendForm";
import {userPool} from "./UserUtils";
import * as AWS from 'aws-sdk/global';

function App() {

    function loadAuthenticatedUser() {
        console.log("load authenticated user");
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                console.log('session validity: ' + session.isValid());
                console.log(session);
                document.title = `Flying Nimbus, user: ${cognitoUser.getUsername()}`;

                // // NOTE: getSession must be called to authenticate user before calling getUserAttributes
                // cognitoUser.getUserAttributes(function (err, attributes) {
                //     if (err) {
                //         // Handle error
                //     } else {
                //         // Do something with attributes
                //     }
                // });


                AWS.config.credentials = new AWS.CognitoIdentityCredentials(
                    {
                        IdentityPoolId: 'eu-west-1:1dd2d7b7-2a94-4f89-9763-4bbe4f784231', // your identity pool id here
                        Logins: {'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_46TmDKNHD': session.getIdToken().getJwtToken(),},
                    },
                    {
                        region: "eu-west-1"
                    }
                );

                console.log("creds");
                console.log(AWS.config.credentials);

                //call refresh method in order to authenticate user and get new temp credentials
                AWS.config.credentials.refresh(error => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('refreshed creds');
                        console.log(AWS.config.credentials);
                    }
                });

                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();
            });
        } else {
            document.title = `Flying Nimbus`
        }
    }

    useEffect(() => {
        loadAuthenticatedUser();
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p> Under construction :)</p>
                <div>
                    <RegisterForm/>
                    <ValidateForm/>
                    <ResendForm/>
                    <LoginForm/>
                </div>
            </header>
        </div>
    );


}

export default App;