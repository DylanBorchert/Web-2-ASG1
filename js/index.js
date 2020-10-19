const gallery = [];

document.addEventListener("DOMContentLoaded", function() {
    let url = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';

    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => { displayContinents(data) } )
    .catch(error => console.error("Fetch Error :- " + error)); 


    let mapContainer = document.querySelector("#map");
    console.log(mapContainer); 
    mapContainer.style.display = "none";

function displayContinents(continents) {
    for(let c of continents){
        gallery.push(c);
    }
    console.log(gallery);
    const listGalleryDiv = document.querySelector('#listOfGalleries');
    const list = document.createElement("ul")
    for(let g of gallery){
        let item = document.createElement('li');
        item.textContent = g.GalleryName;
        list.appendChild(item);
    }
    listGalleryDiv.appendChild(list);        
    console.log(gallery);
    listGalleryDiv.addEventListener("click", populate);
    

}


function populate(e){
    const addLI = function addLI (content, ul){
        let listItem = document.createElement('li');
        listItem.textContent = content;
        ul.appendChild(listItem);
    }
    if(e.target.nodeName.toLowerCase() == "li") {
        let nameList = e.target;
        console.log(nameList);
        let innerDiv = document.querySelector("div #galleryInfo");
        innerDiv.innerHTML = "";
        let ul = document.createElement('ul');
        innerDiv.appendChild(ul);

        mapContainer.style.display = "block";
        

        for (let g of gallery){
            if(g.GalleryName == nameList.textContent){
                console.warn("Line 47 loop run with " + g);
                
                
                addLI(g.GalleryName, ul);
                addLI(g.GalleryNativeName, ul);
                addLI(g.GalleryCity, ul);
                addLI(g.GalleryAddress, ul);
                addLI(g.GalleryCountry, ul);

                let listItem = document.createElement('li');
                let link = document.createElement('a');
                link.setAttribute('href', `${g.GalleryWebSite}`);
                link.textContent = "link";
                listItem.appendChild(link);
                ul.appendChild(listItem);

                console.log(g);
                changeLocation(g.Latitude,g.Longitude);

            }
        }
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

var map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: -10.363882, lng: 50.044922 },
    });
}

function changeLocation(latValue, lngValue) {
    myLatLng = new google.maps.LatLng({lat: latValue, lng: lngValue});
    new google.maps.Marker({position: {lat: latValue, lng: lngValue}, map: map}); 
    map.panTo(myLatLng);
}
