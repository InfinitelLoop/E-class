import React from 'react'
import { NavLink } from 'react-router-dom';

import classes from './Sidebar.module.css';
import Button from '../ui/button/Button';


function Sidebar(props) {

    return (
        <div className={classes.sidebar}>

            <p>Welcome Chetna</p>

            <ul className={classes.ul}>
                <NavLink to="/classes"
                    className={classes.Inactive}
                    activeClassName={classes.ActiveClass}
                    activeStyle={{
                        color: '#58c6d5',
                    }}
                >
                    <li className={classes.li}>Classes</li>
                </NavLink>

                <NavLink to="/my-subjects"
                    className={classes.Inactive}
                    activeClassName={classes.ActiveClass}
                    activeStyle={{
                        color: '#58c6d5',
                    }}>
                    <li className={classes.li}>My Subjects</li>
                </NavLink>

                <NavLink to="/scheduler"
                    className={classes.Inactive}
                    activeClassName={classes.ActiveClass}
                    activeStyle={{
                        color: '#58c6d5',
                    }}>
                    <li className={classes.li}>Scheduler</li>
                </NavLink>

                <NavLink to="/settings"
                    className={classes.Inactive}
                    activeClassName={classes.ActiveClass}
                    activeStyle={{
                        color: '#58c6d5',
                    }}>
                    <li className={classes.li}>Settings</li>
                </NavLink>
            </ul>
            
            <Button clicked={props.logout} width="200px">Sign Out</Button>
        </div>
    )
}

export default Sidebar