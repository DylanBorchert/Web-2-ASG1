const gallery = [];
let paintingList = [];

document.addEventListener("DOMContentLoaded", function() {
    let url = 'https://www.randyconnolly.com/funwebdev/3rd/api/art/galleries.php';

    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => { displayContinents(data) } )
    .catch(error => console.error("Fetch Error :- " + error)); 

    let listOfGalleries = document.querySelector("#listOfGalleries");
    let mapContainer = document.querySelector("#map");
    let galleryMap = document.querySelector("#galleryMap");
    let galleryInfo = document.querySelector("#galleryInfo");
    let paintings = document.querySelector("#paintings");
    //console.log(mapContainer); 
    mapContainer.style.display = "none";
    galleryMap.style.display = "none";
    galleryInfo.style.display = "none";
    paintings.style.display = "none";
    listOfGalleries.style.gridColumn = "1/4";


function displayContinents(continents) {
    for(let c of continents){
        gallery.push(c);
    }

    const listGalleryDiv = document.querySelector('#listOfGalleries');
    const list = document.createElement("ul")
    for(let g of gallery){
        let item = document.createElement('li');
        item.textContent = g.GalleryName;
        list.appendChild(item);
    }
    listGalleryDiv.appendChild(list);        

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
        galleryMap.style.display = "block";
        galleryInfo.style.display = "block";
        paintings.style.display = "block";
        listOfGalleries.style.gridColumn = "1/2";

        for (let g of gallery){
            if(g.GalleryName == nameList.textContent){
                console.warn("Line 47 loop run with " + g);
                
                
                addLI(`Gallery Name: ${g.GalleryName}`, ul);
                addLI(g.GalleryNativeName, ul);
                addLI(`${g.GalleryCity}, ${g.GalleryCountry}`, ul);
                addLI(g.GalleryAddress, ul);

                let listItem = document.createElement('li');
                let link = document.createElement('a');
                link.setAttribute('href', `${g.GalleryWebSite}`);
                link.textContent = "Gallery Web Site";
                listItem.appendChild(link);
                ul.appendChild(listItem);

          
                changeLocation(g.Latitude,g.Longitude);

                paintingCall(g);

            }
        }
    }


}

    function paintingCall(gallery){
        paintingList = [];
        let paintingContainer = document.querySelector("#paintings");
        let galleryLink = `https://www.randyconnolly.com/funwebdev/3rd/api/art/paintings.php?gallery=${gallery.GalleryID}`;
        //let loader = document.querySelector("#loader2");
        //loader.style.display = "inline-block";
        //console.log(loader.style.display);
        //console.log(loader);
        fetch(galleryLink)
        .then(response => response.json())
        .then(data => { 

            paintingList.push(...data);
            paintingContainer.innerHTML = "";
            let table = document.createElement("table");
            paintingContainer.appendChild(table);
           
            addTH(table);

            for(let painting of paintingList){
                let tr = document.createElement("tr");
                table.appendChild(tr);

                addImage(painting, tr, "small");
                addTD(painting.LastName, tr);
                addTD(painting.Title, tr);
                addTD(painting.YearOfWork, tr);
              
                
                
                
                console.log(painting);


            }

            paintingContainer.addEventListener("click", printPaintingData);

        } )

    }

    function addTH(table){
      tr = document.createElement("tr");
      table.appendChild(tr);
      img = document.createElement("th");
      lastName = document.createElement("th");
      creationYear = document.createElement("th");

      img.textContent = "Image";
      lastName.textContent = "Name";
      creationYear.textContent = "Year";

      tr.appendChild(img);
      console.log(typeof(name));
      console.log(typeof(img));
      tr.appendChild(lastName);
      tr.appendChild(creationYear);
    }

    function addTD(element, tr){
      td1 = document.createElement("td");
      tr.appendChild(td1);
      td1.textContent = element;

    }

    function addImage(painting, ul, size){
        let listItem = document.createElement('img');
        if (size == "medium"){listItem.setAttribute("src", `https://res.cloudinary.com/funwebdev/image/upload/w_${painting.Height}/art/paintings/${painting.ImageFileName}`) }; //`<img src="https://res.cloudinary.com/funwebdev/image/upload/small/art/paintings/${painting.ImageFileName}">`;
        if (size == "small"){
          listItem.setAttribute("src", `https://res.cloudinary.com/funwebdev/image/upload/w_${painting.Height}/art/paintings/square/${painting.ImageFileName}`); 
        
          listItem.setAttribute("width", "100");
          listItem.setAttribute("height", "auto");
        } 

        ul.appendChild(listItem);
        
    }

    function printPaintingData(e){
      console.log(e.target);
      console.log(paintingList[0]);
    }


});

var map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: { lat: 0, lng: 50 },
      styles: [
        {
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#616161" }],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [{ color: "#bdbdbd" }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#eeeeee" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#757575" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#e5e5e5" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9e9e9e" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#81C3D7" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.text.fill",
          stylers: [{ color: "#3A7CA5" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#2F6690" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#2F6690" }],
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9e9e9e" }],
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [{ color: "#e5e5e5" }],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [{ color: "#eeeeee" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#D9DCD6" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9e9e9e" }],
        },
      ],
    });
}

function changeLocation(latValue, lngValue) {
    myLatLng = new google.maps.LatLng({lat: latValue, lng: lngValue});
    new google.maps.Marker({position: {lat: latValue, lng: lngValue}, map: map}); 
    map.panTo(myLatLng);
    map.setZoom(18);
}