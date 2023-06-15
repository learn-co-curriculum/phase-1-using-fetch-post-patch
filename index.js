(function(){

    const incrementAge = (id) => {

    }

    const renderDog = (dog) => {
        const displaySection = document.querySelector('section')
        const dogCard = document.createElement('article')
        const attributeUl = document.createElement('ul')

        for (const key in dog){
            const attributeLi = document.createElement('li')
            attributeLi.textContent = `${key}: ${dog[key]}`
            attributeUl.append(attributeLi)
        }

        dogCard.append(attributeUl)
        displaySection.append(dogCard)
    }

    const renderDogs = (dogs) => {
        dogs.forEach(renderDog)
    }

    const getDogs = () => {
        fetch('http://localhost:3000/dogs')
        .then(r => r.json())
        .then(dogData =>{
            renderDogs(dogData)
        })
    }

    const init = () =>{
        getDogs()
    }

    init()

})();

