

document.addEventListener("DOMContentLoaded", function() {
    let url = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';


    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => { createGalleryList(data) } )
    .catch(error => console.error(error)); 
    

const gallery = [];


function createGalleryList(continents) {
    for(let c of continents){
        gallery.push(c);
    }
    console.log(gallery);
    const list = document.querySelector('#listOfGalleries ul');
    for(let g of gallery){
            let item = document.createElement('li');
            item.textContent = g.GalleryName;
        console.log(g);
            list.appendChild(item);
            console.log(item);
    }

}



// createGalleryList(gallery);

// function createGalleryList(gallery){
//     const list = document.querySelector('#listOfGalleries ul');
//     console.log(gallery);
//     for(let i = 0; i < 10; i++) {
//         console.log(gallery[i] );
//     }
//     // for(let g of gallery){
//     //      let item = document.createElement('li');
//     //      item.textContent = g.GalleryName;
//     //     console.log(g);
//     //      list.appendChild(item);
//     //      console.log(item);
//     // }
// }
});
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
