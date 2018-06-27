const {map, filter, throttleTime, debounceTime} = rxjs.operators;

const btnSearch = document.querySelector('button');
const dispResult = document.querySelector('#displayResult');

var groupLetter = document.getElementById('txt_group').value;



document.getElementById("txt_group").addEventListener("keyup", function() {
  groupLetter =  document.getElementById('txt_group').value;
  console.log("Group Letter: " + groupLetter);
}, false);


btnSearch.addEventListener('click', () => {
  fetchTeam();
});

async function fetchTeam() {
  const URL = "https://worldcup.sfg.io/teams/group_results";
  
  try {
    const fetchResult = fetch(URL);
    const response = await fetchResult;
    if (response.ok) {
      const jsonData = await response.json();
      dispResult.innerHTML = displayTeam(jsonData);
    } else {
      dispResult.innerHTML = `Response.Status: ${response.status}`;
    }
  } catch (e) {
    dispResult.innerHTML = e;
  }
}


function displayTeam(jsonResult) {
var {from, of} = rxjs; 

var gl;
from(jsonResult).pipe(
   filter(g => (g.letter == groupLetter))
  ).subscribe(g => gl = g);

   console.log(`g.letter == ${groupLetter}`)
console.log(gl);
var  temp= [];

of(gl).pipe(
    map(ot => ot.ordered_teams)
).subscribe(ot => temp = ot);
console.log("ot"+temp);

return `<table border="2"> <tr><th>Country</th><th>Played</th><th>Wins-Draws-Lost</th><th>Goals</th><th>Goal Difference</th><th>Points</th></tr>${temp.map( team => `
<tr><td>${team.country}</td><td> ${team.games_played}</td><td> ${team.wins} - ${team.draws} - ${team.losses}</td><td>${team.goals_for} - ${team.goals_against}</td> <td>${team.goal_differential}</td> <td>${team.points}</td></tr>`).join('')}</table>`;
  
}

