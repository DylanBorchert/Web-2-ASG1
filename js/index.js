const gallery = [];

document.addEventListener("DOMContentLoaded", function() {
    let url = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';


    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => { displayContinents(data) } )
    .catch(error => console.error(error)); 


function displayContinents(continents) {
    for(let c of continents){
        gallery.push(c);
    }
    console.log(gallery);
    const list = document.querySelector('#listOfGalleries ul');
    for(let g of gallery){
        let item = document.createElement('li');
        item.textContent = g.GalleryName;
        list.appendChild(item);
    }
    console.log(gallery);
    let div = document.querySelector(".containerGallery");
    console.log(div);
        
        div.addEventListener("click", populate);
    

}


function populate(e){
    let nameList = e.target.querySelector('li');
    console.log(nameList);
    let innerDiv = document.querySelector("div #galleryInfo");
    let ul = document.createElement('ul');
    innerDiv.appendChild(ul);
    for (let g of gallery){
        if(g.GalleryName == nameList.GalleryName){
            console.log(g);
            addLI(g.GalleryName, ul);
            addLI(g.GalleryNativeName, ul);
            addLI(g.GalleryCity, ul);
            addLI(g.GalleryAddress, ul);
            addLI(g.GalleryCountry, ul);

            let listItem = document.createElement('li');
            let link = document.createElement('a');
            link.setAttribute('href', `g.GalleryWebSite`);
            link.textContent = "link";
            listItem.appendChild(link);
            ul.appendChild(listItem);
        
    
        }
    }


}

function addLI (content, ul){
    let listItem = document.createElement('li');
    listItem.textContent = content;
    ul.appendChild(listItem);
}

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.89474, lng: 12.4839},
    zoom: 6
    });
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