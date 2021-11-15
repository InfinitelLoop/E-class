import React, { useState } from 'react';
import axios from 'axios';

import Button from '../ui/button/Button';
import Input from '../ui/input/Input';
import classes from './SignUp.module.css';
import {encryptPassword} from '../../utility/common';

const SignUp = (props) => {
    let initialState = {
        value: '',
        touched: false,
        valid: true
    }
    const [name, setName] = useState(initialState);
    const [username, setUsername] = useState(initialState);
    const [password, setPassword] = useState(initialState);
    const [email, setEmail] = useState(initialState);

    let attachedClass = [classes.SignUpModal];
    if (props.visible) {
        attachedClass.push(classes.Visible);
    }

    function signUp() {

        let obj = {
            name: name.value,
            username: username.value,
            password: encryptPassword(password.value),
            email: email.value
        }

        axios.post('http://localhost:3001/users/sign-up', obj)
            .then(res => {
                if (res.data === "SUCCESS") {
                    alert("Sign up Successful");
                    props.signInInstead();
                    setName(initialState);
                    setUsername(initialState);
                    setPassword(initialState);
                    setEmail(initialState);

                } else {
                    alert('ERROR');
                }
            })
            .catch(err => {
                console.log('kya dikkat hai', err)
            })

    }

    function nameChangedHandler(event) {
        validateInput(event.target.value, 'name');
    }
    function usernameChangedHandler(event) {
        validateInput(event.target.value, 'username');
    }
    function passwordChangedHandler(event) {
        validateInput(event.target.value, 'password');
    }
    function emailChangedHandler(event) {
        validateInput(event.target.value, 'email');
    }

    function validateInput(value, field) {
        switch (field) {
            case 'name':
                let updatedName = { ...name };
                if (!updatedName.touched) {
                    updatedName.touched = true;
                }
                updatedName.valid = value.trim() === '' ? false : true;
                updatedName.value = value;
                setName(updatedName);
                break;

            case 'username':
                let updatedUsername = { ...username };
                if (!updatedUsername.touched) {
                    updatedUsername.touched = true;
                }
                updatedUsername.valid = value.trim() === '' ? false : true;
                updatedUsername.value = value;
                setUsername(updatedUsername);
                break;

            case 'password':
                let updatePassword = { ...password };
                if (!updatePassword.touched) {
                    updatePassword.touched = true;
                }
                updatePassword.valid = value.trim() === '' ? false : true;
                updatePassword.value = value;
                setPassword(updatePassword);
                break;

            case 'email':
                let updatedEmail = { ...email };
                if (!updatedEmail.touched) {
                    updatedEmail.touched = true;
                }
                updatedEmail.valid = value.trim() === '' ? false : true;
                updatedEmail.value = value;
                setEmail(updatedEmail);
                break;
        }
    }




    return (
        <div className={attachedClass.join(' ')}>
            <h2 style={{ marginTop: 30 }}>Create new account</h2>
            <div className={classes.InputContainer}>
                <label className={classes.Label}>Full name</label>
                <Input value={name.value} type='text' placeholder='' width='300px' touched={name.touched} valid={name.valid} changed={nameChangedHandler} />
                {!name.valid && name.touched ? <label className={classes.ErrorLabel}>Enter a Name </label> : null}

            </div>
            <div className={classes.InputContainer}>
                <label className={classes.Label}>Username</label>
                <Input value={username.value} type='text' placeholder='' width='300px' touched={username.touched} valid={username.valid} changed={usernameChangedHandler} />
                {!username.valid && username.touched ? <label className={classes.ErrorLabel}>Enter a Username </label> : null}

            </div>
            <div className={classes.InputContainer}>
                <label className={classes.Label}>Password</label>
                <Input value={password.value} type='password' placeholder='' width='300px' touched={password.touched} valid={password.valid} changed={passwordChangedHandler} />
                {!password.valid && password.touched ? <label className={classes.ErrorLabel}>Enter a Password </label> : null}

            </div>
            <div className={classes.InputContainer}>
                <label className={classes.Label}>E-mail</label>
                <Input value={email.value} type='email' placeholder='' width='300px' touched={email.touched} valid={name.valid} changed={emailChangedHandler} />
            </div>
            <Button clicked={signUp} width="200px">Sign Up</Button>
            <p style={{ marginBottom: 30 }}>Already a user? <label className={classes.SignIn} onClick={props.signInInstead}>Sign In</label></p>

        </div>
    )
}

export default SignUp;
