

document.addEventListener("DOMContentLoaded", function() {
    let url = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';


    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => { displayContinents(data) } )
    .catch(error => console.error(error)); 
    
});

<<<<<<< HEAD
const gallery = []

function displayContinents(continents) {
    for(let c of continents) {
        gallery.push(c);
    }
    console.log(gallery);
}

   
=======
const gallery = [];


function displayContinents(continents) {
    for(let c of continents){
        gallery.push(c);
    }
}

/*
    const list = document.querySelector('#listOfGalleries ul');
   
    for (let c of continents) {
        array += c;
        console.log(array.GalleryName);
       
    const item = document.createElement('li');
    item.textContent = c.GalleryName;
    list.appendChild(item);
    }
   } 

   function createArray(data, array) {
    for(let d of data){
        array = d;
    }
*/
>>>>>>> 09e99d80ac697e999707c862592cc18541986947
