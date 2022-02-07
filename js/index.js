document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('monster-container')
    const newMonster = document.getElementById('create-monster')
    let page = 1
    
    newMonsterForm()
    fetchMonsters()

    const back = document.getElementById("back")
    back.addEventListener('click', previousPage)
    back.disabled = true
    const forward = document.getElementById("forward")
    forward.addEventListener('click', nextPage)
    const name = document.getElementById('name')
    const age = document.getElementById('age')
    const description = document.getElementById('description')
    

    //Fetch first 50 monsters
    function fetchMonsters(){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(data => displayMonsters(data))
    }

    //Display monsters on the DOM
    function displayMonsters(arr){
        container.innerText = ''
        arr.forEach(monster => {createMonsterCard(monster)})
    }

    //Create Monster Card
    function createMonsterCard(monster){
        //console.log(monster)
        const fieldset = document.createElement('fieldset')
        const name = document.createElement('legend')
        const age = document.createElement('p')
        const description = document.createElement('p')

        name.innerText = monster.name
        age.innerText = `Age: ${monster.age}`
        description.innerText = monster.description

        container.appendChild(fieldset)
        fieldset.appendChild(name)
        fieldset.appendChild(age)
        fieldset.appendChild(description)

    }

    //Form to create a new monster
    function newMonsterForm(){
        const form = document.createElement('form')

        const nameLabel = document.createElement('label') 
        nameLabel.setAttribute('for', "name")
        nameLabel.innerText = 'Monster name'

        const nameInput = document.createElement('input') 
        nameInput.setAttribute('type', "text")
        nameInput.setAttribute('id', "name")

        const ageLabel = document.createElement('label') 
        ageLabel.setAttribute('for', "age")
        ageLabel.innerText = 'Age'

        const ageInput = document.createElement('input') 
        ageInput.setAttribute('type', "text")
        ageInput.setAttribute('id', "age")

        const descriptionLabel = document.createElement('label') 
        descriptionLabel.setAttribute('for', "description")
        descriptionLabel.innerText = 'Description'

        const descriptionInput = document.createElement('input') 
        descriptionInput.setAttribute('type', "text")
        descriptionInput.setAttribute('id', "description")
  
  
        const btn = document.createElement('input')
        btn.setAttribute('type', "submit") 
        btn.value = "Submit"

        newMonster.appendChild(form)
        form.appendChild(nameLabel)
        form.appendChild(nameInput)
        form.appendChild(ageLabel)
        form.appendChild(ageInput)
        form.appendChild(descriptionLabel)
        form.appendChild(descriptionInput)
        form.appendChild(btn)

        form.addEventListener('submit', handleSubmit)
    }

    
    //handle form submit
    function handleSubmit(event){
        event.preventDefault()
        //console.log(event.target)
       
        let monsterObj = {
            name: name.value,
            age: age.value,
            description: description.value
          }
        
        addMonster(monsterObj)
        createMonsterCard(monsterObj)
        name.value = ''
        age.value = ''
        description. value = ''
    }

    //add Monster to API
    function addMonster(monsterObj){
        fetch(`http://localhost:3000/monsters`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }, 
            body: JSON.stringify(monsterObj)
        })

        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    function nextPage(event){
        page++
        back.disabled = false
        console.log(page)
        fetchMonsters()
    }

    function previousPage(event){
        if (page > 1){
            page--
            fetchMonsters()
        }
        if(page === 1){
            back.disabled = true
        }
        console.log(page)
       
    }



})