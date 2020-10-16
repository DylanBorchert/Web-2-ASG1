

document.addEventListener("DOMContentLoaded", function() {
    let url = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';


    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => { displayContinents(data) } )
//    .then( data => {array = alpha.util.polish(data)['data']})
    .catch(error => console.error(error)); 

//    console.log(array);    
    
});



function displayContinents(continents) {
    const list = document.querySelector('#listOfGalleries ul');
   
    for (let c of continents) {
        
        //console.log(c.GalleryName);
       
    const item = document.createElement('li');
    item.textContent = c.GalleryName;
    list.appendChild(item);
    }
   } 

   function createArray(data, array) {
    for(let d of data){
        array = d;
    }
}

   