const gallery = [];
let paintingList = [];
let table = "";
let currGallery = "";

// document.querySelector(".containerView").style.display = "none" // hides the 

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
        listGalleryDiv.appendChild(list);        

        listGalleryDiv.addEventListener("click", populate);
    }
    // listGalleryDiv.appendChild(list);        

    // listGalleryDiv.addEventListener("click", populate);
    

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

    function paintingCall(gallery, sort){
      currGallery = gallery;
        paintingList = [];
        let paintingContainer = document.querySelector("#paintings");
        let galleryLink = `https://www.randyconnolly.com/funwebdev/3rd/api/art/paintings.php?gallery=${gallery.GalleryID}`;
        //console.log(gallery);
        //let loader = document.querySelector("#loader2");
        //loader.style.display = "inline-block";
        //console.log(loader.style.display);
        //console.log(loader);
        fetch(galleryLink)
        .then(response => response.json())
        .then(data => { 

            paintingList.push(...data);
            

            paintingContainer.innerHTML = "";
            table = document.createElement("table");
            paintingContainer.appendChild(table);
            if(sort == "artists"){
              console.log("artist sort");
              paintingList.sort(compareArtist);
            }
            else if(sort == "title"){
              console.log("title sort");
              paintingList.sort(compareTitle);
              console.log(paintingList);
            }
            else if(sort == "year"){
              console.log("year sort");
              
              paintingList.sort(compareYear);
            }

           
            addTH(table);
          //paintingList.sort(compareArtist);
            for(let painting of paintingList){
                let tr = document.createElement("tr");
                table.appendChild(tr);

                addImage(painting, tr, "small");
                addTD(painting, tr);
                
                
                
                
                console.log(painting);
                

            }
            let getTable =  document.querySelector("table");
            console.log(getTable);
            getTable.addEventListener("click", tableClicks);

             let artistHeader = document.querySelector("#lastName");
             console.log(artistHeader);
             let lastNameHeader = document.querySelector("#title");
             console.log(lastNameHeader);
             let yearHeader = document.querySelector("#year");
             console.log(yearHeader);

            artistHeader.addEventListener("click", artistClick);
            lastNameHeader.addEventListener("click", artistClick);
            yearHeader.addEventListener("click", artistClick);
            


           // paintingContainer.addEventListener("click", printPaintingData);

        } )

    }

    function artistClick(e){
      console.log(e.target.id);
      if(e.target.id == "lastName"){
        paintingCall(currGallery, "artists");
      }
      else if(e.target.id == "title"){
        paintingCall(currGallery, "title");
      }
      else if(e.target.id == "year"){
        paintingCall(currGallery, "year");
      }
      
    //   console.log(e.target.id);
    //   table.textContent = "";
    //   console.dir(table);

    //   addTH(table);
    //   console.log(paintingList);
    //   console.log(paintingList);
    //   if(e.target.id = "artists"){
    //     paintingList.sort(compareArtist);
    //   }
    //   else if(e.target.id = "title"){
    //     paintingList.sort(compareTitle);
    //   }
    //   else if(e.target.id = "artist"){
    //     paintingList.sort(compareYear);
    //   }

    //   for(let painting of paintingList){
    //     let tr = document.createElement("tr");
    //     table.appendChild(tr);

    //     addImage(painting, tr, "small");
    //     addTD(painting.LastName, tr);
    //     addTD(painting.Title, tr);
    //     addTD(painting.YearOfWork, tr);
    // }

    }

    function tableClicks(e){
      console.log(e.target.nodeName);
      if(e.target.id == "paintingTitle"){
        console.log("apinting title found");
      }
      else if(e.target.nodeName == "IMG"){
        console.log("img found");
      }
      else if(e.target.nodeName == "TH"){
        console.log("table header found");
      }

    }

    function compareYear(a, b){
      let paintingOne = a.YearOfWork;
      let paintingTwo = b.YearOfWork;

      let compare = 0;
      if (paintingOne > paintingTwo){
        compare = 1;
      }
      else if(paintingOne < paintingTwo){
        compare = -1
      }
      return compare;
    }

    function compareTitle(a, b){
      let paintingOne = a.Title.toLowerCase();
      let paintingTwo = b.Title.toLowerCase();

      let compare = 0;
      if (paintingOne > paintingTwo){
        compare = 1;
      }
      else if(paintingOne < paintingTwo){
        compare = -1
      }
      return compare;
    }

    function compareArtist(a, b){
      let paintingOne = a.LastName.toLowerCase();
      let paintingTwo = b.LastName.toLowerCase();

      let compare = 0;
      if (paintingOne > paintingTwo){
        compare = 1;
      }
      else if(paintingOne < paintingTwo){
        compare = -1
      }
      return compare;
    }

    function addTH(table){
      tr = document.createElement("tr");
      tr.setAttribute("id","tableHeader");
      table.appendChild(tr);
      empty = document.createElement("tr");
      tr.appendChild(empty);
      artist = document.createElement("th");
      artist.setAttribute("id","lastName");
      lastName = document.createElement("th");
      lastName.setAttribute("id","title");
      creationYear = document.createElement("th");
      creationYear.setAttribute("id","year");

      artist.textContent = "Artist";
      lastName.textContent = "Title";
      creationYear.textContent = "Year";

      tr.appendChild(artist);
//      console.log(typeof(name));
//      console.log(typeof(artist));
      tr.appendChild(lastName);
      tr.appendChild(creationYear);
    }

    function addTD(painting, node){

      let nameTD = document.createElement("td");
      nameTD.textContent = painting.LastName;

      let titleTD = document.createElement("td");
      titleTD.textContent = painting.Title;
      titleTD.setAttribute("id", "paintingTitle");
    
      let yearTD = document.createElement("td")
      yearTD.textContent = painting.YearOfWork;
    
      node.appendChild(nameTD);
      node.appendChild(titleTD);
      node.appendChild(yearTD);
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

    function paintingView() {
      const containerGallery = document.querySelector(".containerGallery");
      const containerView = document.querySelector(".containerView");
      containerGallery.style.display = "none"
      containerView.style.display = "grid"
    }
/*
    function printPaintingData(e){
      console.log(e.target);
      console.log(paintingList[0]);
    }
*/

});

var map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: { lat: 0, lng: 50 },
      styles: [
        { elementType: "geometry", stylers: [{ color: "#D9DCD6" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#93817c" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{ color: "#a5b076" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#447530" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#f5f1e6" }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#fdfcf8" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#C03221" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#222222" }],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [{ color: "#C03221" }],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry.stroke",
          stylers: [{ color: "#222222" }],
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [{ color: "#806b63" }],
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [{ color: "#FF8600" }],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.fill",
          stylers: [{ color: "#8f7d77" }],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ebe3cd" }],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#b9d3c2" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#92998d" }],
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