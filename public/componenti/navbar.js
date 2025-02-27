export const NavBarComponent = (parentElementIn, pubsub) => {
    let parentElement = parentElementIn;
    let types = [];
 
    let template = `
    <input type="radio" class="btn-check" name="btnradio" value="#TIPO" id="#ID" #CHECKED>
    <label class="btn btn-outline-info btn-lg" for="#ID">#CAT</label>`

    return{
        setTypes: (tipologie) => {types = tipologie},

        render: (form,table1) => {
            // FUNZIONE CHE INIETTA DENTRO IL CONTAINER IL CSS
            let html = "";
            types.forEach((tip,index) => {
                // GENERA CODICE
                let radioId = "radio" + index;
                if ( index === 0) {
                    //PER IL CHECKED [SE è IL PRIMO ALLORA SARà CHECKED]
                    html += template.replace(/#ID/g, radioId).replace("#CAT", tip.name).replace("#TIPO", tip.name) .replace("#CHECKED", "checked");
                } else {
                    html += template.replace(/#ID/g,radioId) .replace("#CAT", tip.name).replace("#TIPO", tip.name).replace("#CHECKED", "");
                }
            });
            parentElement.innerHTML = html;

            document.querySelectorAll(".btn-check").forEach((radio) => {
                radio.onclick = () => {
                    // QUANDO CLICCO SU UNA TIPOLOGIA DI VISITA
                    let c;
                    for (let i = 0; i < types.length; i++) {
                      if (types[i].name === radio.value) {
                        c = i;
                      }
                    }
                    pubsub.publish("cambia-stato", c);
                };
            });

        }
    }
}
