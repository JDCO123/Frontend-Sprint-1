import { perros, gatos } from "../helpers/constatns.js";
import { getData } from "../helpers/peticiones.js";

const cardPets = document.querySelector(".cards_pets");
const btnPerros = document.getElementById("btn_perros");
const btnGatos = document.getElementById("btn_gatos");
const cardDetails = document.getElementById("card_details");
const back = document.getElementById("back");

document.addEventListener("DOMContentLoaded", async () => {
    let card = document.getElementById("cardPets");

    const cargarMascotas = async (endpoint, contenedor) => {
        const response = await getData(endpoint);
        contenedor.innerHTML = "";

        response.forEach(item => {
            const { id, nombre, edad, sexo, historia, direccion, imagen, raza, personalidad } = item;

            const imgElement = document.createElement("img");
            imgElement.src = imagen;
            imgElement.alt = "";

            contenedor.appendChild(imgElement);

            imgElement.addEventListener("click", () => {
                mostrarInformacionMascota(item);
            });
        });
    };

    btnPerros.addEventListener("click", () => {
        cargarMascotas(perros, cardPets);
    });

    btnGatos.addEventListener("click", () => {
        cargarMascotas(gatos, cardPets);
    });

    const mostrarInformacionMascota = (mascota) => {
        if (cardDetails) {
            cardDetails.innerHTML = `
                <div class="header">
                    <img src="${mascota.imagen}" alt="">
                    <button id="back">atras</button>
                </div>
                <div class="section">
                    <h1>${mascota.nombre}</h1>
                    <p>Edad: ${mascota.edad}</p>
                    <p>Raza: ${mascota.raza}</p>
                    <p>${mascota.direccion}</p>
                    <h2>Personalidad</h2>

                    <!-- Otros campos de información de la mascota -->
                </div>
                <div class="historia">
                <h2>Historia de ${mascota.nombre}</h2>
                <p>${mascota.historia}</p>
                </div>
                
                <footer>
                    <div class="contacto">
                        <img src="" alt="">
                        <p></p>
                    </div>
                    <button>Contactar</button>
                </footer>
            `;

            const backButton = document.getElementById("back");
            if (backButton) {
                backButton.addEventListener("click", () => {
                    cardDetails.innerHTML = "";
                });
            }
        }
    };

    cargarMascotas(perros, card);
});