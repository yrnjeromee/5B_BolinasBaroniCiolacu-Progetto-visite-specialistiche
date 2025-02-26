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

        setData: (dato) =>{data=dato},
        
        setTipi: (tip) => {tipi=tip},

        start:(startday)=> {PrecedenteSuccessiva=startday},
        
        render: () => {
            const exportData = (date) => {
                // FUNZIONE CHE FORMATTA LA DATA
                let d = date.getDate().toString().padStart(2, '0'); // SE LEN MINORE DI 2 AGGIUNGE "0"
                let m = (date.getMonth() + 1).toString().padStart(2, '0');
                let y = date.getFullYear();
                return y + "-" + m + "-" + d;
            };

            const lisSett = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"];
            const ore = ["8", "9", "10", "11", "12"];
            let html = templateGiorni;
            let date = new Date();
            let giornoCorrente = date.getDay() - PrecedenteSuccessiva;

            if (giornoCorrente === 6) {
                date.setDate(date.getDate() + 2);
            } else if (giornoCorrente === 0) {
                date.setDate(date.getDate() + 1);
            } else {
                date.setDate(date.getDate() - (giornoCorrente - 1));
            }

            lisSett.forEach((day, index) => {
                let giornoTab = `${day}<br>${exportData(date)}`;
                html = html.replace("#D", giornoTab);
                date.setDate(date.getDate() + 1);
            });

            date.setDate(date.getDate() - 5);
            ore.forEach(ora => {
                html += `<tr class="tbl1"><td>${ora}</td>`;
                for (let i = 0; i < lisSett.length; i++) {
                    let giorno = exportData(date).split("-").join("");
                    let chiave = `${tipologiaCur + 1}-${giorno}-${ora}`;
                    let found = data.find(entry => entry.tipologia == (tipologiaCur + 1) && entry.data === giorno && entry.ora === ora);
                    
                    if (found) {
                        html += `<td class="table-info">${found.nome}</td>`;
                    } else {
                        html += `<td></td>`;
                    }
                    date.setDate(date.getDate() + 1);
                }
                date.setDate(date.getDate() - 5);
                html += `</tr>`;
            });

            parentElement.innerHTML = html;
        }
    }
};