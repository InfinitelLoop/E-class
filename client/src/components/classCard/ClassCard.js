import React from'react';

import classes from './ClassCard.module.css';

function ClassCard(props){
    let attachedClass = [classes.ClassCard];
    if(props.type==='Teacher'){
        attachedClass.push(classes.TeacherCard);
    } else {
        attachedClass.push(classes.StudentCard);
    }

    return(
        <div className={attachedClass.join(' ')}>
            {/* <div>

            </div>
            <div>

            </div> */}
            <h3>{props.name}</h3>
            <p>{props.subject}</p>
            <p>{props.section}</p>
            <p>{props.roomNo}</p> 
        </div>
    )
}

export default ClassCard;