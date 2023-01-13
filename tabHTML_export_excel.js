// Exporter le tableau vers excel
function export2excel(button){

	// On récupère le data-id du bouton
	var dataId_button = $(button).data('id');

	// Données du tableau
	var table = document.getElementById("tbResultat");

	// Tableau
	var tab_excel = [];
	var tab_ligne_generate = [];

	// Extension du document
	if (dataId_button == "csv") {

		var extension = ".csv";
		var mimeType = "text/csv";

	} else if (dataId_button == "xls") {

		var extension = ".xls";
		var mimeType = "application/vnd.ms-excel";

	}

	// On parcourt les lignes du tableau
	for (i = 0 ; tab_ligne = table.rows[i] ; i++) {

		// Boucle for ajoutant les données du tableau dans un array
		for (y = 0 ; y < tab_ligne.cells.length ; y++) {

			// On accède aux lignes du tableau via la variable row dans la boucle et on récupère chaque valeur de cellule de la ligne y
			colonne = tab_ligne.cells[y].innerText;

			// On ajoute les données dans le tableau
			tab_ligne_generate.push(colonne);

		}

		// On ajoute la ligne récupéré dans le tableau excel
		tab_excel.push(tab_ligne_generate);

		// On set le tableau comme il était à l'origine
		tab_ligne_generate = [];

	}

	// On déclare le type de données, l'unicode utilisé et la marque d'ordre d'utf-8
	contenu_excel = "data:"+mimeType+";charset=UTF-8,\uFEFF ";

	/* 
	 * On délimite les cellules par un ";" 
	 * On retourne au début de la ligne (\r)
	 * On saute de ligne (\n)
	 */
	tab_excel.forEach(function(rowArray){

		tab_ligne = rowArray.join(";");
		contenu_excel += tab_ligne + "\r\n"

	});

	// On créer une balise <a>
	var telechargement = document.createElement("a");

	/*
	 * On défini les attributs de la balise <a>
	 * On encode le contenu
	 * On télécharge le fichier sou le nom "user.csv"
	 */
	telechargement.setAttribute("href", encodeURI(contenu_excel));
	telechargement.setAttribute("download", "user"+extension);

	// On ajoute la balise <a> au <body>
	document.body.appendChild(telechargement);

	// On lance le téléchargement en simulant un clique
	telechargement.click();

}