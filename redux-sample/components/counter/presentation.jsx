import React from 'react';


const Counter = ({ count, increment, decrement }) => {

    return(
        <div>
            <p>{ count }</p>
            <button onClick={() => increment(1)}>+</button>
            <button onClick={() => decrement(1)}>-</button>
        </div>
    )
};

export default Counter;