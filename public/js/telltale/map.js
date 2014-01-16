(function(){

  var telltale = window.telltale || (window.telltale = {});

  telltale.map = function(){

    var minZoom,
        maxZoom,
        zoom,
        center,
        southWest,
        northEast,
        m,
        tonerLite,
        point;

    function map(selection){
      selection.each(function(data){

        var geojsonMarkerOptions =  {fillColor: 'blue', fillOpacity: 0.6, stroke: false, radius: 2};

        if (!m) {
          m = L.map(this, {
              center: new L.LatLng(center[0], center[1]),
              zoom: zoom,
              scrollWheelZoom : false
          });
        }
        
        if (!tonerLite){ 
            tonerLite = new L.StamenTileLayer("toner-lite")
            tonerLite.setOpacity(0.3)
            m.addLayer(tonerLite)
        }
        
        if (!point){
          point = L.geoJson(data.features, {
            pointToLayer: function (feature, latlng) {
              var circleLocation = new L.LatLng(feature.geometry.coordinates[0], feature.geometry.coordinates[1])
              return L.circleMarker(circleLocation, geojsonMarkerOptions);
              }
          })

          point.addTo(m);
        }else{
          point.clearLayers();
          point.addData(data.features)
        }
        
        

      });
    }


    map.minZoom = function(x){
      if (!arguments.length) return minZoom;
      minZoom = x;
      return map;
    }

    map.maxZoom = function(x){
      if (!arguments.length) return maxZoom;
      maxZoom = x;
      return map;
    }

    map.zoom = function(x){
      if (!arguments.length) return zoom;
      zoom = x;
      return map;
    }

    map.center = function(x){
      if (!arguments.length) return center;
      center = x;
      return map;
    }

    map.southWest = function(x){
      if (!arguments.length) return southWest;
      southWest = x;
      return map;
    }

    map.northEast = function(x){
      if (!arguments.length) return northEast;
      northEast = x;
      return map;
    }

    return map;
  }
  
})();