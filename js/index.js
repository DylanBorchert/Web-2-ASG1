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
 function addLI (content, ul){
    let listItem = document.createElement('li');
    listItem.value = `${content}`;
    listItem.textContent = content;
    ul.appendChild(listItem);

    return listItem;

}

function populate(e){

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

                paintingCall(g);

            }
        }
    }


}

    function paintingCall(gallery){
        let paintingList = [];
        let paintingContainer = document.querySelector("#paintings");
        let galleryLink = `https://www.randyconnolly.com/funwebdev/3rd/api/art/paintings.php?gallery=${gallery.GalleryID}`
        fetch(galleryLink)
        .then(response => response.json())
        .then(data => { 

            paintingList.push(...data);
            paintingContainer.innerHTML = "";
            let ul = document.createElement("ul");
            paintingContainer.appendChild(ul);

            for(let painting of paintingList){
                
                li = addLI(painting.Title, ul);
                
                console.log(painting);
                addImage(painting, ul);

            }

        } )

    }

    function addImage(painting, ul){
        let listItem = document.createElement('img');
        listItem.setAttribute("src", `https://res.cloudinary.com/funwebdev/image/upload/w_${painting.Height}/art/paintings/${painting.ImageFileName}`); //`<img src="https://res.cloudinary.com/funwebdev/image/upload/small/art/paintings/${painting.ImageFileName}">`;
        listItem.setAttribute("width", "100");
        listItem.setAttribute("height", "100");
        ul.appendChild(listItem);
        
    }


});

var map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: { lat: -10.363882, lng: 50.044922 }
    });
}

function changeLocation(latValue, lngValue) {
    myLatLng = new google.maps.LatLng({lat: latValue, lng: lngValue});
    new google.maps.Marker({position: {lat: latValue, lng: lngValue}, map: map}); 
    map.panTo(myLatLng);
}
