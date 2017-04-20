//var lng = document.getElementsByName('lng')[0];
//var lat = document.getElementsByName('lat')[0];
//var city = document.getElementsByName('city')[0];
//var state = document.getElementsByName('state')[0];
//
//
//// initialize the google map
//function initMap() {
//    var googleMap = document.getElementById('map');
//    var thisMarker= null;
//    var mapProp= {
//        center:new google.maps.LatLng(6.9243, 79.868),
//        zoom:15,
//    };
//    
//    var map=new google.maps.Map(googleMap,mapProp);
//    
//// add a event listener to the map to create the marker  
//    map.addListener('click', function(e){
//        
//        placeMarker(e.latLng , map);
//        console.log(e);
//    });
//
////create the marker object
//    function placeMarker(latLng , map){
//        checkMarker();
//        var marker = new google.maps.Marker({
//            position:latLng,
//            map:map
//        });
//        thisMarker = marker;
//         map.panTo(latLng);
//        
//        // change the form lat and lng input fields
//        lat.value = latLng.lat();
//        lng.value = latLng.lng();
//       
//    }
////check already a marker is being set, if yes clear it form the map
//    function checkMarker(){
//        if (thisMarker != null){
//            thisMarker.setMap(null);
//        }
//    }
//    }
//     function searchMap(){
//     var googleMap = document.getElementById('googleMap');
//     var thisMarker= null;
//     var mapProp= {
//        center:new google.maps.LatLng(6.9271, 79.8612),
//        zoom:15,
//     };
//     var map=new google.maps.Map(googleMap,mapProp);
//      
//     }
//



///before


function initMap(){
    var googleMap = document.getElementById('map');
    var thisMarker= null;
    var mapProp= {
        center:new google.maps.LatLng(6.9243, 79.868),
        zoom:15,
    };
    
    var map=new google.maps.Map(googleMap,mapProp);
//    geocodeAddress(map);
    
// add a event listener to the map to create the marker  
    map.addListener('click', function(e){
        
        placeMarker(e.latLng , map);
        console.log(e);
    });
}


function geocodeAddress() {
       var latlng = new google.maps.LatLng(6.921058946812288,79.8702621459961);
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': latlng}, function(results, status) {
          if (status === 'OK') {
    //             console.log(results[0].formatted_address);
    //             console.log(results[5].formatted_address   );
                   
          for (var i=0; i < results[0].address_components.length; i++) {
           for (var j=0; j < results[0].address_components[i].types.length; j++) {
            if (results[0].address_components[i].types[j] == "route") {
              street = results[0].address_components[i];   
              console.log(street.long_name)
            }  
            if (results[0].address_components[i].types[j] == "administrative_area_level_1") {
              city = results[0].address_components[i];   
              console.log(city.long_name)
            }
               
            if (results[0].address_components[i].types[j] == "administrative_area_level_2") {
              state = results[0].address_components[i];   
              console.log(state.long_name)
            }
            if (results[0].address_components[i].types[j] == "country") {
              country = results[0].address_components[i];   
              console.log(country.long_name)
            }
           }
          }
              
              
              
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
}
    

function myCode(callback) {
  geocoder = new google.maps.Geocoder();
//  var location = 'Billings,MT';
  var latlng = new google.maps.LatLng(6.921058946812288,79.8702621459961);
  if( geocoder ) {
      alert(latlng);
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if( status == google.maps.GeocoderStatus.OK ) {
        callback(results[0]);
      }
    });
  }
}

























 function placeMarker(latLng , map){
        checkMarker();
        var marker = new google.maps.Marker({
            position:latLng,
            map:map
        });
        thisMarker = marker;
         map.panTo(latLng);
        
        // change the form lat and lng input fields
        lat.value = latLng.lat();
        lng.value = latLng.lng();
       
    }
//check already a marker is being set, if yes clear it form the map
    function checkMarker(){
        if (thisMarker != null){
            thisMarker.setMap(null);
        }
    }
    
     function searchMap(){
     var googleMap = document.getElementById('googleMap');
     var thisMarker= null;
     var mapProp= {
        center:new google.maps.LatLng(6.9271, 79.8612),
        zoom:15,
     };
     var map=new google.maps.Map(googleMap,mapProp);
      
     }