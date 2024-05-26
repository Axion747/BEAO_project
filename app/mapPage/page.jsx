'use client'

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


// 'use client';

// // import React, { useEffect } from 'react';
// // import { Loader } from '@googlemaps/js-api-loader';

// // export default function GoogleMaps() {
// // 	const mapRef = React.useRef<HTMLDivElement>(null);

// // 	useEffect(() => {
// // 		const initializeMap = async () => {
// // 			const loader = new Loader({
// // 				apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
// // 				version: '3.58',
// // 			});

// // 			const { Map } = await loader.importLibrary('maps');

// // 			const locationInMap = {
// // 				lat: 40.736466,
// // 				lng: -73.878110,
// // 			};

// // 			// MARKER
// // 			const { AdvancedMarkerElement } = (await loader.importLibrary(
// // 				'marker'
// // 			)) as google.maps.MarkerLibrary;

// // 			const options: google.maps.MapOptions = {
// // 				center: locationInMap,
// // 				zoom: 12,
// // 				mapId: 'NEXT_MAPS_TUTS',
// // 			};

// // 			const map = new Map(mapRef.current as HTMLDivElement, options);

// // 			// add the marker in the map
// // 			const marker = new AdvancedMarkerElement({
// // 				map: map,
// // 				position: locationInMap,
// // 			});
// // 		};

// // 		initializeMap();
// // 	}, []);

// // 	return <div className="h-[800px]" ref={mapRef} />;
// // }

// import React from 'react'
// import {createRoot} from 'react-dom/client'
// import MainHeader from '@/components/builtComponents/Header.jsx'
// import {
// 	APIProvider, 
// 	Map,
// 	Pin,
// 	Marker, 
// 	useMarkerRef, 
// 	InfoWindow,
// 	AdvancedMarker,
// 	useAdvancedMarkerRef
// } from '@vis.gl/react-google-maps';

// // type Place = {
// // 	name: string,
// // 	position: {lat: number, lng: number},
// // 	needs: "Food" | "Shelter" | "Medical" | "Other",
// // }

// export const sampleLocations = [
// 	{
// 		name: "Jackson Heights Greenmarket",
// 		position: {lat: 40.755, lng: -73.883},
// 		needs: "Food"
// 	},
// 	{
// 		name: "Forest Hills Greenmarket",
// 		position: {lat: 40.718, lng: -73.844},
// 		needs: "Food"
// 	}
// ]

// export function infoWindowPop(){
// 	return (
// 		<InfoWindow>
// 			<div>
// 				<h1>InfoWindow</h1>
// 				<p>Content</p>
// 			</div>
// 		</InfoWindow>
// 	);
// }

// export function MapLayout(){
// 	const [markerRef, marker] = useMarkerRef();
// 	return (
// 		<div>
// 		<APIProvider apiKey = {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
// 		<Map
// 			id={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
// 			style = {{width: '80vw', height: '80vh'}}
// 			defaultCenter = {{lat:40.786232, lng:-73.900487}}
// 			defaultZoom = {11}
// 			gestureHandling={'greedy'}
// 			disableDefaultUI={true}
// 		>
// 			{/* <AdvancedMarker ref={markerRef} position = {{lat:37.7, lng: -122.4}}>
// 				<Pin background = {'#FBBC04'} glyphColor={'#000'} />
// 			</AdvancedMarker> */}
// 			<Marker ref={markerRef} position = {{lat:40.8, lng: -73.9}} />

// 		</Map>
// 	</APIProvider>
// 	</div>
// 	);
// }

// const MarkerWithInfoWindow = (sampleLocations) => {
// 	// `markerRef` and `marker` are needed to establish the connection between
// 	// the marker and infowindow (if you're using the Marker component, you
// 	// can use the `useMarkerRef` hook instead).
// 	const [markerRef, marker] = useAdvancedMarkerRef();
  
// 	const [infoWindowShown, setInfoWindowShown] = useState(false);
  
// 	// clicking the marker will toggle the infowindow
// 	const handleMarkerClick = useCallback(() =>
// 	  setInfoWindowShown(isShown => !isShown),
// 	  []
// 	);
  
// 	// if the maps api closes the infowindow, we have to synchronize our state
// 	const handleClose = useCallback(() => setInfoWindowShown(false), []);
  
// 	return (
// 	  <>
// 		<AdvancedMarker
// 		  ref={markerRef}
// 		  position={sampleLocations.position}
// 		  onClick={handleMarkerClick}
// 		/>
  
// 		{infoWindowShown && (
// 		  <InfoWindow anchor={marker} onClose={handleClose}>
// 			<h2>InfoWindow content!</h2>
// 			<p>Some arbitrary html to be rendered into the InfoWindow.</p>
// 		  </InfoWindow>
// 		)}
// 	  </>
// 	);
//   };


// export default function mapPage() {
// 	const [markerRef, marker] = useMarkerRef();
// 	return (
// 	<div>
// 		<MainHeader />
// 		<div className="mx-40 max-h-screen self-center object-center border-rounded-sm border-spacing-3">
// 			<MapLayout />
// 		</div>
// 	</div>
// 	);
// }
