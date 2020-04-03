import {CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";


//TODO hardcoded!
const poolData = {
    UserPoolId: 'eu-west-1_46TmDKNHD',
    ClientId: '5ign0nv6b1tqnjlc7cc72nhog5',
};

const userPool = new CognitoUserPool(poolData);

function getCognitoUser(username) {

    const userData = {
        Username: username,
        Pool: userPool,
    };

    return new CognitoUser(userData);
}

export {
    userPool,
    getCognitoUser,
}