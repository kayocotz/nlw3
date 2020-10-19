//criar mapa
const map = L.map('mapid').setView([-15.6726241,-47.6486394], 15)
//criar e adicionar tilelayer
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map)
//criar icone
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
})

function addMarker({id,name,lat,lng}){
    //criar pop up 
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="/orfanato?id=${id}"><img src="/images/arrow-white.svg"></a>`)

    //criar e adicionar marcador
    L.marker([lat,lng], {icon})
    .addTo(map)
    .bindPopup(popup)
}

const orfanatoSpan = document.querySelectorAll('.orfanatos span')
orfanatoSpan.forEach(span => {
    const orfanato = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
    }
    console.log(orfanato)
    addMarker(orfanato)
})