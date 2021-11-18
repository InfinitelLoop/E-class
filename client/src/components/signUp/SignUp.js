import React, { useState } from 'react';
import axios from 'axios';

import Button from '../ui/button/Button';
import Input from '../ui/input/Input';
import classes from './SignUp.module.css';
import { encryptPassword } from '../../utility/common';
import actionType from '../../store/actionType';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();

    let attachedClass = [classes.SignUpModal];
    if (props.visible) {
        attachedClass.push(classes.Visible);
    }
    
    function signUp() {

        let obj = {
            name: name.value,
            username: username.value,
            password: encryptPassword(password.value),
            email: email.value,
            // myClasses: [], enrolledClasses: []
        }

        axios.post('http://localhost:3001/users/sign-up', obj)
            .then(res => {
                if (res.data === "SUCCESS") {
                    dispatch({
                        type: actionType.SHOW_SUCCESS_TOASTER,
                        payload: "Sign up Successful"
                    });
                    props.signInInstead();
                    setName(initialState);
                    setUsername(initialState);
                    setPassword(initialState);
                    setEmail(initialState);

                } else if(res.data==="Account with this username already exist.") {
                    dispatch({
                        type: actionType.SHOW_INFO_TOASTER,
                        payload: res.data
                    })
                } else if(res.data==="Account with this email already exist.") {
                    dispatch({
                        type: actionType.SHOW_INFO_TOASTER,
                        payload: res.data
                    })
                } else{
                    dispatch({
                        type: actionType.SHOW_ERROR_TOASTER,
                        payload: "Something went wrong! Try again later."
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: actionType.SHOW_ERROR_TOASTER,
                    payload: "Something went Wrong! Try again later."
                })
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
                updatedName.value = value;
                if (!updatedName.touched) {
                    updatedName.touched = true;
                }
                updatedName.valid = value.trim() === '' ? false : true;
                setName(updatedName);
                break;

            case 'username':
                let updatedUsername = { ...username };
                updatedUsername.value = value;
                if (!updatedUsername.touched) {
                    updatedUsername.touched = true;
                }
                updatedUsername.valid = value.trim() === '' ? false : true;
                setUsername(updatedUsername);
                break;

            case 'password':
                let updatePassword = { ...password };
                updatePassword.value = value;
                if (!updatePassword.touched) {
                    updatePassword.touched = true;
                }
                updatePassword.valid = value.trim() === '' ? false : true;
                setPassword(updatePassword);
                break;

            case 'email':
                let updatedEmail = { ...email };
                updatedEmail.value = value;
                if (!updatedEmail.touched) {
                    updatedEmail.touched = true;
                }
                updatedEmail.valid = value.trim() === '' ? false : true;
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
                <Input value={email.value} type='email' placeholder='' width='300px' touched={email.touched} valid={email.valid} changed={emailChangedHandler} />
            </div>
            <Button clicked={signUp} width="200px">Sign Up</Button>
            <p style={{ marginBottom: 30 }}>Already a user? <label className={classes.SignIn} onClick={props.signInInstead}>Sign In</label></p>

        </div>
    )
}

export default SignUp;
