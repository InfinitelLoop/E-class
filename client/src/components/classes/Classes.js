import React from 'react'
import ClassCard from '../classCard/ClassCard';
import classes from './Classes.module.css';

const Classes = (props) => {
    return(
        <div className={classes.classes}>
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
        </div>
    )
}

export default Classes