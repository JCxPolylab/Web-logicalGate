/*****************************************************************************************/
/* Ajouts des écouteurs d'événements pour les portes logiques au chargement de la page   */
/*****************************************************************************************/
document.getElementById('portes-de-base').addEventListener('click', (e) => {
    if(e.target && e.target.nodeName === "LI") 
    {
        var porte;
        if(e.target.textContent.includes('BUFFER')) {
            porte = 'BUFFER';
        }
        else {
            porte = e.target.textContent.split('(')[1].split(')')[0]; // Recupere le nom de la porte en utilisant les paranthèses pour split le string
        }
        document.getElementById('simulation-instruction').textContent = `Simulation de la porte logique: ${porte}.`; // Update instruction text
        addContent(porte); // Appelle la fonction pour ajouter le contenu de simulation

        document.getElementById('input1').addEventListener('change', () => {updateGate(porte);});
        if(porte !== 'NOT') {
            document.getElementById('input2').addEventListener('change', () => {updateGate(porte);});
        }
    }
});

document.getElementById('portes-avancees').addEventListener('click', (e) => {
    if(e.target && e.target.nodeName === "LI") 
    {
        let porte = e.target.textContent.split('(')[1].split(')')[0]; 
        document.getElementById('simulation-instruction').textContent = `Simulation de la porte logique: ${porte}.`; 
        addContent(porte);

        document.getElementById('input1').addEventListener('change', () => {updateGate(porte);});
        if(porte !== 'NOT') {
            document.getElementById('input2').addEventListener('change', () => {updateGate(porte);});
        }
    }
});
/*****************************************************************************************/






/*****************************************************************************************/
/*                              Fonctions de simulation                                  */
/*****************************************************************************************/
function addContent(porte) { 
    const simulationArea = document.getElementById('simulation-area');
    simulationArea.innerHTML = ''; //Refresh la zone
    const content = document.createElement('div');

    // Ajout de la table de vérité et des entrées en dynamique
    const htmlContent =     '<div id="tableDeVeritée">'
                        +   '<h3>Table de vérité:</h3>'
                        +   '<table>'
                        +       '<thead>'
                        +           '<tr>'
                        +               '<th id="tabEntree1">Entrée 1</th>'
                        +               '<th id="tabEntree2">Entrée 2</th>'
                        +               '<th id="tabSortie">Sortie</th>'
                        +           '</tr>'
                        +       '</thead>'
                        +       '<tbody id="tableDeVeritéeHead">'
                        +           '<tr id="row1">'
                        +               '<td id="Entree1Bit1">0</td>'
                        +               '<td id="Entree2Bit1">0</td>'
                        +               '<td id="output00">?</td>'
                        +           '</tr>'
                        +           '<tr id="row2">'
                        +               '<td id="Entree1Bit2">0</td>'
                        +               '<td id="Entree2Bit2">1</td>'
                        +               '<td id="output01">?</td>'
                        +           '</tr>'
                        +           '<tr id="row3">'
                        +               '<td id="Entree1Bit3">1</td>'
                        +               '<td id="Entree2Bit3">0</td>'
                        +               '<td id="output10">?</td>'
                        +           '</tr>'
                        +           '<tr id="row4">'
                        +               '<td id="Entree1Bit4">1</td>'
                        +               '<td id="Entree2Bit4">1</td>'
                        +               '<td id="output11">?</td>'
                        +           '</tr>'
                        +       '</tbody>'
                        +       '</table>'
                        +   '</div>'
                        +   '<div id="simulation-content">'
                        +       '<h3>Entrées:</h3>'
                        +       '<label id="labelInput1">'
                        +           '<input type="checkbox" id="input1"><span id="textEntree1"> Entrée 1</span>'
                        +       '</label>'
                        +       '</br>'
                        +       '<label id="labelInput2">'
                        +           '<input type="checkbox" id="input2"><span id="textEntree2"> Entrée 2</span>'
                        +       '</label>' 
                        +       '<label>'
                        +           '<output id="resultOutput"> Sortie ?</output>'
                        +       '</label>'
                        +   '</div>';
    

    // Ajout du style CSS pour la table
    const styleContent =    '<style>'
                        +       '#tableDeVeritée , tableDeVeritéeHead {'
                        +       'margin-bottom: 20px;'
                        +       '}'
                        +       'table {'
                        +           'width: 100%;'
                        +           'border-collapse: collapse;'
                        +       '}'
                        +       'th, td {'
                        +           'border: 1px solid #000;'
                        +           'padding: 8px;'
                        +           'text-align: center;'
                        +       '}'
                        +       'th {'
                        +           'background-color: #f2f2f2;'
                        +       '}'
                        +       '#resultOutput {'
                        +           'margin-left: 200px;'
                        +           'font-weight: bold;'
                        +       '}'
                        +   '</style>'   

    content.innerHTML = htmlContent + styleContent;

    //Ajouter le contenu modifié à la zone de simulation
    simulationArea.appendChild(content);

    //recupération des handles et ajouts des listeneurs pour l'édition de l'état de notre table

    switch(porte) {
        case 'AND':
            content.innerHTML += '<p>La porte ET (AND) renvoie VRAI si toutes les entrées sont VRAIES.</p>';
            //Mise à jour de la table de vérité
            document.getElementById("output00").textContent = '0';
            document.getElementById("output01").textContent = '0';
            document.getElementById("output10").textContent = '0';
            document.getElementById("output11").textContent = '1';
            break;
        case 'OR':
            content.innerHTML += '<p>La porte OU (OR) renvoie VRAI si au moins une entrée est VRAIE.</p>';
            document.getElementById("output00").textContent = '0';
            document.getElementById("output01").textContent = '1';
            document.getElementById("output10").textContent = '1';
            document.getElementById("output11").textContent = '1';
            break;
        case 'NOT':
            content.innerHTML += '<p>La porte NON (NOT) inverse l\'état de son entrée.</p>';
            document.getElementById("output00").textContent = '1';
            document.getElementById("output01").textContent = '0';

            // Suppression de la deuxième entrée pour la porte NOT car elle n'en a qu'une
            document.getElementById("tabEntree1").remove(); 
            document.getElementById("Entree1Bit1").remove();
            document.getElementById("Entree1Bit2").remove();
            document.getElementById("Entree1Bit3").remove();
            document.getElementById("Entree1Bit4").remove();

            // Suppression des lignes devenues inutiles
            document.getElementById("row3").remove();
            document.getElementById("row4").remove();

            // Mise à jour des labels
            document.getElementById("tabEntree2").textContent = "Entrée";

            //suppression de la deuxième entrée dans la simulation + renommage
            document.getElementById("labelInput2").remove();
            document.getElementById("textEntree1").textContent = "Entrée";
            break;
        case 'BUFFER':
            content.innerHTML += '<p>La porte BUFFER renvoie la même valeur que son entrée.</p>';
            document.getElementById("output00").textContent = '0';
            document.getElementById("output01").textContent = '1';

            //Suppression de la dexuieme entrée comme pour NOT
            document.getElementById("tabEntree1").remove(); 
            document.getElementById("Entree1Bit1").remove();
            document.getElementById("Entree1Bit2").remove();
            document.getElementById("Entree1Bit3").remove();
            document.getElementById("Entree1Bit4").remove();

            document.getElementById("row3").remove();
            document.getElementById("row4").remove();

            document.getElementById("tabEntree2").textContent = "Entrée";

            document.getElementById("labelInput2").remove();
            document.getElementById("textEntree1").textContent = "Entrée";
            break;
        case 'NAND':
            content.innerHTML += '<p>La porte NAND renvoie FAUX uniquement si toutes les entrées sont VRAIES.</p>';
            document.getElementById("output00").textContent = '1';
            document.getElementById("output01").textContent = '1';
            document.getElementById("output10").textContent = '1';
            document.getElementById("output11").textContent = '0';
            break;
        case 'NOR':
            content.innerHTML += '<p>La porte NOR renvoie VRAI uniquement si toutes les entrées sont FAUSSES.</p>';
            document.getElementById("output00").textContent = '1';
            document.getElementById("output01").textContent = '0';
            document.getElementById("output10").textContent = '0';
            document.getElementById("output11").textContent = '0';
            break;
        case 'XOR':
            content.innerHTML += '<p>La porte XOR renvoie VRAI si un nombre impair d\'entrées sont VRAIES.</p>';
            document.getElementById("output00").textContent = '0';
            document.getElementById("output01").textContent = '1';
            document.getElementById("output10").textContent = '1';
            document.getElementById("output11").textContent = '0';
            break;
        case 'XNOR':
            content.innerHTML += '<p>La porte XNOR renvoie VRAI si un nombre pair d\'entrées sont VRAIES.</p>';
            document.getElementById("output00").textContent = '1';
            document.getElementById("output01").textContent = '0';
            document.getElementById("output10").textContent = '0';
            document.getElementById("output11").textContent = '1';
            break;
    }
    updateGate(porte); // Mise à jour initiale de la sortie
    simulationArea.appendChild(content);
}

function updateGate(porte) {

    //Recupération du handle de la sortie
    var output;
    var input1;
    var input2;

    // Récupération des valeurs des entrées
    //Si porte NOT, une seule entrée
    if(porte === 'NOT' || porte === 'BUFFER'){
        input1 = document.getElementById('input1').checked ? 1 : 0;
    }
    //sinon deux entrées 
    else{
        input1 = document.getElementById('input1').checked ? 1 : 0;
        input2 = document.getElementById('input2').checked ? 1 : 0;
        input1 = input1;
        input2 = input2;
    }

    // Calcul de la sortie en fonction de la porte logique sélectionnée
    switch(porte) {
        case 'AND':
            output = input1 & input2;
            break;
        case 'OR':
            output = input1 | input2;
            break;
        case 'NAND':
            output = !(input1 & input2);
            break;
        case 'NOR':
            output = !(input1 | input2);
            break;
        case 'XOR':
            output = input1 ^ input2;
            break;
        case 'XNOR':
            output = !(input1 ^ input2);
            break;
        case 'NOT':
            output = !input1;
            break;
        case 'BUFFER':
            output = input1;
            break;
        default:
            output = 0;
    }

    //affichage dans la console pour debug
    if(porte === 'NOT' || porte === 'BUFFER')       console.log(`Input: ${input1}, Output: ${output}`);
    else                                            console.log(`Input1: ${input1}, Input2: ${input2}, Output: ${output}`);

    // Mise à jour de l'affichage de la sortie
    document.getElementById('resultOutput').textContent = 'sortie = ' + (output ? 1 : 0); //Le test tenernaire permet de forcer l'affiche 1 ou 0 au lieu de true/false (ce qui arrive lors du test NOT)
}
/*****************************************************************************************/