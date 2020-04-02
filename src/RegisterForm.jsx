import React from "react";
import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.registerUser = this.registerUser.bind(this);
    }


    registerUser(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const username = data.get("username");
        const password = data.get("password");
        console.log(`email:${email}, username:${username}, password:${password}`);


        const poolData = {
            UserPoolId: 'eu-west-1_46TmDKNHD',
            ClientId: '5ign0nv6b1tqnjlc7cc72nhog5',
        };

        const userPool = new CognitoUserPool(poolData);

        const emailDate = {
            Name: "email",
            Value: email
        };
        const attributeList = [new CognitoUserAttribute(emailDate)];

        userPool.signUp(
            username,
            password,
            attributeList,
            null,
            function (
                err,
                result
            ) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                var cognitoUser = result.user;
                console.log(`user registered: ${ cognitoUser.getUsername()}, please check your email for verification code.`);
            });
    }

    render() {
        return (
            <form onSubmit={this.registerUser}>
                <input type="email" placeholder="email" name="email"/>
                <input type="text" placeholder="username" name="username"/>
                <input type="password" placeholder="password" name="password"/>
                <button>Register User</button>
            </form>
        );
    }
}