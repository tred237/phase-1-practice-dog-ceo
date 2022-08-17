const init = () => {

    console.log('%c HI', 'color: firebrick');

    dogImages();
    dogBreeds();

    function dogImages(){
        const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

        fetch(imgUrl)
        .then(res => res.json())
        .then(data => {
            const dogImageContainer = document.getElementById('dog-image-container'); 
            data.message.forEach(element => {
                const image = document.createElement('img');
                image.src = element;
                image.alt = 'dog-picture';
                dogImageContainer.appendChild(image);
            })
        });
    }

    function dogBreeds(){
        const breedUrl = 'https://dog.ceo/api/breeds/list/all';

        fetch(breedUrl)
        .then(res => res.json())
        .then(data => {
            const dogBreedsList = document.getElementById('dog-breeds');
            for(breed in data.message){
                if (data.message[breed].length > 0) {
                    data.message[breed].forEach(element => {
                        const li = document.createElement('li');
                        li.className = 'dog-breed';
                        li.id = `breed-${breed}-${element}`;
                        li.textContent = `${breed} ${element}`;
                        dogBreedsList.appendChild(li);
                    })
                } else {
                    const li = document.createElement('li');
                    li.className = 'dog-breed';
                    li.id = `breed-${breed}`;
                    li.textContent = breed;
                    dogBreedsList.appendChild(li);
                }
            }
        })
        .then(() => {
            const dogBreedsListElements = document.querySelectorAll('.dog-breed');
            const dropDown = document.getElementById('breed-dropdown');

            dogBreedsListElements.forEach(element => {
                element.addEventListener('click', event => event.target.style.color = 'red');
            })
            
            dropDown.addEventListener('change', handleDropDown);

            function handleDropDown(event) {
                dogBreedsListElements.forEach(element => {
                    if(!element.textContent.startsWith(event.target.value)) {
                        element.hidden = 'true'
                    } else {
                        element.removeAttribute('hidden');
                    }
                })
            }
        })
    }
}

addEventListener('DOMContentLoaded',init);