import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import classes from './Sidebar.module.css';
import Button from '../ui/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import actionType from '../../store/actionType';
import Logo from '../../assets/images/logo1.svg';
import AddIcon from '../../assets/images/add.svg';
import Options from '../ui/options/Options';
import CreateClass from '../modals/createClassModal/CreateClass';
import JoinClass from '../modals/joinClassModal/JoinClass';
import Backdrop from '../modals/backdrop/Backdrop';


function Sidebar(props) {

    const dispatch = useDispatch();
    const username = useSelector(state => state.auth.username);
    const [showAddOptions, setShowAddOptions] = useState(false);


    const [showCreateClassModal, setShowCreateClassModal] = useState(false);
    const [showJoinClassModal, setShowJoinClassModal] = useState(false);

    function openCreateModal() {
        setShowCreateClassModal(true);
    }

    function openJoinModal() {
        setShowJoinClassModal(true);
    }
    function closeCreateModal() {
        setShowCreateClassModal(false);
    }

    function closeJoinModal() {
        setShowJoinClassModal(false);
    }



    function signOut() {
        let action = {
            type: actionType.SIGN_OUT
        }
        dispatch(action);
    }

    return (
        <div className={classes.sidebar}>

            {showCreateClassModal ? <Backdrop closeModal={closeCreateModal} >
                <CreateClass closeModal={closeCreateModal} />
            </Backdrop> : null}
            {showJoinClassModal ? <Backdrop closeModal={closeJoinModal} >
                <JoinClass closeModal={closeJoinModal} />
            </Backdrop> : null}

            <label className={classes.LogoContainer}>
                <img src={Logo} alt="Logo" style={{ width: '75px', marginLeft: 24 }} />
                <label style={{ fontSize: '48px', fontWeight: 400, marginLeft: 24, whiteSpace: 'nowrap' }}>E-Class</label>
            </label>

            <ul className={classes.ul}>
                <NavLink to="/classes"
                    className={classes.Inactive}
                // activeClassName={classes.ActiveClass}
                // activeStyle={{
                //     color: '#185473',
                // }}
                >
                    <li className={classes.li}>Classes</li>
                </NavLink>

                {/* <NavLink to="/my-subjects"
                    className={classes.Inactive}
                    activeClassName={classes.ActiveClass}
                    activeStyle={{
                        color: '#185473',
                    }}>
                    <li className={classes.li}>My Subjects</li>
                </NavLink> */}

                <NavLink to="/scheduler"
                    className={classes.Inactive}
                // activeClassName={classes.ActiveClass}
                // activeStyle={{
                //     color: '#185473',
                // }}
                >
                    <li className={classes.li}>Scheduler</li>
                </NavLink>

                {/* <NavLink to="/settings"
                    className={classes.Inactive}
                    activeClassName={classes.ActiveClass}
                    activeStyle={{
                        color: '#185473',
                    }}>
                    <li className={classes.li}>Settings</li>
                </NavLink> */}
            </ul>

            <div className={classes.ProfileContainer}>
                <div className={classes.AddIcon}><img src={AddIcon} alt='add' onClick={() => setShowAddOptions(!showAddOptions)} /></div>
                {showAddOptions ? <Options options={[
                    { value: "Create", clicked: openCreateModal },
                    { value: "Join", clicked: openJoinModal }
                ]} style={{

                }} /> : null}
                {username}
                <Button clicked={signOut} width="100px">Sign Out</Button>
            </div>
        </div>
    )
}

export default Sidebar