import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {

    let style = {};
    let attachedClasses = [classes.Input];

    if (props.touched && !props.valid) {
        attachedClasses.push(classes.Invalid);
    }

    if (props.width) {
        style['width'] = props.width;
    }

    let myInput = <input value={props.value} type="text" placeholder={props.placeholder} style={style} className={attachedClasses.join(' ')} onChange={props.changed} />;

    switch (props.type) {
        case 'text': myInput = <input value={props.value} type="text" placeholder={props.placeholder} style={style} className={attachedClasses.join(' ')} onChange={props.changed} />; break;
        case "password": myInput = <input value={props.value} type="password" placeholder={props.placeholder} style={style} className={attachedClasses.join(' ')} onChange={props.changed} />; break;
        case 'email': myInput = <input value={props.value} type="email" placeholder={props.placeholder} style={style} className={attachedClasses.join(' ')} onChange={props.changed} />; break;
        default: break;
    }

    return (
        <React.Fragment>
            { myInput}
        </React.Fragment>
    );
}

export default Input;
