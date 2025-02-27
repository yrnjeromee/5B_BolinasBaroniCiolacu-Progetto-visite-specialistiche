export const createForm = (parentElementIn, pubsub, middleware) => {
    let dati = [];
    let types = [];
    let callback = null;
    let tipologiaCur = 0;
    let parentElement = parentElementIn;

    
    return {
        setLabels: (labels) => {dato = labels;}, 
        onsubmit: (callbackInput) => { callback = callbackInput; },
        setType: (tip)=>{types=tip; console.log(types)},
        exportDati: () => {
            return dati; 
        },
        setTipologiaCur: (tipologia) => {tipologiaCur = tipologia;},
        
        render: () => {
            //creazione input
            parentElement.innerHTML = 
                `<div>Data<br/><input id="data" type="date" class="form-label form-control"/></div>` +
                `<div>Ora<br/><select id="ora" name="ora" class="form-select"><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option></select></div>` +
                `<div>Nome<br/><input id="nome" type="text" class="form-label form-control"/></div>`+
                `<div id="outputform"></div>`
            //lettura valori inseriti
            document.querySelector("#Prenota").onclick = async () => {
                const data = document.querySelector("#data").value;
                const ora = document.querySelector("#ora").value;
                const nome = document.querySelector("#nome").value;
                const outputform = document.getElementById("outputform");

                console.log("DATA INSERITA NEL FORM-> ", data);
                
                if (data === "" || ora === "" || nome === "") {
                    outputform.innerHTML = "KO";
                } else {
                    // AGGIUNTA DELLA DATA NEL DIZIONARIO
                    let dizTemp = {
                        "date": data,
                        "hour": parseInt(ora),
                        "name": nome,
                        "idType": (tipologiaCur + 1)                     
                    }
                    
                    //await middleware.upload(dizTemp); 
                    pubsub.publish("push-dato", dizTemp);
                    outputform.innerHTML = "Prenotazione effettuata";

                        
                }
                document.querySelector("#data").value="";
                document.querySelector("#ora").value="";
                document.querySelector("#nome").value="";

                }
            }

        }
    };
