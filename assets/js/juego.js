const moduloBlackJack = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //referencias a HTML 
    const btnPedirCarta = document.querySelector('#btnPedirCarta'), 
            btnDetener = document.querySelector('#btnDetener'),
            btnNuevoJuego = document.querySelector('#btnNuevoJuego');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
            puntosHtml = document.querySelectorAll('small'); 
            
    // esta funcion inicializa el juego
    const inicializacionjUEGO = (numjugadores = 2 )=>{
         deck = crearDeck();
        puntosJugadores = [];

         for( let i=0; i< numjugadores; i++){
             puntosJugadores.push(0);
         }

        puntosHtml.forEach(elemento => elemento.innerText = 0 ); //callback
        divCartasJugadores.forEach(elemento => elemento.innerHTML = '' );
        btnPedirCarta.disabled = false;
        btnDetener.disabled = false;
    } 

    // FUNCION PARA CREAR DECK
    const crearDeck = () => {
        deck = [];
        for( let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push( i + tipo );
            }
        }
     
        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push( especial + tipo );
            }
        }   

        return _.shuffle( deck ); 

    }
    
    // FUNCION PARA PEDIR CARTA
    const pedirCarta = () =>{
        
        if ( deck.length === 0 ){
            throw 'No hay cartas en el deck' // throw es una palabra reservada de javaScript para mandar mensajes en consola 
        }
        
        return deck.pop();
    }

    const valorCarta = (carta) => { // nota todos los Strings en JavaScript JavaScript lo puede trabajar como arreglos 
            const valor = carta.substring(0,carta.length -1 ); // el metodo substring devuelve la parte de una cadeda de strings (Areglos)

        return ( isNaN ( valor ) ) ?
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }

    // turno: 0 = jugador y el utimo va hacer el de
    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img'); // creamos una constante la cual nos crea una etiqueta img de html
        imgCarta.src = `assets/cartas/${carta}.png`; // dentro de la etiqueta agregamos el src
        imgCarta.classList.add('carta');// agregamos la clase de css a la etiquetra ya creada
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () =>{
       const [ puntosMinimos, puntosComputadora ] = puntosJugadores; 
        setTimeout(()=>{
            if( puntosComputadora === puntosMinimos){
                alert('Nadie gana :(')
            }else if ( puntosMinimos > 21 ){
                alert('Computadora Gana');
            }else if(puntosComputadora > 21){
                alert('jugador gana');
            }else{
                alert('Computadora gana')
            }
        }, 200 );

    }

    // turno de la computadora
    const turnoComputadora = (puntosMinimos) =>{
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1 );// hacemos referencia a la ultima posicion de nuestro areglo jugadores
            crearCarta(carta, puntosJugadores.length -1);
            
            if ( puntosMinimos > 21 ){
                break;
            }
    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();

    }

    // eventos en javaScript
    // uso de colback Nota: un collback es una funcion que se manda por argumentos
    btnPedirCarta.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);
        if ( puntosJugador > 21 ){
            console.log('Lo siento, acabas de perder')
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }else if( puntosJugador ===21){
            console.log('21, Geanial, Ganaste');
            btnPedirCarta.disabled = true;
            btnDetener.disabled = true;
        }   
    }); 

    btnDetener.addEventListener('click', () =>{
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
    });

    btnNuevoJuego.addEventListener('click', () =>{
        console.warn('Empezo el juego :)');
        inicializacionjUEGO();
       
    });

    return {

    }

})();





