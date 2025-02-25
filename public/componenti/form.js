export const createForm = (parentElement, pubsub) => {
    let dati = [];
    let callback = null;
    let tipo="Cardiologia";
    let parentElement = parentElement;
    return {
        setLabels: (labels) => {dato = labels;}, 
        onsubmit: (callbackInput) => { callback = callbackInput; },
        setType: (tip)=>{tipo=tip;console.log(tipo)},
        exportDati: () => {
            return dati; 
        },
        render: (data) => {
            //creazione input
            parentElement.innerHTML = 
                `<div>Data<br/><input id="tipo" type="text" class="form-label form-control"/></div>` +
                `<div>Data<br/><input id="data" type="date" class="form-label form-control"/></div>` +
                `<div>Ora<br/><select id="ora" name="ora" class="form-select"><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option></select></div>` +
                `<div>Nome<br/><input id="nome" type="text" class="form-label form-control"/></div>`+
                `<div id="outputform"></div>`
            //lettura valori inseriti
            document.querySelector("#Prenota").onclick = () => {
                const tipologia = document.querySelector('#tipo').value;
                const data = document.querySelector("#data").value;
                const ora = document.querySelector("#ora").value;
                const nome = document.querySelector("#nome").value;
                const outputform = document.getElementById("outputform");

                if (data === "" || ora === "" || nome === "" || tipologia === "") {
                    outputform.innerHTML = "KO";
                } else {
                    // AGGIUNTA DELLA DATA NEL DIZIONARIO
                    pubsub.subscribe
                }
                document.querySelector("#data").value="";
                document.querySelector("#ora").value="";
                document.querySelector("#nome").value="";
                document.querySelector("#tipo").value="";

                }
            }

        }
    };
