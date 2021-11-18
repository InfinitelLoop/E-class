import React from 'react';

import classes from './Options.module.css';

const Options = (props) => {

    /*
    options = [
        {value: 'ADD', clicked: addHandler},
        {value: 'JOIN', clicked: JoinHandler},
        .
        .
        .
    ]
    */

    return (
        <div className={classes.Options}>
            {
                props.options.map(row => <Option value={row.value} clicked={row.clicked} />)
            }
        </div>
    )
}

export default Options;



const Option = (props) => {
    return (
        <div className={classes.Option} onClick={props.clicked}>
            <label style={{cursor: 'pointer'}}>{props.value}</label>
        </div>
    )
}
