import React from 'react';

const ClassView = (props) => {
    return (
        <div>
            this is class views

            <label onClick={props.close}>go back</label>
        </div>
    )
}

export default ClassView;
