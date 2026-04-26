async function cargarPersonajes() {
    try {
        const respuesta = await fetch('./data/personajes.json');
        const personajes = await respuesta.json();

        personajes.forEach(pj => {
            // 1. Creamos el molde de tu tarjeta (Flip Card)
            // Usamos las propiedades exactas de tu JSON
            const tarjetaHTML = `
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="${pj.imagen}" alt="${pj.nombre}">
                            <h3>${pj.nombre}</h3>
                            <p>${pj.clan}</p>
                        </div>
                        <div class="flip-card-back">
                            <h3>${pj.nombre}</h4>
                            <p class="descripcion">${pj.descripcion}</p>
                            <button class="btn-perfil">ver mas...</button>
                    </div>
                </div>
            `;

            // 2. Buscamos el contenedor según la aldea (ej: contenedor-konoha)
            const idContenedor = `contenedor-${pj.aldea.toLowerCase()}`;
            const contenedor = document.getElementById(idContenedor);

            // 3. Inyectamos la tarjeta si el contenedor existe
            if (contenedor) {
                contenedor.innerHTML += tarjetaHTML;
            } else {
                console.warn(`Ojo: No existe un contenedor con ID "${idContenedor}" en tu HTML.`);
            }
        });

    } catch (error) {
        console.error("Error al renderizar:", error);
    }
}

cargarPersonajes();