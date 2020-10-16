

document.addEventListener("DOMContentLoaded", function() {
    let url = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';


    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => { displayContinents(data) } )
    .catch(error => console.error(error)); 
    
});

const gallery = []

function displayContinents(continents) {
    for(let c of continents) {
        gallery.push(c);
    }
    console.log(gallery);
}

   