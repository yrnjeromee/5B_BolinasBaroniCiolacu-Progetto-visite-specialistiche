const tabella = document.getElementById("tabella");
const precendente = document.getElementById("precedente");
const successiva = document.getElementById("successiva");
let starDay = 0;
const navbar = document.getElementById("navbar");
const formElement = document.getElementById("form");


import {generatePubSub} from './componenti/pubsub.js';
import {createNavigator} from './componenti/navigator.js';
import { tableComponent } from './componenti/table.js';
import { NavBarComponent } from './componenti/navbar.js';
import { createForm } from './componenti/form.js';
import { generateFetchComponent } from './componenti/fetch_component.js';

const createMiddleware = () => {
    return {
        load: async () => {
            const response = await fetch("/get");
            const json = await response.json();
            return json;
        },
        delete: async (id) => {
            const response = await fetch("/delete/" + id, {
                method: "DELETE",
            });
            const json = await response.json();
            return json
        },
        upload: async (inputFile) => {
            const formData = new FormData();
            formData.append("file", inputFile.files[0]);
            const body = formData;
            const fetchOptions = {
                method: "post",
                body: body
        };
        try {
            const res = await fetch("/upload", fetchOptions);
            const data = await res.json();
            console.log(data);
        } catch (e) {
            console.log(e);
        }
        }
        }
}



fetch("./conf.json").then(r => r.json()).then(conf => {
    const pubsub = generatePubSub();
    const middleware = createMiddleware();
    const form = createForm(formElement);
    const table1 = tableComponent();
    const navBarComp = NavBarComponent(conf);
    const compFetch = generateFetchComponent()
    compFetch.caricaDati(conf)
    compFetch.getData().then(data => {
        form.setLabels(data);
        table1.setData(data); // Imposta i dati nel componente tabella
        table1.setParentElement(tabella);
        table1.render(starDay);// Renderizza la tabella con i dati recuperati
    });
    precendente.onclick = () => {
        starDay -= 7;
        table1.start(starDay)
        table1.render();
    }

    successiva.onclick = () => {
        starDay += 7;
        table1.start(starDay)
        table1.render();
    }
    navBarComp.setParentElement(navbar);
    navBarComp.render(form,table1);
    form.render(table1,compFetch)


    pubsub.subscribe("render-table", (table, data) => {
        middleware.upload(data);
        table.render(data);                        
        console.log("TABLE RENDERIZZATA E DATI SALVATI");

    })
});
