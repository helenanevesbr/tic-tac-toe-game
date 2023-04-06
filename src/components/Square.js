import React from 'react';


function Square(props) {
    return (
      <button className="square"
        onClick={props.onClick}>
        {props.value}
      </button>
    );
}

console.log("Square loaded")

export default Square;