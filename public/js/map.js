// Showing map on show.ejs page through Mapbox API Token access

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 8, // starting zoom
});

// Create popup at location marker 
const popup = new mapboxgl.Popup({ offset: 25 })
  .setLngLat(listing.geometry.coordinates)
  .setHTML(
    `<h5>${listing.title}</h5><p>Exact location provided after booking!</p>`,
  )
  .addTo(map);

// console.log(listing.geometry.coordinates);
// Create a default Marker, colored red,
const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup)
  .addTo(map);
