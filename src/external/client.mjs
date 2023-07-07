export default function calculateWinner(){
  fetch('http://127.0.0.1:5000/calculatewinner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ squares: ["Y", "Y", "Y", null, null, null, null, null, null] }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('API response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

calculateWinner()