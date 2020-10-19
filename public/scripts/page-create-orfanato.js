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

let marker;

//criar e adicionar marcador
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;
    //remover icone
    marker && map.removeLayer(marker)
    //adicionar icon
    marker = L.marker([lat,lng], {icon})
    .addTo(map)
})

//upload de fotos
function addPhotoField(){
    // pegar o container de fotos #images
    const container = document.querySelector('#images')
    // pegar o container para duplicar .new-upload
    const fieldsnewImage = document.querySelectorAll('.new-upload')
    // realizar o clone da ultima imagem adicionada
    const newfieldnewImage = fieldsnewImage[fieldsnewImage.length -1].cloneNode(true)
    //verificar se o campo esta vazio se sim nao adicionar ao container de imagens
    const input = newfieldnewImage.children[0]
    if(input.value == ""){
        return
    }
    // limpar o campo antes de adicionar ao container de imagens
    input.value=""
    // adicionar o clone ao container de #images
    container.appendChild(newfieldnewImage)
}

//funcao de apagar fotos
function deleteField(event) {
    const span = event.currentTarget
    const fieldsnewImage = document.querySelectorAll('.new-upload')
    if (fieldsnewImage.length <= 1) {
        //limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }
    //apagar o campo
    span.parentNode.remove()
}

//seleção do sim e nao

function toggleSelect(event){
    //pegar o botao clicado

    
    //retirar a class .active dos botoes
    document.querySelectorAll('.button-select button')
    .forEach(function(button) {
        button.classList.remove('active')
    })
    //colocar a class .active no botao clicado
    const button = event.currentTarget
    button.classList.add('active')
    //atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends]')
    //verificar se é sim ou nao
    input.value = button.dataset.value
}
/* function validate(event){
    //validar se lat e lng estao preenchidos
    const needsLatLng = true;
    if (needsLatandLng){
    event.preventDefault()
    alert('Selecione um ponto no mapa')
    }
} */