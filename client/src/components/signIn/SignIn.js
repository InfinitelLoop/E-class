import React, { useState } from 'react';

import {decryptPassword} from '../../utility/common';
import classes from './SignIn.module.css'
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import axios from '../../utility/myAxios';

const SignIn = (props) => {
    let initialState = {
        value: '',
        isValid: true,
        touched: false
    };
    const [username, setUsername] = useState(initialState);
    const [password, setPassword] = useState(initialState);

    let attachedClass = [classes.SignInModal];
    if (props.visible) {
        attachedClass.push(classes.Visible);
    }

    const usernameChangedHandler = event => {
        validateInput(event.target.value, 'username');
    }

    const passwordChangedHandler = event => {
        validateInput(event.target.value, 'password');
    }

    function signIn() {
        axios.get('http://localhost:3001/users')
            .then(res => {
                let usersList = res.data;
                let usernameFound = false;
                let passwordCorrect = false;
                for (let index in usersList) {
                    if (username.value === usersList[index].username) {
                        usernameFound= true;
                        if(password.value === decryptPassword(usersList[index].password)){
                            passwordCorrect= true;
                            props.login();
                            setUsername(initialState);
                            setPassword(initialState);
                            break;
                        } else {
                            break;
                        }
                    }
                }
                if(!usernameFound){
                    alert('User does not exist');
                } else if(!passwordCorrect){
                    alert('Invalid credentials');
                }
            })
            .catch(err => console.log('error while signing in'))
    }

    function validateInput(value, field) {
        switch (field) {
            case 'username':
                let updatedUsername = { ...username };
                if (!updatedUsername.touched) {
                    updatedUsername.touched = true;
                }
                updatedUsername.isValid = value.trim() === '' ? false : true;
                updatedUsername.value = value;
                setUsername(updatedUsername);
                break;

            case 'password':
                let updatedPassword = { ...password };
                if (!updatedPassword.touched) {
                    updatedPassword.touched = true;
                }
                updatedPassword.isValid = value.trim() === '' ? false : true;
                updatedPassword.value = value;
                setPassword(updatedPassword);
                break;

            default: break;
        }
    }

    return (
        <div className={attachedClass.join(' ')}>
            <h2 style={{ marginTop: 30 }}>Sign in to your account</h2>
            <div className={classes.InputContainer}>
                <label className={classes.Label}>Username</label>
                <Input type="text" value={username.value} placeholder='' changed={usernameChangedHandler} width="300px" touched={username.touched} valid={username.isValid} />
                {!username.isValid && username.touched ? <label className={classes.ErrorLabel}>This is a required field.</label> : null}
            </div>
            <div className={classes.InputContainer}>
                <label className={classes.Label}>Password</label>
                <Input type="password" value={password.value} placeholder='' changed={passwordChangedHandler} width="300px" touched={password.touched} valid={password.isValid} />
                {!password.isValid && password.touched ? <label className={classes.ErrorLabel}>This is a required field.</label> : null}
            </div>

            <Button clicked={signIn} width="200px">Sign In</Button>
            <p style={{ marginBottom: 30 }}>New to E-class? <label className={classes.SignUp} onClick={props.signUpInstead}> Sign Up</label></p>

        </div>
    )
}

export default SignIn;
