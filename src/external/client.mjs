function calculateWinner(squares){
  return fetch('http://127.0.0.1:5000/calculatewinner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ squares: squares }),
  })
  .then(response => response.json())
  .then(res => res.winner)
}

function aiPlay(squares, marker){
  return fetch('http://127.0.0.1:5000/aiplay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      squares : squares,
      marker : marker,
    }),
  })
  .then(response => response.json())
  .then(res => res.squares)
}

export { calculateWinner, aiPlay };