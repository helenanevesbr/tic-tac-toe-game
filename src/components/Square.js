import React from 'react';


function Square(props) {
    return (
      <button className="square"
        onClick={props.onClick}>
          {/*When you click on a Square component, the onClick prop function that was passed down from the Board component gets called with the index of the clicked square as an argument.
          This onClick function was itself passed down from the Game component to the Board component, where it was bound to a specific index.
          This is the main way that the Game component knows when a square has been clicked.*/}

        {props.value}
      </button>
    );
}

export default Square;