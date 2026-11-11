/* =====================================================
   MY BABY SHOWER
   JAVASCRIPT COMPLETO
   ANIMACIONES Y ESCENAS INTERACTIVAS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       1. ELEMENTOS DE LA INVITACIÓN
    ================================================= */

    // ESCENA 1: SOBRE
    const portada = document.getElementById("portada");
    const sobre = document.getElementById("sobre");
    const abrirSobre = document.getElementById("abrirSobre");
    const cartaInterior = document.getElementById("cartaInterior");
    const comenzarMagia = document.getElementById("comenzarMagia");

    // ESCENA 2: BIENVENIDA
    const presentacion = document.getElementById("presentacion");
    const siguienteEscena = document.getElementById("siguienteEscena");

    // ESCENA 3: INVITACIÓN OFICIAL
    const invitacionFinal = document.getElementById("invitacionFinal");
    const continuarInvitacion = document.getElementById("continuarInvitacion");

    // ESCENA 4: BEBÉS Y CUENTA REGRESIVA
    const escenaBebes = document.getElementById("escenaBebes");
    const botonRevelacion = document.getElementById("botonRevelacion");

    const pantallaConteo = document.getElementById("pantallaConteo");
    const numeroConteo = document.getElementById("numeroConteo");

    // ESCENA 5: REVELACIÓN
    const escenaRevelacion = document.getElementById("escenaRevelacion");
    const confeti = document.getElementById("confeti");
    const tituloRevelacion = document.getElementById("tituloRevelacion");
    const mensajeRevelacion = document.getElementById("mensajeRevelacion");
    const globosRevelacion = document.getElementById("globosRevelacion");
    const verInvitacion = document.getElementById("verInvitacion");
    const repetirSorpresa = document.getElementById("repetirSorpresa");

    // LIBRO DE BUENOS DESEOS
    const abrirLibro = document.getElementById("abrirLibro");
    const libroDeseos = document.getElementById("libroDeseos");
    let temporizadorLibro = null;
    const formBuenosDeseos = document.getElementById("formBuenosDeseos");
    const enviarDeseo = document.getElementById("enviarDeseo");
    const estadoDeseo = document.getElementById("estadoDeseo");

    // CUENTA REGRESIVA DEL EVENTO
    const dias = document.getElementById("dias");
    const horas = document.getElementById("horas");
    const minutos = document.getElementById("minutos");
    const segundos = document.getElementById("segundos");


    /* =================================================
       2. VARIABLES DE CONTROL
    ================================================= */

    let sobreYaAbierto = false;
    let magiaIniciada = false;
    let revelacionIniciada = false;

    let intervaloRevelacion = null;

    // Datos de la revelación (se piden al servidor).
    let promesaRevelacion = null;

    const esperar = (milisegundos) => {
        return new Promise((resolve) => {
            setTimeout(resolve, milisegundos);
        });
    };


    /* =================================================
       3. FUNCIÓN PARA CAMBIAR DE ESCENA
    ================================================= */

    function mostrarEscena(escenaNueva, escenaAnterior = null) {

        if (escenaAnterior) {
            escenaAnterior.classList.remove("activa");
        }

        escenaNueva.classList.add("activa");

        // Reiniciar el desplazamiento de la nueva escena.
        escenaNueva.scrollTop = 0;
    }


    /* =================================================
       4. ESCENA 1: ABRIR EL SOBRE
    ================================================= */

    abrirSobre.addEventListener("click", async () => {

        // Evitar que el sobre se abra varias veces.
        if (sobreYaAbierto) {
            return;
        }

        sobreYaAbierto = true;

        abrirSobre.disabled = true;

        // Ocultar el título de la portada.
        portada.classList.add("sobre-abierto");

        // Activar la animación del sobre.
        sobre.classList.add("abierto");

        // Esperar a que se abra la solapa.
        await esperar(1800);

        /*
           Sacamos la carta del sobre y la colocamos
           directamente dentro del body.

           Esto permite que position: fixed funcione
           correctamente en celulares y computadoras.
        */

        document.body.appendChild(cartaInterior);

        // Expandir la carta.
        cartaInterior.classList.add("carta-expandida");

    });


    /* =================================================
       5. ESCENA 1 A ESCENA 2
       COMENZAR LA MAGIA
    ================================================= */

    comenzarMagia.addEventListener("click", async () => {

        if (magiaIniciada) {
            return;
        }

        magiaIniciada = true;

        comenzarMagia.disabled = true;

        // Desvanecer la carta.
        cartaInterior.style.opacity = "0";

        await esperar(500);

        // Mostrar la escena de bienvenida.
        mostrarEscena(presentacion);

        // Ocultar la carta completamente.
        cartaInterior.hidden = true;

    });


    /* =================================================
       6. ESCENA 2 A ESCENA 3
       MOSTRAR INVITACIÓN OFICIAL
    ================================================= */

    siguienteEscena.addEventListener("click", () => {

        mostrarEscena(invitacionFinal, presentacion);

        // Actualizar la cuenta regresiva.
        actualizarCuentaRegresiva();

    });


    /* =================================================
       7. CUENTA REGRESIVA PARA EL BABY SHOWER
    ================================================= */

    /*
       Fecha del evento:
       Domingo 6 de diciembre de 2026
       Hora: 5:00 p. m.
       Zona horaria: México (UTC-6)
    */

    const fechaBabyShower = new Date(
        "2026-12-06T17:00:00-06:00"
    ).getTime();

    function actualizarCuentaRegresiva() {

        const ahora = Date.now();

        const diferencia = Math.max(
            0,
            fechaBabyShower - ahora
        );

        const dias = Math.floor(
            diferencia / (1000 * 60 * 60 * 24)
        );

        const horas = Math.floor(
            (diferencia / (1000 * 60 * 60)) % 24
        );

        const minutos = Math.floor(
            (diferencia / (1000 * 60)) % 60
        );

        const segundos = Math.floor(
            (diferencia / 1000) % 60
        );

        const valores = {
            dias,
            horas,
            minutos,
            segundos
        };

        for (const [id, valor] of Object.entries(valores)) {

            const elemento = document.getElementById(id);

            if (elemento) {
                elemento.textContent =
                    String(valor).padStart(2, "0");
            }
        }
    }

    actualizarCuentaRegresiva();

    setInterval(actualizarCuentaRegresiva, 1000);


    /* =================================================
       8. ESCENA 3 A ESCENA 4
       MOSTRAR LOS DOS BEBÉS
    ================================================= */

    continuarInvitacion.addEventListener("click", () => {

        mostrarEscena(escenaBebes, invitacionFinal);

    });


    /* =================================================
       9. ESCENA 4: INICIAR CUENTA REGRESIVA
       PARA LA REVELACIÓN DE GÉNERO
    ================================================= */

    botonRevelacion.addEventListener("click", () => {

        // Evitar iniciar el conteo varias veces.
        if (revelacionIniciada) {
            return;
        }

        // No se puede avanzar sin votar primero.
        if (!yaVoto()) {
            actualizarBotonRevelacion();
            estadoVoto.textContent = "👆 Primero vota: ¿Team Niña o Team Niño?";
            votacion.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        revelacionIniciada = true;

        // Desactivar y ocultar el botón.
        botonRevelacion.disabled = true;
        botonRevelacion.hidden = true;

        // Pedir la sorpresa mientras corre el conteo.
        const datosRevelacion = cargarRevelacion();

        // Ocultar la votación y mostrar la pantalla del conteo.
        votacion.hidden = true;
        pantallaConteo.hidden = false;

        // Empezar desde cinco.
        let numeroActual = 5;

        mostrarNumero(numeroActual);

        /*
           El conteo mostrará:

           5
           4
           3
           2
           1

           Después de cinco segundos,
           aparecerá la revelación.
        */

        intervaloRevelacion = setInterval(() => {

            numeroActual--;

            if (numeroActual > 0) {

                mostrarNumero(numeroActual);

            } else {

                // Detener el intervalo.
                clearInterval(intervaloRevelacion);

                intervaloRevelacion = null;

                // Mostrar la escena final.
                datosRevelacion.then(mostrarRevelacion);

            }

        }, 1000);

    });


    /* =================================================
       10. ANIMACIÓN DE LOS NÚMEROS
    ================================================= */

    function mostrarNumero(numero) {

        // Quitar la animación anterior.
        numeroConteo.classList.remove("animar");

        // Forzar actualización visual.
        void numeroConteo.offsetWidth;

        // Colocar el nuevo número.
        numeroConteo.textContent = numero;

        // Activar animación.
        numeroConteo.classList.add("animar");

    }


    /* =================================================
       11. MOSTRAR LA REVELACIÓN FINAL
    ================================================= */

    /*
       La revelación no está escrita en la página:
       se pide al servidor solo cuando empieza el conteo,
       para que nadie descubra la sorpresa antes de tiempo.
    */

    function cargarRevelacion() {

        if (!promesaRevelacion) {

            promesaRevelacion = pedirRevelacion(3).catch(() => {

                // Permitir reintentar la próxima vez.
                promesaRevelacion = null;

                return null;

            });
        }

        return promesaRevelacion;
    }

    async function pedirRevelacion(intentos) {

        for (let i = 1; i <= intentos; i++) {

            try {

                const respuesta = await fetch("/api/revelacion?token=" + encodeURIComponent(tokenVoto), {
                    cache: "no-store"
                });

                if (respuesta.ok) {
                    return await respuesta.json();
                }

            } catch (error) {
                // Reintentar.
            }

            await esperar(800 * i);
        }

        throw new Error("No se pudo cargar la revelación");
    }

    function mostrarRevelacion(datos) {

        // Ocultar la pantalla del conteo.
        pantallaConteo.hidden = true;

        if (datos) {

            tituloRevelacion.textContent = datos.titulo;
            tituloRevelacion.style.color = datos.color;
            mensajeRevelacion.textContent = datos.mensaje;
            globosRevelacion.textContent = datos.decoracion;
            escenaRevelacion.style.background = datos.fondo;

        } else {

            tituloRevelacion.textContent = "¡Ups!";
            mensajeRevelacion.textContent =
                "No pudimos cargar la sorpresa. Revisa tu conexión y toca «Repetir la sorpresa».";

        }

        // Resultado de la votación (quién acertó).
        mostrarResultadoVotacion(datos);

        // Cambiar a la escena 5.
        mostrarEscena(escenaRevelacion, escenaBebes);

        // Crear confeti.
        if (datos) {
            crearConfeti(datos.confeti);
        }

        // El libro queda oculto durante la revelación y su botón
        // aparece unos segundos después.
        prepararLibro(datos ? 4000 : 0);

    }


    /* =================================================
       11.1 LIBRO DE BUENOS DESEOS: OCULTAR Y ABRIR
    ================================================= */

    function cerrarLibro() {

        clearTimeout(temporizadorLibro);
        temporizadorLibro = null;

        libroDeseos.hidden = true;
        libroDeseos.classList.remove("abierto");

        abrirLibro.hidden = true;
        abrirLibro.classList.remove("aparecer");
        abrirLibro.setAttribute("aria-expanded", "false");

    }

    function prepararLibro(retraso) {

        cerrarLibro();

        temporizadorLibro = setTimeout(() => {

            abrirLibro.hidden = false;
            abrirLibro.classList.add("aparecer");

        }, retraso);

    }

    abrirLibro.addEventListener("click", () => {

        abrirLibro.hidden = true;
        abrirLibro.setAttribute("aria-expanded", "true");

        libroDeseos.hidden = false;
        libroDeseos.classList.add("abierto");

        cargarDeseos();

        libroDeseos.scrollIntoView({ behavior: "smooth", block: "start" });

        const campoNombre = formBuenosDeseos.querySelector('input[name="nombre"]');

        if (campoNombre) {
            campoNombre.focus({ preventScroll: true });
        }

    });


    /* =================================================
       12. CREAR CONFETI ANIMADO
    ================================================= */

    function crearConfeti(colores) {

        // Limpiar confeti anterior.
        confeti.innerHTML = "";

        // Cantidad de piezas.
        const cantidadConfeti = 120;

        for (let i = 0; i < cantidadConfeti; i++) {

            const pieza = document.createElement("span");

            pieza.classList.add("pieza-confeti");

            // Color aleatorio.
            const colorAleatorio = Math.floor(
                Math.random() * colores.length
            );

            pieza.style.backgroundColor = colores[colorAleatorio];

            // Posición horizontal aleatoria.
            pieza.style.left = Math.random() * 100 + "%";

            // Tamaño aleatorio.
            pieza.style.width = (6 + Math.random() * 8) + "px";

            pieza.style.height = (10 + Math.random() * 12) + "px";

            // Duración de caída.
            pieza.style.animationDuration =
                (3 + Math.random() * 4) + "s";

            // Retraso de aparición.
            pieza.style.animationDelay =
                (Math.random() * 2) + "s";

            // Rotación inicial.
            pieza.style.transform =
                "rotate(" + (Math.random() * 360) + "deg)";

            // Agregar pieza al contenedor.
            confeti.appendChild(pieza);

        }

        /*
           Eliminar las piezas después de que
           termine la animación para evitar
           acumular elementos innecesarios.
        */

        setTimeout(() => {

            confeti.innerHTML = "";

        }, 10000);

    }


    /* =================================================
       12.1 VOLVER A LA INVITACIÓN O REPETIR LA SORPRESA
    ================================================= */

    verInvitacion.addEventListener("click", () => {

        mostrarEscena(invitacionFinal, escenaRevelacion);

        actualizarCuentaRegresiva();

    });

    repetirSorpresa.addEventListener("click", () => {

        // Reiniciar el estado de la revelación.
        revelacionIniciada = false;

        botonRevelacion.hidden = false;
        actualizarBotonRevelacion();

        pantallaConteo.hidden = true;
        numeroConteo.textContent = "5";

        votacion.hidden = false;

        confeti.innerHTML = "";

        cerrarLibro();

        mostrarEscena(escenaBebes, escenaRevelacion);

    });



    /* =================================================
       12.1 VOTACIÓN: ¿NIÑO O NIÑA?
    ================================================= */

    const votacion = document.getElementById("votacion");
    const botonesVoto = votacion.querySelectorAll(".boton-voto");
    const marcadorVotos = document.getElementById("marcador");
    const barraNina = document.getElementById("barraNina");
    const barraNino = document.getElementById("barraNino");
    const porcentajeNina = document.getElementById("porcentajeNina");
    const porcentajeNino = document.getElementById("porcentajeNino");
    const estadoVoto = document.getElementById("estadoVoto");
    const resultadoVotacion = document.getElementById("resultadoVotacion");

    // Identificador anónimo de este teléfono (para poder cambiar el voto).
    function obtenerTokenVoto() {
        let token = null;
        try {
            token = localStorage.getItem("tokenVoto");
            if (!token) {
                token = (crypto.randomUUID && crypto.randomUUID()) ||
                    Date.now().toString(36) + Math.random().toString(36).slice(2);
                localStorage.setItem("tokenVoto", token);
            }
        } catch (error) {
            token = token || Date.now().toString(36) + Math.random().toString(36).slice(2);
        }
        return token;
    }

    const tokenVoto = obtenerTokenVoto();
    let marcadorActual = null;

    // Después de ver la revelación ya no se puede cambiar el voto.
    // Solo se cierra si el invitado ya votó: quien nunca votó
    // (por ejemplo, vio la sorpresa antes de que existiera la votación)
    // puede votar y así desbloquear el botón.
    function votacionCerrada() {
        try {
            return localStorage.getItem("revelacionVista") === "si" && yaVoto();
        } catch (error) {
            return false;
        }
    }

    // ¿Este invitado ya votó? (servidor o, de respaldo, este teléfono)
    function yaVoto() {
        if (marcadorActual && marcadorActual.miVoto) return true;
        try {
            return !!localStorage.getItem("miVoto");
        } catch (error) {
            return false;
        }
    }

    // El botón de la sorpresa se habilita solo después de votar.
    function actualizarBotonRevelacion() {
        const puede = yaVoto();
        botonRevelacion.disabled = !puede;
        botonRevelacion.classList.toggle("bloqueado", !puede);
        botonRevelacion.title = puede ? "" : "Vota primero para descubrir la sorpresa";
    }

    function porcentajes(conteo) {
        const total = conteo.nina + conteo.nino;
        if (!total) return { nina: 50, nino: 50, total };
        const nina = Math.round((conteo.nina / total) * 100);
        return { nina, nino: 100 - nina, total };
    }

    function pintarMarcador(conteo) {

        marcadorActual = conteo;

        try {
            if (conteo.miVoto) localStorage.setItem("miVoto", conteo.miVoto);
        } catch (error) {
            // Sin almacenamiento: no pasa nada.
        }

        if (!revelacionIniciada) actualizarBotonRevelacion();

        const p = porcentajes(conteo);

        barraNina.style.width = p.nina + "%";
        barraNino.style.width = p.nino + "%";
        porcentajeNina.textContent = p.nina + "%";
        porcentajeNino.textContent = p.nino + "%";

        botonesVoto.forEach((boton) => {
            const elegido = boton.dataset.equipo === conteo.miVoto;
            boton.classList.toggle("elegido", elegido);
            boton.setAttribute("aria-pressed", elegido ? "true" : "false");
            boton.disabled = votacionCerrada();
        });

        // El marcador se ve solo después de votar (para no influir).
        marcadorVotos.hidden = !conteo.miVoto;

        const votosTexto = p.total === 1 ? "1 voto" : p.total + " votos";

        if (votacionCerrada()) {
            estadoVoto.textContent = "La votación cerró para ti · " + votosTexto;
        } else if (conteo.miVoto) {
            estadoVoto.textContent = "¡Eres " + (conteo.miVoto === "nina" ? "Team Niña 💗" : "Team Niño 💙") +
                "! · " + votosTexto + " · Puedes cambiar tu voto";
        } else {
            estadoVoto.textContent = "¡Vota antes de descubrir la sorpresa!";
        }
    }

    actualizarBotonRevelacion();

    async function cargarVotos() {
        try {
            const respuesta = await fetch("/api/votos?token=" + encodeURIComponent(tokenVoto), {
                cache: "no-store"
            });
            if (respuesta.ok) {
                pintarMarcador(await respuesta.json());
            }
        } catch (error) {
            // Sin conexión: la votación sigue disponible.
        }
        return marcadorActual;
    }

    botonesVoto.forEach((boton) => {

        boton.addEventListener("click", async () => {

            if (votacionCerrada()) return;

            botonesVoto.forEach((b) => { b.disabled = true; });
            estadoVoto.textContent = "Guardando tu voto...";

            try {
                const respuesta = await fetch("/api/votos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: tokenVoto, equipo: boton.dataset.equipo })
                });
                if (!respuesta.ok) throw new Error("Error al votar");
                pintarMarcador(await respuesta.json());
            } catch (error) {
                botonesVoto.forEach((b) => { b.disabled = false; });
                estadoVoto.textContent = "No se pudo guardar tu voto. Inténtalo de nuevo.";
            }
        });
    });

    async function mostrarResultadoVotacion(datos) {

        resultadoVotacion.hidden = true;

        if (!datos || !datos.equipo) return;

        try {
            localStorage.setItem("revelacionVista", "si");
        } catch (error) {
            // Sin almacenamiento: no pasa nada.
        }

        const conteo = await cargarVotos();
        if (!conteo) return;

        const p = porcentajes(conteo);
        if (!p.total) return;

        let texto = "🗳️ El " + p[datos.equipo] + "% de los invitados acertó.";

        if (conteo.miVoto) {
            texto += conteo.miVoto === datos.equipo ? " ¡Tú también! 🎉" : " ¡Esta vez no le atinaste! 😅";
        }

        resultadoVotacion.textContent = texto;
        resultadoVotacion.hidden = false;
    }

    // Abrir la página con ?borrarvoto quita el voto de ESTE teléfono
    // (solo el suyo) y reabre la votación para volver a votar.
    async function borrarMiVotoSiSePide() {
        const params = new URLSearchParams(location.search);
        if (!params.has("borrarvoto")) return;
        try {
            await fetch("/api/votos?token=" + encodeURIComponent(tokenVoto), {
                method: "DELETE",
                cache: "no-store"
            });
        } catch (error) {
            // Sin conexión: igual se limpia en el teléfono.
        }
        try {
            localStorage.removeItem("miVoto");
            localStorage.removeItem("revelacionVista");
        } catch (error) {
            // Sin almacenamiento: no pasa nada.
        }
        params.delete("borrarvoto");
        const resto = params.toString();
        history.replaceState(null, "", location.pathname + (resto ? "?" + resto : "") + location.hash);
    }

    borrarMiVotoSiSePide().then(() => {
        actualizarBotonRevelacion();
        cargarVotos();
    });

    /* =================================================
       12.2 LIBRO DE BUENOS DESEOS (MENSAJES PRIVADOS)
    ================================================= */

    const listaDeseos = document.getElementById("listaDeseos");
    const deseosVacio = document.getElementById("deseosVacio");

    function crearTarjetaDeseo(deseo) {

        const item = document.createElement("li");
        item.className = "tarjeta-deseo";

        const texto = document.createElement("p");
        texto.className = "texto-deseo";
        texto.textContent = deseo.mensaje;

        const autor = document.createElement("p");
        autor.className = "autor-deseo";
        autor.textContent = "— " + deseo.nombre;

        item.append(texto, autor);

        return item;
    }

    function pintarDeseos(lista) {

        listaDeseos.replaceChildren(...lista.map(crearTarjetaDeseo));

        deseosVacio.hidden = lista.length > 0;
        deseosVacio.textContent = "Aún no hay mensajes. ¡Sé el primero en escribir uno! 💗";
    }

    async function cargarDeseos() {

        try {

            const respuesta = await fetch("/api/deseos", { cache: "no-store" });

            if (!respuesta.ok) {
                throw new Error("Error al cargar");
            }

            pintarDeseos(await respuesta.json());

        } catch (error) {

            if (!listaDeseos.children.length) {
                deseosVacio.hidden = false;
                deseosVacio.textContent = "No pudimos cargar los mensajes. Inténtalo más tarde.";
            }

        }
    }

    formBuenosDeseos.addEventListener("submit", async (evento) => {

        evento.preventDefault();

        enviarDeseo.disabled = true;

        estadoDeseo.className = "estado-deseo";
        estadoDeseo.textContent = "Enviando...";

        try {

            const respuesta = await fetch("/api/deseos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    Object.fromEntries(new FormData(formBuenosDeseos))
                )
            });

            if (!respuesta.ok) {
                throw new Error("Error al enviar");
            }

            const nuevo = await respuesta.json();

            formBuenosDeseos.reset();

            if (nuevo && nuevo.id) {
                listaDeseos.prepend(crearTarjetaDeseo(nuevo));
                deseosVacio.hidden = true;
            }

            estadoDeseo.classList.add("exito");
            estadoDeseo.textContent =
                "¡Gracias! Tu mensaje ya está en el libro 💗💙";

        } catch (error) {

            estadoDeseo.classList.add("error");
            estadoDeseo.textContent =
                "No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.";

        } finally {

            enviarDeseo.disabled = false;

        }
    });


    /* =================================================
       13. EVITAR CLICS MÚLTIPLES EN BOTONES
    ================================================= */

    const botones = document.querySelectorAll("button");

    botones.forEach((boton) => {

        boton.addEventListener("click", () => {

            // Pequeña animación al presionar.
            boton.style.transition = "transform 0.15s ease";

            boton.style.transform = "scale(0.96)";

            setTimeout(() => {

                boton.style.transform = "";

            }, 150);

        });

    });


    /* =================================================
       14. CONFIGURACIÓN INICIAL
    ================================================= */

    // Ocultar la cuenta regresiva de revelación.
    pantallaConteo.hidden = true;

    // Asegurar que el número inicial sea cinco.
    numeroConteo.textContent = "5";

    // Mantener la portada visible al iniciar.
    portada.classList.remove("sobre-abierto");

    // Mantener las demás escenas ocultas.
    presentacion.classList.remove("activa");

    invitacionFinal.classList.remove("activa");

    escenaBebes.classList.remove("activa");

    escenaRevelacion.classList.remove("activa");

    console.log("🎉 Invitación Baby Shower cargada correctamente");

});