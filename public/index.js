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


const createMiddleware = () => {
    return {
        load: async () => {
            const response = await fetch("/get");
            const json = await response.json();
            return json;
        },
        loadTips: async () => {
            const response = await fetch("/gettips");
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
            const fetchOptions = {
                method: "post",
                body: inputFile
        };
            console.log("INPUT FILE -> ", inputFile);
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
    const form = createForm(formElement, pubsub);
    const tableComp = tableComponent(tabella, pubsub);
    const navBarComp = NavBarComponent(navbar);
    
    

    middleware.load().then((r) => {tableComp.setData(r); tableComp.render()});
    middleware.loadTips().then((r) => {
        //CARICAMENTO TIPOLOGIE
        form.setType(r); 
        tableComp.setTipi(r);
        navBarComp.setTypes(r);
        console.log("RRR->  ",r);
        navBarComp.render();
        console.log("TIPOLOGIE CARICATE");
    });


    precendente.onclick = () => {
        starDay -= 7;
        tableComp.start(starDay)
        tableComp.render();
    }

    successiva.onclick = () => {
        starDay += 7;
        tableComp.start(starDay)
        tableComp.render();
    }
    
    navBarComp.render();
    form.render(tableComp)


    pubsub.subscribe("render-table", (table, data) => {
        middleware.upload(data);
        table.render(data);                        
        console.log("TABLE RENDERIZZATA E DATI SALVATI");

    })

    pubsub.subscribe("push-dato", async (data) => {
        await middleware.upload(data);
        middleware.load().then((r) => {tableComp.setData(r); tableComp.render()});
        console.log("DATI INSERITI");
    })

    const handleSubmit = async (event) => {
    await middleware.upload(inputFile);
    const list = await middleware.load();
    pubsub.publish("renderList",list);
    }

});
