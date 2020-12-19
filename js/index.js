


// DOM ELEMENTS // 
monsterContainer = document.querySelector('#monster-container') 
newMonsterForm = document.querySelector('#create-monster')
// newMonsterForm = document.querySelector('#create-monster')
// console.log(monsterContainer);

back = document.querySelector('#back')
forward = document.querySelector('#forward')
let page = 1;

// EVENT HANDLERS // 

newMonsterForm.addEventListener("submit", event => {
    event.preventDefault()
    
    monsterForm = document.querySelector('#monster-form') //helper 
    //console.log(monsterForm)
            
    const name = monsterForm.name.value
    const age = monsterForm.age.value 
    const description = monsterForm.description.value

    const newMonsterObj = {
        name: name,
        age: age,
        description: description
    }

    newMonster(newMonsterObj);

})

forward.addEventListener("click", event => {

    page++;
    monsterContainer.innerHTML = '';
    console.log(page)
    getMonsters();

})

back.addEventListener("click", event => {
    if (page != 1){
        page = page -1;
        monsterContainer.innerHTML = '';
        console.log(page)
        getMonsters();
    }
})

// RENDER FUNCTIONS //

function renderMonster(monsterObj) {
    monsterdiv = document.createElement('div')
    monsterdiv.innerHTML = `
         <h2>${monsterObj.name}</h2>
         <h4>Age: ${monsterObj.age}</h4>
         <p>Bio: ${monsterObj.description}</p>
    `
    // console.log(monsterdiv)
    monsterContainer.append(monsterdiv)
   
}


function renderNewMonsterForm(){
    newMonsterForm.innerHTML = `
        <form id="monster-form">
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button>Create</button></form>
        `

}



// FETCH FUNCTIONS // 

//get
function getMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=20&_page=${page}`)
    .then(resp => resp.json())
    .then(monstersArray => {
        monstersArray.forEach(monsterObj => {
            // console.log(monsterObj)
            renderMonster(monsterObj)
        }) 
    })
}

//new 
function newMonster(monsterObj){
    fetch('http://localhost:3000/monsters', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(monsterObj),
    })
    .then(response => response.json())
    .then(newObj => {
        console.log(newObj);
        renderMonster(newObj)
    })
}

// INITIAL RENDER // 

getMonsters();
renderNewMonsterForm();