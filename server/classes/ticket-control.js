const fs = require('fs')

class Ticket {

    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        let data = require('../data/data.json');

        if ( data.hoy === this.hoy ) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;

        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTicket() {

        return `Ticket ${ this.ultimo }`;

    }

    getUltimosCuatro() {

        return this.ultimosCuatro;

    }

    atenderTicket( escritorio ) {

        if ( this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimosCuatro.unshift( atenderTicket );

        if ( this.ultimosCuatro.length > 4 ) {
            this.ultimosCuatro.splice(-1,1);
        }

        console.log('Ultimos Cuatro');
        console.log(this.ultimosCuatro);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        
        console.log('Se ha inicialidazo el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {

        let  jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


}

module.exports = {
    TicketControl
}