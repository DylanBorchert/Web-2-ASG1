

document.addEventListener("DOMContentLoaded", function() {
    let url = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';


    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => { doStuff(data, gallery) } )
    .catch(error => console.error(error)); 
    


const gallery = [];

console.log(gallery.length);



function displayContinents(continents) {
    for(let c of continents){
        gallery.push(c);
    }
}



createGalleryList(gallery);

function createGalleryList(gallery){
    const list = document.querySelector('#listOfGalleries ul');
    console.log(gallery);
    for(let i = 0; i < 10; i++) {
        console.log(gallery[i] );
    }
    // for(let g of gallery){
    //      let item = document.createElement('li');
    //      item.textContent = g.GalleryName;
    //     console.log(g);
    //      list.appendChild(item);
    //      console.log(item);
    // }
}
});
function doStuff(continents, gallery){
    const list = document.querySelector('#listOfGalleries ul');
   
    for (let c of continents) {
        gallery.push;
        
       
    const item = document.createElement('li');
    item.textContent = c.GalleryName;
    list.appendChild(item);
    }
}



