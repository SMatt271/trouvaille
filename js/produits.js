let produits = [];
let filtreActuel = "all";

// =========================
// CHARGEMENT JSON
// =========================

fetch("data/produits.json")
    .then(response => response.json())
    .then(data => {

        produits = data;

        afficherProduits(produits);

    })
    .catch(error => {

        console.error("Erreur chargement JSON :", error);

        document.getElementById("products-container").innerHTML = `
            <p>Impossible de charger les produits.</p>
        `;
    });

// =========================
// AFFICHAGE
// =========================

function afficherProduits(liste) {

    const container = document.getElementById("products-container");

    container.innerHTML = "";

    if (liste.length === 0) {

        container.innerHTML = `
            <p>Aucun produit trouvé.</p>
        `;

        return;
    }

    liste.forEach(produit => {

        const card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `

            <img src="${produit.image}" alt="${produit.nom}">

            <div class="product-content">

                <h3>${produit.nom}</h3>

                <p>
                    <strong>Catégorie :</strong>
                    ${produit.categorie}
                </p>

                ${
                    produit.prixNeuf
                    ? `<p class="price-market">
                        Prix neuf : ${produit.prixNeuf} €
                    </p>`
                    : ""
                }

                ${
                    produit.prixOccasion
                    ? `<p class="price-market">
                        Prix occasion : ${produit.prixOccasion} €
                    </p>`
                    : ""
                }

                <p class="price-user">
                    Mon prix : ${produit.monPrix} €
                </p>

                ${
                    produit.description
                    ? `<p style="margin-top:12px;">
                        ${produit.description}
                    </p>`
                    : ""
                }

                <a
                    href="contact.html"
                    class="btn btn-primary"
                    style="margin-top:15px;display:inline-block;"
                >
                    Me contacter
                </a>

            </div>

        `;

        container.appendChild(card);

    });

}

// =========================
// FILTRES
// =========================

const boutonsFiltres = document.querySelectorAll(".filter-btn");

boutonsFiltres.forEach(btn => {

    btn.addEventListener("click", () => {

        filtreActuel = btn.dataset.filter;

        appliquerFiltres();

    });

});

// =========================
// RECHERCHE
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        appliquerFiltres();

    });

}

// =========================
// COMBINAISON
// =========================

function appliquerFiltres() {

    const recherche = searchInput.value.toLowerCase();

    let resultat = produits.filter(produit => {

        const correspondRecherche =
            produit.nom.toLowerCase().includes(recherche);

        const correspondCategorie =
            filtreActuel === "all"
            || produit.categorie === filtreActuel;

        return correspondRecherche && correspondCategorie;

    });

    afficherProduits(resultat);

}
