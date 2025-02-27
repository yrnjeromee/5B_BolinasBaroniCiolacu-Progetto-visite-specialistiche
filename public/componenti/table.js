export const tableComponent = (parentElementIn, pubsub) => {
    let data = [];
    let tipi = [];
    let parentElement = parentElementIn;
    let tipologiaCur = 0;


    let PrecedenteSuccessiva=0
    let templateGiorni = `
        <tr class="tbl1">
            <td></td>
            <td>#D</td>
            <td>#D</td>
            <td>#D</td>
            <td>#D</td>
            <td>#D</td>
        </tr>
    `;
    
    return {
        setTipologiaCur: (tipologia) => {tipologiaCur = tipologia;},

        setData: (dato) =>{data = dato},
        
        setTipi: (tip) => {tipi = tip},

        start:(startday)=> {PrecedenteSuccessiva=startday},
        
        render: () => {
            console.log("DATA PRESENTE SULLA TABELLA-> ", data);
            console.log("PE TABLE -> ", parentElement);
            const exportData = (date) => {
                // FUNZIONE CHE FORMATTA LA DATA
                let d = date.getDate().toString().padStart(2, '0'); // SE LEN MINORE DI 2 AGGIUNGE "0"
                let m = (date.getMonth() + 1).toString().padStart(2, '0');
                let y = date.getFullYear();
                return y + "-" + m + "-" + d;
            };

            const lisSett = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
            const ore = [8, 9, 10, 11, 12];
            let html = templateGiorni;
            let date = new Date();
            let giornoCorrente = date.getDay() - PrecedenteSuccessiva;

            //CONTROLLA CHE GIORNO SIAMO E IN CASO PASSA ALLA PROSSIMA SETTIMANA
            if (giornoCorrente === 6) {
                date.setDate(date.getDate() + 2);
            } else if (giornoCorrente === 0) {
                date.setDate(date.getDate() + 1);
            } else {
                date.setDate(date.getDate() - (giornoCorrente - 1));
            }
            //----------------------------------------------

            lisSett.forEach((day, index) => {
                let giornoTab = `${day}<br>${exportData(date)}`;
                console.log("GIORNO TAB -> ", giornoTab);
                html = html.replace("#D", giornoTab);
                date.setDate(date.getDate() + 1);
            });

            date.setDate(date.getDate() - 5);

            ore.forEach(ora => {
                html += `<tr class="tbl1"><td>${ora}</td>`;

                let dataTemporanea = new Date(date);
                
                for (let i = 0; i < lisSett.length; i++) {
                    let giornoScorrimento = exportData(date);
                    
                    const datiFiler = data.find((el) => {
                        let dd = el.date.slice(0, 10);
                        //console.log("DD-> ", dd, "GIORNO SCORRIMENTO-> ", giornoScorrimento);
                        console.log("--------------------");
                        console.log("NOME-> ", el.name);
                        console.log("EL-> ", el.idType, "TIPOLOGIA CUR-> ", (tipologiaCur + 1));
                        console.log("EL-> ", dd, "DATE-> ", giornoScorrimento);
                        console.log("EL-> ", el.hour, "ora-> ", ora);

                        return el.idType == (tipologiaCur + 1) && dd == giornoScorrimento && el.hour == ora;
                    })

                    if (datiFiler) {
                        //SE ESISTE LA PRENOTAZIONE
                        let tt = `<td class="table-info">%BOOK</td>`;
                        html += tt.replace("%BOOK", datiFiler.name);
                    } else {
                        html += `<td></td>`;
                    }

                    date.setDate(date.getDate() + 1);

                }
                date.setDate(date.getDate() - 5);
                html += `</tr>`;
            });

            parentElement.innerHTML = html;
            console.log("RENDER TABELLA-> ", html);
            
        }
    }
};