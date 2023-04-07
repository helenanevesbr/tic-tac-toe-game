import React from 'react';


function Square(props) {
    return (
      <button className="square"
        onClick={props.onClick}>
          {/*The onClick prop passed down to the Square component is a function that calls the handleClick() in the Game component*/}

        {props.value}
      </button>
    );
}

console.log("Square loaded")

export default Square;