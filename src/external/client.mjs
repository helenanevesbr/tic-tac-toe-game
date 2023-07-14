export default function calculateWinner(squares){
  return fetch('http://127.0.0.1:5000/calculatewinner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ squares: squares }),
  })
  .then(response => response.json())
  .then(res => res.winner)
  /*
  Added another "then" because response.json() was returning a promise object and not the object with the winner property
  calculateWinner(squares), therefore was returning undefined everytime.
  */
}