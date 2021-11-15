import React, { useState } from 'react';
import Cover from '../../assets/images/Cover.svg';
import SignIn from '../signIn/SignIn';
import SignUp from '../signUp/SignUp';
import classes from './Welcome.module.css';
import Button from '../ui/button/Button';

const Welcome = (props) => {

    
    const [openSignInModal, setOpenSignInModal] = useState(false);
    const [openSignUpModal, setOpenSignUpModal] = useState(false);
    
    function signIn() {
        setOpenSignInModal(true);
        console.log('opening signin modal')
    }
    
    function signUp() {
        setOpenSignUpModal(true);
        console.log('opening signup modal')
    }

    function signUpInstead(){
        setOpenSignInModal(false);
        setOpenSignUpModal(true);
    }
    
    function signInInstead(){
        setOpenSignUpModal(false);
        setOpenSignInModal(true);
    }
    
    let attachedClass=[classes.Welcome];
    if(openSignInModal || openSignUpModal){
        attachedClass.push(classes.Slide);
    }

    return (
        <div style={{
            backgroundImage: `url(${Cover})`,
        }} className={classes.Background}>
            <SignIn visible={openSignInModal} signUpInstead={signUpInstead} login={ props.login}/>
            <SignUp visible={openSignUpModal} signInInstead={signInInstead} />
            <div className={attachedClass.join(' ')}>

                <label style={{
                    color: "#fff",
                    fontSize: "88px",
                    textAlign: "center",
                    marginBottom: 24
                }}>Welcome to E-Class</label>
                <p style={{
                    color: "#fff",
                    fontSize: "22px",
                    textAlign: "center",
                    marginBottom: 24
                }}>Organise your classes, enroll for offline lectures,Schedule lectures and announcements and stay updated. </p>
                <label style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <Button type="Secondary" clicked={signIn} height="50px" width="250px" >
                        Sign In
                </Button>
                    <Button clicked={signUp} backgroundColor="#6bd4cd" height="50px" width="250px" color="#185473">
                        Sign Up
                </Button>
                </label>
            </div>
        </div>
    )
}

export default Welcome;