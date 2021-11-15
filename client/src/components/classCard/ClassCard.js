import React from'react';

import classes from './ClassCard.module.css';

function ClassCard(props){
    return(
        <div className={classes.ClassCard}>
            <h3>Class Name</h3>
            <p>Section</p>
            <p>Teacher's name</p>
            
        </div>
    )
}

export default ClassCard;