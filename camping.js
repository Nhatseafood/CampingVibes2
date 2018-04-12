/*
var baseUrl = 'http://api.amp.active.com/'
var apiKey = 'bc9t36mudawubc2ajzkzne38';
var apiKey2 = 'HVQ3QUEPTRX3FKFXDMBAEHSZ/* '
var googleCustomSearchApi = 'AIzaSyBDvkJWRxyi3U8yPxLoJClo2Zm9mPyjRUo'
var googleCustomEngine = '016068319718830097589:iw357dqkr-a'
var googleGeolocationAPi = 'AIzaSyCFaYviqNM0Ts59qcR5IV652b3C29xaF9g'
// var url = 'http://api.amp.active.com/camping/campgrounds/?pstate=tx&api_key=bc9t36mudawubc2ajzkzne38';
*/

var y;

//API call using jquery. Calls americareserve website by using the active access API






// Image getter for the campsites using a custom google search engine
function campImg(campName,element) {
    var t= campName;
$.ajax({
    url: "https://www.googleapis.com/customsearch/v1?q="+ t + "&cx=016068319718830097589%3Aiw357dqkr-a&imgColorType=color&num=3&searchType=image&key=AIzaSyBDvkJWRxyi3U8yPxLoJClo2Zm9mPyjRUo",
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function(respond) {
        var x = respond
         console.log(x['items'][0]['link']);
         var z = x['items'][0]['link']; 
         var sliderDiv = document.getElementById(`img${element}`)
         var title = document.getElementById(`ti${element}`)
         //ele = sliderDiv.getElementsById(`img${element}`)
         //var el1 = document.body.querySelectorAll('slider img');
         sliderDiv.setAttribute("src",z);
         title.innerHTML = campName;
         //console.log(sliderDiv)
         
            
    },
    error: function(){ alert('Failed!'); },
});
}


function initMap() {
        console.log('Hello')
        var map = new google.maps.Map(document.getElementsByTagName('slider'), {
          center: {lat: -34.397, lng: 150.644}        
        });
        console.log('dud1')
        var geocoder = new google.maps.Geocoder;
        var infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos)
            geocoder.geocode({'location': pos}, function(results, status) {
                if (status === 'OK') {
                  if (results[0]) {
                    var state = results[9]["address_components"][0]["short_name"];
                    console.log(state)
                    var promise1 = new Promise(function(resolve, reject) {
                      resolve (
                        $.ajax({

                          url: 'http://api.amp.active.com/camping/campgrounds/?pstate=' + state + '&api_key=bc9t36mudawubc2ajzkzne38',
                          type: 'GET',
                          crossDomain: true,
                          dataType: 'xml',
                          success: function(respond) {
                            var x = respond;
                            y = x.getElementsByTagName("resultset")[0];  
                          },
                          error: function() { alert('Failed!'); },
                      })
                      
                      )
                    });
                    promise1.then(function(data){
                    var camp = y.getElementsByTagName('result')
                    var lenCamp = camp.length
                    var lc = {};
                    var dis = {};
                    var dum = [];
                    //Storing lat and long coordinates in an object relative to the position of the camps in their original list
                    for (var i=0;i<lenCamp;i++)  {
                      lc[i]=[y.getElementsByTagName('result')[i].getAttribute('latitude'),y.getElementsByTagName('result')[i].getAttribute('longitude')]
                    }     
                    // Calculating distance between camps and geolocation of user. While also recording the position of the camp in the list
                    for (var i=0; i<lenCamp; i++) {
                      dis[getDistance(pos['lat'], pos['lng'],lc[i][0],lc[i][1])] = i
                      dum.push(getDistance(pos['lat'], pos['lng'],lc[i][0],lc[i][1]))
                    }
                    // Sorting the camps by increasing distance
                    dum.sort(function(a,b) {return a- b;});
                    
                    for (var i=1 ; i<7; i++){
                      var campName = camp[dis[dum[i]]].getAttribute('facilityName');
                      var desc = document.getElementById(`d${i}`)
                      var pet = camp[dis[dum[i]]].getAttribute('sitesWithPetsAllowed');
                      var pow = camp[dis[dum[i]]].getAttribute('sitesWithAmps');
                      var sew = camp[dis[dum[i]]].getAttribute('sitesWithSewerHookup');
                      var wat = camp[dis[dum[i]]].getAttribute('sitesWithWaterHookup');
                      campImg(campName,i)
                      desc.innerHTML = `Distance away: ${dum[i].toFixed(2)} miles, Pets allowed: ${pet}, Amp available: ${pow}, Sewer hookup: ${sew}, Water hookup: ${wat}`

                    }
                  })









                    
                    
                  } else {
                    window.alert('No results found');
                  }
                } else {
                  window.alert('Geocoder failed due to: ' + status);
                }})
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    ;}

function getDistance(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      d *= 0.621371;
      return d;
    }
    
function deg2rad(deg) {
      return deg * (Math.PI/180)
    }