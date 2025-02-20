export const createForm = (parentElement) => {
    let dato = {};
    let callback = null;
    let tipo="Cardiologia";
    return {
        setLabels: (labels) => { dato = labels; }, 
        onsubmit: (callbackInput) => { callback = callbackInput; },
        setType: (tip)=>{tipo=tip;console.log(tipo)},
        exportDiz: () => {
            
        },
        render: (table1,compFetch) => {
            //creazione input
            parentElement.innerHTML = 
                `<div>Data<br/><input id="data" type="date" class="form-label form-control"/></div>` +
                `<div>Ora<br/><select id="ora" name="ora" class="form-select"><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option></select></div>` +
                `<div>Nome<br/><input id="nome" type="text" class="form-label form-control"/></div>`+
                `<div id="outputform"></div>`
            //lettura valori inseriti
            document.querySelector("#Prenota").onclick = () => {
                const data = document.querySelector("#data").value;
                const ora = document.querySelector("#ora").value;
                const nome = document.querySelector("#nome").value;
                const outputform = document.getElementById("outputform");

                if (data === "" || ora === "" || nome === "") {
                    outputform.innerHTML = "KO";
                } else {
                    // AGGIUNTA DELLA DATA NEL DIZIONARIO
                    const datasenzatrattini = data.split("-").join("");
                    const result={}
                    let chiave = tipo+"-"+datasenzatrattini+"-"+ora;
                    if(chiave in dato){
                        outputform.innerHTML="KO";
                        
                    }
                    else{
                        dato[chiave] = nome;
                        outputform.innerHTML = "OK";
                        console.log(dato);
                        
                        compFetch.setData(dato).then(data => {
                            compFetch.getData().then(data=>{
                                dato=data;
                                table1.setData(data)
                                table1.render()
                            })
                        })}
                }
                document.querySelector("#data").value="";
                document.querySelector("#ora").value="8";
                document.querySelector("#nome").value="";

                }
            }

        }
    };
