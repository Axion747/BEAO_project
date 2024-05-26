import React, { useEffect } from 'react';

const GoogleMap = () => {
  useEffect(() => {
    const loadScript = (url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.head.appendChild(script);
    };

    const initMap = () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.736466, lng: -73.878110 },
        zoom: 12,
      });

      const locations = [
        { name: 'Jackson Heights Greenmarket', lat: 40.753306, lng: -73.889698, needs: 'Water and food' },
        { name: 'Sunnyside Community Services', lat: 40.744556, lng: -73.926048, needs: 'Medical supplies' },
		{ name: "Van Scilen Women's Shelter (Samartan Village)", lat: 40.680714, lng: -73.892018, needs: 'Medical supplies' },
		{ name: 'Project Find', lat: 40.755835, lng: -73.984410, needs: 'Men Clothing' },
      ];

      let activeInfoWindow = null;

      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<div style="color: black;"><strong>${location.name}</strong><br/>Needs: ${location.needs}</div>`,
        });

        marker.addListener('click', () => {
          if (activeInfoWindow) {
            activeInfoWindow.close();
          }
          infowindow.open(map, marker);
          activeInfoWindow = infowindow;
        });
      });
    };

    window.initMap = initMap;
    loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDeeCtM_Es1sEtpe4u4o9iBd93xDJpF_ek&callback=initMap`);
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default GoogleMap;