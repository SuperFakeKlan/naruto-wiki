/**
 * Carga los personajes desde un URL
 * @param {String} url fuente de datos o link
 * @returns {{data:{
 * nombre: string,
 * clan: string,
 * imagen: string,
 * descripcion: string,
 * aldea: string
 * }[] | undefined,error: string | undefined}} personajes
 */
async function loadCharacters(url) {
    if (!url || typeof url !== "string") return {
        error: 'URl inválido'
    }
    try {
        const result = await fetch(url)
        const data = await result.json()
        return {
            data
        }
    } catch (error) {
        return {
            error: 'Error al hacer fetch'
        }
    }
}
/**
 * 
 * @param {Object} character character
 * @param {string} character.imagen path hacia la imagen
 * @param {string} character.nombre nombre del personaje
 * @param {string} character.clan clan del personaje
 * @param {string} character.descripcion descripcion del personaje
 * @param {HTMLDivElement} div contenedor donde colocar la card
 */
function generateCard({
    clan, descripcion, imagen, nombre
}, div) {
    if (!div) {
        console.warn(`Ojo: No existe un contenedor con ID "${div}" en tu HTML.`);
        return
    }
    const card = document.createElement("div")
    const innerCard = document.createElement("div")
    const frontCard = document.createElement("div")
    const backCard = document.createElement("div")
    const image = document.createElement("img")
    const name = document.createElement("h3")
    const cardClan = document.createElement("p")
    const description = document.createElement("p")
    const button = document.createElement("button")
    card.classList.add("flip-card")
    innerCard.classList.add("flip-card-inner")
    frontCard.classList.add("flip-card-front")
    backCard.classList.add("flip-card-back")
    description.classList.add("descripcion")
    button.classList.add("btn-perfil")
    image.src = imagen
    image.alt = nombre
    name.innerText = nombre
    cardClan.innerText = clan
    description.innerText = descripcion
    button.innerText = "Ver mas..."
    frontCard.append(image, name, cardClan)
    backCard.append(cardClan, description)
    innerCard.append(frontCard, backCard)
    card.appendChild(innerCard)
    div.appendChild(card)
}

async function cargarPersonajes() {
    try {
        const { data: personajes, error } = await loadCharacters('./data/personajes.json')
        // 1. Buscamos el contenedor según la aldea (ej: contenedor-konoha)
        console.log(personajes, error)
        if (!personajes) return
        // 2. Creamos el molde de tu tarjeta (Flip Card)
        const konohas = personajes
            .filter(ch => ch.aldea === "Konoha")
        const arenas = personajes
            .filter(ch => ch.aldea === "Arena")
        const divArena = document.getElementById("contenedor-arena")
        const divKonoha = document.getElementById("contenedor-konoha")
        // Usamos las propiedades exactas de tu JSON
        konohas.forEach((ch) => generateCard(ch, divKonoha))
        arenas.forEach((ch) => generateCard(ch, divArena))

    } catch (error) {
        console.error("Error al renderizar:", error);
    }
}

cargarPersonajes();