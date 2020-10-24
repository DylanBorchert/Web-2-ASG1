const gallery = [];
let paintingList = [];
let table = "";
let currGallery = "";

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
              if( g.GalleryName != g.GalleryNativeName) { addLI(`Native Name: ${g.GalleryNativeName}`, ul);}
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

function paintingView() {
  const containerGallery = document.querySelector(".containerGallery");
  const containerView = document.querySelector(".containerView");
  containerGallery.style.display = "none"
  containerView.style.display = "grid"
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
        console.log("pinting title found");
        paintingView();
        console.log(e.target);
        let divPaintingView = document.querySelector("#painingView");
        console.log(paintingList);
        for(let painting of paintingList){
          if (e.target.innerHTML == painting.Title){
            console.log("got it");
            divPaintingView.textContent = "";
            addImage(painting, divPaintingView, "medium");
            
            let h2 = document.createElement("h2");
            divPaintingView.appendChild(h2);
            h2.textContent = `Painting Title: ${painting.Title}`;
            
            let artistName = document.createElement("p");
            divPaintingView.appendChild(artistName);
            artistName.textContent = `Painters Name: ${painting.FirstName} ${painting.LastName}`;
            
            let galleryName = document.createElement("p");
            divPaintingView.appendChild(galleryName);
            galleryName.textContent = `Gallery Name: ${painting.GalleryName}`;
            
            let MuseumLink = document.createElement("a");
            divPaintingView.appendChild(MuseumLink);
            MuseumLink.setAttribute("href", `${painting.MuseumLink}`);
            MuseumLink.textContent = `Link: ${painting.GalleryName}`;
            
            let galleryCity = document.createElement("p");
            divPaintingView.appendChild(galleryCity);
            galleryCity.textContent = `Gallery City: ${painting.GalleryCity}`;
            
            let copyright = document.createElement("p");
            divPaintingView.appendChild(copyright);
            copyright.textContent = `Copyright: ${painting.CopyrightText}`;
            
            let workYear = document.createElement("p");
            divPaintingView.appendChild(workYear);
            workYear.textContent = `Year Of Work: ${painting.YearOfWork}`;
            
            let paintingMedium = document.createElement("p");
            divPaintingView.appendChild(paintingMedium);
            paintingMedium.textContent = `Painting Medium: ${painting.Medium}`;

            let paintingWidth = document.createElement("p");
            divPaintingView.appendChild(paintingWidth);
            paintingWidth.textContent = `Painting Width: ${painting.Width}`;

            let paintingHeight = document.createElement("p");
            divPaintingView.appendChild(paintingHeight);
            paintingHeight.textContent = `Painting Height: ${painting.Height}`;

            let description = document.createElement("p");
            divPaintingView.appendChild(description);
            description.textContent = `Description: ${painting.Description}`;


            
            let returnButton = document.createElement("p");
            divPaintingView.appendChild(returnButton);
            returnButton.textContent = "return";
            returnButton.addEventListener("click", returnButtonFunction);

            // Title, FirstName, LastName, Title, GalleryName,
            // GalleryCity, MuseumLink and (working as a link), CopyrightText, YearOfWork, Width,
            // Height, Medium, and Description. 
          }
        }
        
      }
      else if(e.target.nodeName == "IMG"){
        console.log("img found");
      }
      else if(e.target.nodeName == "TH"){
        console.log("table header found");
      }

    }

    function returnButtonFunction(){
      const containerGallery = document.querySelector(".containerGallery");
      const containerView = document.querySelector(".containerView");
      containerGallery.style.display = "grid";
      containerView.style.display = "none";
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
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#193341"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2c5a71"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#29768a"
                },
                {
                    "lightness": -37
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#406d80"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#406d80"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#3e606f"
                },
                {
                    "weight": 2
                },
                {
                    "gamma": 0.84
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "weight": 0.6
                },
                {
                    "color": "#1a3541"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2c5a71"
                }
            ]
        }
    ],
    });
}

function changeLocation(latValue, lngValue) {
    myLatLng = new google.maps.LatLng({lat: latValue, lng: lngValue});
    new google.maps.Marker({position: {lat: latValue, lng: lngValue}, map: map}); 
    map.panTo(myLatLng);
    map.setZoom(18);
}