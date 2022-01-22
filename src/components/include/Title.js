import React, { useEffect } from 'react'

const Title = (props) => {
    useEffect( () => {
        document.title = props.title;
        return () => {
            document.title = "";
        };
    });
    return (
        <div>
            
        </div>
    )
}

export default Title
