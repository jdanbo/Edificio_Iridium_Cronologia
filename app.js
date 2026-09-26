'use strict';
const START = 2017, END = 2026; // inclusive years
const TOTAL = (END - START + 1) * 12;
const MES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const MESL = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const idx = s => { const [y,m] = s.split("-").map(Number); return (y - START) * 12 + (m - 1); };
const pct = i => (i / TOTAL * 100) + "%";
const fmt = s => { const [y,m] = s.split("-").map(Number); return MES[m-1] + " " + y; };

const CATS = {
  diseno:{n:"Arquitectura y diseño", c:"--c-diseno"},
  ing:{n:"Ingenierías y estudios", c:"--c-ing"},
  cli:{n:"Decisiones del cliente", c:"--c-cli"},
  tram:{n:"Municipalidad y licencias", c:"--c-tram"},
  cost:{n:"Cotizaciones y contratación", c:"--c-cost"},
  ctx:{n:"Contexto", c:"--c-ctx"}
};

const PHASES = [
  {id:"f1", n:"Anteproyecto en estructura metálica", s:"2017-03", e:"2018-07", c:"--p1",
   p:"Primeras distribuciones y crecimiento del programa. Todo en esta etapa se trabajó en estructura metálica.",
   ev:[
    ["mar 2017","diseno","Se comparte el plano de desmembración del terreno."],
    ["may 2017","diseno","Primeros análisis preliminares de distribución: 3 sótanos y 3 niveles."],
    ["jul 2017","diseno","El programa crece a 3 sótanos y 8 niveles."],
    ["sep 2017","diseno","El programa crece a 4 sótanos y 8 niveles."],
    ["12 oct 2017","cli","A solicitud de Robie Dalton se comparte toda la información de la propuesta en PDF y DWG para revisar posibles mejoras."],
    ["abr 2018","diseno","Apoyo con temas de gigantografía."],
    ["jul 2018","cost","Se envía la primera propuesta de honorarios."]
   ], note:"Todo lo anterior se desarrolló en estructura metálica."},
  {id:"f2", n:"Estudios y definición estructural", s:"2019-01", e:"2019-12", c:"--p2",
   p:"Estudios de suelo y topografía, primer estimado de inversión y análisis acero vs. concreto que llevó a decidir por concreto.",
   ev:[
    ["ene 2019","ing","Inicia la cotización de los diseños de ingenierías."],
    ["feb 2019","ing","Estudio de suelos y diseño de protecciones de vecindades con la Ing. Wilma De León; su oferta se aprueba el 6 de febrero.",1],
    ["mar 2019","ing","SERVIMA apoya a conseguir la topografía compartiendo el contacto de GYFSA (con intervención desde antes)."],
    ["28 mar 2019","cost","Primer análisis preliminar de inversión: <span class='money'>$4,179,000.00</span>."],
    ["abr 2019","diseno","Análisis de factibilidad acero vs. concreto con predimensionamientos y distribución arquitectónica por nivel. Se compara la cantidad de parqueos posible en cada sistema contra los requerimientos municipales."],
    ["abr 2019","ing","Oferta de diseño de protecciones perimetrales de la Ing. Wilma De León y Rodolfo Semrau."],
    ["may 2019","cli","Se solicita agregar un 5.º sótano. Se cotiza el análisis técnico estructural acero vs. concreto con Nájera Ingenieros y con el Ing. Eduardo León; este último presenta la oferta más económica, con la capacidad técnica y experiencia necesarias."],
    ["11 jul 2019","ing","Se presenta a Diego la comparación de ofertas; Diego confirma proceder con el Ing. Eduardo León (ahorro aproximado de US$3,000 y buenas referencias) y se contrata para el análisis acero vs. concreto."],
    ["ago 2019","cost","Con el análisis preliminar del Ing. León, Aceros Arquitectónicos presenta oferta preliminar (solicitada por el Arq. Daniel Borja a Andrés) y Luis, de Macro, cotiza preliminarmente la inversión en concreto."],
    ["sep 2019","cli","Se decide, en conjunto con Diego Cuestas y el Ing. Eduardo León, que es más conveniente construir en concreto. El Ing. León optimiza las plantas modelando la estructura de distintas formas; se coordina con la Ing. Wilma De León el empate entre el edificio y el muro de soil nailing.",1],
    ["oct 2019","ing","Predimensionamiento de vigas y columnas para afinar la arquitectura a esos requerimientos."],
    ["nov 2019","diseno","Dos arquitectos de la oficina trabajan en paralelo la distribución de parqueos y de apartamentos. Se envía la versión preliminar en concreto con distribuciones internas. Reuniones constantes con Diego y Cronwell; las distribuciones se presentan en JD de GL3."],
    ["dic 2019","ing","Se reciben los planos estructurales finales del Ing. Eduardo León para esta propuesta."]
   ]},
  {id:"f3", n:"Arquitectura, apartamentos y fachada", s:"2020-01", e:"2020-12", c:"--p3",
   p:"Anteproyecto municipal, nombre del edificio, distribución de apartamentos y propuestas de fachada con 6arquitectos, en plena pandemia.",
   ev:[
    ["ene 2020","tram","Se solicita permiso para iniciar conversación con FECI (Municipalidad, anteproyecto)."],
    ["mar 2020","cli","Se confirma proceder con la prefactibilidad municipal. La JD confirma el nombre IRIDIUM y se presenta la primera distribución de apartamentos.",1],
    ["13 mar 2020","ctx","Cierre por pandemia."],
    ["fin mar 2020","diseno","Se comparte a Diego la propuesta de distribución de apartamentos, del nivel 2 hasta la terraza."],
    ["may 2020","diseno","Propuestas de fachada y modelo de distribución interna. Primer acercamiento con 6arquitectos para el diseño de fachada."],
    ["jun 2020","diseno","Inicia la cotización de elevadores para dimensionar correctamente los ductos. Continúa la planimetría arquitectónica."],
    ["ago 2020","diseno","Varias reuniones con 6arquitectos y Diego Cuestas; se reciben varias propuestas de fachada."],
    ["sep 2020","cost","Modificaciones a la sala de ventas y apartamentos; se buscan opciones para modelar y presentar para la venta. Se comparten planos a Grupo Macro para su propuesta de inversión de construcción: la decisión de ejecutar queda sujeta a esa información por el COVID."],
    ["oct–dic 2020","diseno","Desarrollo a detalle de la arquitectura, empatada con la estructura."]
   ]},
  {id:"f4", n:"Pausa por pandemia", s:"2021-01", e:"2022-01", c:"--p4", pause:1,
   p:"El avance se detiene a la espera de la Junta Directiva de GL3.",
   ev:[
    ["21 ene 2021","cost","A solicitud de GL3 se traslada toda la información del proyecto al Ing. Luis Rodas (Grupo Macro) para un planteamiento de inversión."],
    ["ene–mar 2021","cli","En espera de comentarios o confirmación de la JD para proceder."],
    ["25 mar 2021","cli","Se envía a Cromwell y Diego el estado del proyecto: anteproyecto, diseño estructural, estudio de suelos y diseño de muros soil nailing concluidos; pendientes para iniciar trámites y estrategia de contratación."],
    ["jun 2021","cost","Se comparte información con ITSA para que cotice estructura principal y retenciones."],
    ["2021","cli","Se solicita pausar el avance hasta que termine la pandemia o haya nuevas noticias de la JD de GL3."]
   ]},
  {id:"f5", n:"Reinicio y rediseño", s:"2022-02", e:"2022-12", c:"--p5",
   p:"Nuevo programa con salas de ventas y elevador vehicular, integración con Volvo, rediseño estructural y segundo estimado de inversión.",
   ev:[
    ["feb 2022","cli","Se reinicia el proyecto.",1],
    ["mar 2022","diseno","Nueva propuesta con los cambios solicitados: 5 sótanos y 8 niveles, nivel 2 como sala de ventas y elevador de vehículos. Se reestudian rampas, estructura, dos elevadores, gradas y la ubicación del elevador de carros para los niveles 1 a 4; se replantean los niveles 3 y 4 mostrando el área disponible."],
    ["mar 2022","tram","DBR recuerda que hay que solucionar los temas registrales del terreno de Porsche."],
    ["abr 2022","diseno","Se analiza la integración de fachadas entre IRIDIUM y Volvo. Distribución final con el elevador de vehículos al frente como fachada; ajustes por la integración de salas de ventas y elevadores."],
    ["abr 2022","cli","Diego Cuestas y Cronwell autorizan ajustar el diseño estructural con el Ing. Eduardo León e iniciar la cotización de tramitologías. Se pide una fachada con detalles de madera más evidentes y colores oscuros."],
    ["may 2022","diseno","Versión B: sala de exposición solo en nivel 1, mezanine y nivel 3; el resto apartamentos, con uno pequeño y un área social en el penthouse. Análisis de dotación de parqueos, que no cumplía con los cambios."],
    ["jun 2022","cli","Cronwell confirma proceder con la opción A, con sala de ventas hasta el N3, para que la acepte la Municipalidad.",1],
    ["jul 2022","tram","Reuniones con expertos para definir cómo presentar la información y cotizar tramitologías. Se detalla cada cambio para el rediseño estructural del Ing. León."],
    ["17 ago 2022","cost","Grupo E4 entrega un antepresupuesto por m² como referencia de costos."],
    ["ago 2022","ing","Se reciben cotizaciones de diseños de ingenierías. En paralelo continúan la arquitectura y los planos para la Municipalidad."],
    ["sep 2022","ing","Se confirma la contratación del Ing. Eduardo León para el rediseño."],
    ["oct 2022","cli","Se solicita parada del elevador de vehículos hasta el N3, colocar Maserati en sala de ventas y un entrepiso para motos. Se pide analizar el entrepiso en acero, cuando el diseño en concreto ya estaba avanzado."],
    ["nov 2022","cost","Primera versión de la inversión preliminar actualizada: <span class='money'>$6,820,000.00</span>. Se prepara información para diseño eléctrico e hidrosanitario y se trabajan planos de CONRED."],
    ["dic 2022","ing","Inicia el diseño hidrosanitario con la estructura confirmada. Se reciben los planos estructurales modificados y se prepara la presentación para el proceso 360° con la Municipalidad."]
   ]},
  {id:"f6", n:"Licencias y trámites municipales", s:"2023-01", e:"2025-02", c:"--p6",
   p:"Aeronáutica Civil, MSPAS, MARN, CONRED, EMPAGUA, DCT y DPD, incentivos POT, desmembración e impacto vial, hasta la resolución final.",
   ev:[
    ["ene 2023","tram","La Municipalidad amplía los requisitos para la reunión 360°. Primera reunión con la Municipalidad el 25 de enero.",1],
    ["feb 2023","tram","Contratación de la gestión de licencia MARN."],
    ["mar 2023","ing","Se reciben planos actualizados de diseño eléctrico."],
    ["abr 2023","ing","Se solicita actualizar el estudio de suelos por la actualización de la normativa AGIES."],
    ["may 2023","tram","Acercamientos con instituciones y recopilación de información legal; impresión de planos e información con firmas del representante legal. Inician los estudios de CONRED y MARN."],
    ["jun 2023","tram","Ingreso del expediente a Aeronáutica Civil."],
    ["jul 2023","tram","Resolución aprobada de Aeronáutica Civil. Ingreso a MSPAS."],
    ["ago 2023","tram","Ingreso a MARN."],
    ["sep 2023","tram","Reuniones y seguimiento con MARN."],
    ["oct 2023","tram","Se obtiene la Licencia Ambiental.",1],
    ["nov 2023","tram","Ingreso a EMPAGUA, DCT y DPD. Para ingresar, la Municipalidad exigía contar con las resoluciones de las demás licencias."],
    ["dic 2023","tram","Después de correcciones y un seguimiento extenso, CONRED acepta procesar el expediente. La Municipalidad envía sus primeras observaciones: pese a la memoria descriptiva detallada, no entendía el uso de los primeros niveles como salas de ventas ni tenía una clasificación para salas de ventas de vehículos. Se responden todas las dudas; piden un diseño de aceras específico."],
    ["ene 2024","tram","Por normativa POT y por no tener clasificación definida para las áreas, la Municipalidad pide aplicar incentivos para construir la totalidad de m² propuestos: transparencia en el primer nivel, cambiar el uso de suelo a residencial o mixto y eliminar la actividad condicionada existente (vallas publicitarias sin autorización). Además clasificaba el uso primario como «estacionamiento de vehículos livianos» y no como uso mixto, como se había ingresado."],
    ["feb 2024","tram","Resolución de CONRED. Reunión con la Arq. Eva Lima en la que se resuelven varios acuerdos al explicar a detalle las actividades comerciales del edificio; se indica que hay que actualizar en el POT la desmembración y el estado de la finca.",1],
    ["mar 2024","tram","Resolución de MSPAS."],
    ["abr 2024","tram","Aunque las solicitudes se ingresaron en la reunión de febrero, DCT pide más memorias de cálculo y diseños de estructuras y suelos, además de declaraciones juradas de vecinos para autorizar el soil nailing."],
    ["may 2024","tram","Los abogados ingresan ante el Concejo Municipal la solicitud de desmembración. GRUBORJA elabora todos los planos registrales y coordina con GYFSA la actualización de datos registrales."],
    ["sep 2024","tram","DCT aprueba el proyecto, ya con la resolución aprobatoria de EMPAGUA. Para el cierre de trámite se emitirá la resolución de incentivos y se fija una compensación por impacto vial de <span class='money'>Q220,702.60</span>, además del pago de derechos de licencia a EMPAGUA y la contratación de una póliza de seguros.",1],
    ["oct 2024","tram","Se solicita ampliación del dictamen de impacto vial con una carta sobre los viajes que generan las agencias. Reunión presencial con la Dirección de Planificación y Diseño para explicar el proyecto y los viajes de las demás agencias de GL3."],
    ["nov 2024","tram","Se solicita el pago de licencia por regulación de fraccionamiento. Los abogados presentan la escritura pública de los incentivos acordados con la Municipalidad, con el soporte de información y proceso de GRUBORJA."],
    ["dic 2024","tram","Se reciben la póliza de seguro y el acta de incentivos firmada por el Alcalde.",1],
    ["ene 2025","cost","Monto final del pago por impacto vial: <span class='money'>Q73,289.92</span>, junto con licencias, depósitos, timbres de arquitectura e ingeniería y EMPAGUA. Órdenes de pago con vencimiento el 25 de enero."],
    ["feb 2025","tram","Se realizan los pagos y se recibe la resolución final de la Municipalidad.",1]
   ], note:"En paralelo a toda la gestión de licencias se desarrollaron los planos de detalles arquitectónicos, para confirmar distribuciones y para construcción."},
  {id:"f7", n:"Licitación y contratación de la obra", s:"2023-04", e:"2025-05", c:"--p7",
   p:"Tres constructoras compitieron por el edificio. Cada oferta se revisó renglón por renglón, se homologaron alcances y cada comparativo se trasladó a Grupo Los Tres para su decisión.",
   ev:[
    ["abr 2023","cost","Inicia la preparación de documentos para licitar la construcción como proyecto completo llave en mano. GRUBORJA prepara el cuadro base de oferencia por nivel para que todas las ofertas se comparen en el mismo formato."],
    ["5 may 2023","cost","Invitación formal a presentar oferta a Grupo E4 (Ings. Néstor Cardona y Enrique Escobar), con copia a Diego Cuestas. Diego pide que todas coticen en el mismo formato; se invita también a Grupo Macro (Ing. Luis Rodas) e ITSA (Ing. Jorge Toruño).",1],
    ["2 jun 2023","cost","Se informa a Diego que las tres constructoras (ITSA, Grupo Macro y Grupo E4) tienen la planimetría completa y el cuadro base de oferencia."],
    ["jun 2023","cost","Demolición de la casa del terreno: se reciben ofertas de Reforma E4 y de Ingeniería y Estructura. El 23 de junio Diego autoriza proceder con Ingeniería y Estructura."],
    ["17 jul 2023","cost","Grupo E4 entrega oferta llave en mano completa. Excluye CCTV, automatización de ingresos, aire acondicionado y ventilación, cocinas y clósets, electrodomésticos, gas y calentador."],
    ["21 jul 2023","cost","Grupo Macro entrega su oferta de excavación, muros soil nailing y estructura de concreto."],
    ["26–27 jul 2023","cost","Primer comparativo entre Grupo E4, Grupo Macro y el estimado de GRUBORJA, enviado a Diego y Cronwell. La oferta de E4 (<span class='money'>Q42.9 millones</span> con IVA) queda cerca del estimado de GRUBORJA (<span class='money'>Q47 millones</span>). Diego: «pequeñas las diferencias globales».",1],
    ["31 jul 2023","cost","ITSA entrega su propuesta a trato cerrado de la estructura principal."],
    ["ago 2023","cost","Revisión renglón por renglón de las tres ofertas. A Macro se le pide incluir fianzas de anticipo, cumplimiento y conservación; a ITSA, protección de vecindades (sarán) y el detalle de seguros y fianzas. E4 corrige su oferta el 8 de agosto."],
    ["sep 2023","cost","Nuevas versiones: Macro V03 con contrapiso del sótano 5; E4 cotiza estructura principal y movimiento de tierras; ITSA presenta estructura secundaria, acabados e instalaciones."],
    ["2 oct 2023","cost","GRUBORJA envía a las tres empresas una rectificación de medidas, recalcando que el proyecto es llave en mano y que deben construir lo que indican los planos."],
    ["oct–nov 2023","cost","Ofertas rectificadas: ITSA (18 oct), Grupo E4 (25 oct) y Grupo Macro V04 con mejora de costos (17 nov)."],
    ["ene 2024","cost","Revisión técnica de las tres cotizaciones de estructura (15 ene). Para homologar alcances se pide a Macro y E4 incluir pérgolas de balcones N3–N8, vigas metálicas del mezanine y techo del N8 (19 ene)."],
    ["ene–feb 2024","cost","Ofertas homologadas: Grupo E4 (30 ene) y Grupo Macro V05 (19 feb)."],
    ["jun 2024","cost","Perforación del pozo: se cotiza con cuatro empresas (Grupo Liva, Perfora, DahoPozos y Perforagua). Las ofertas son similares y la decisión final se toma por la disposición a un canje; se adjudica a Grupo Liva."],
    ["ago–sep 2024","cost","Grupo E4 (20 ago) e ITSA (11 sep) actualizan sus ofertas a precios vigentes."],
    ["26 sep 2024","cost","Se presentan a Diego dos escenarios de costos construidos con las ofertas recibidas, los costos de planificación y el presupuesto de referencia.",1],
    ["7–20 nov 2024","cost","Cuadro de costos por nivel, oferentes y escenarios, y comparativo de la Fase 1 Macro vs. ITSA. Con las revisiones, Grupo Macro resulta la mejor oferta de obra gris. Se atienden las dudas de Diego sobre el costo del N8, el cuadre de totales y el porcentaje de terreno por nivel."],
    ["16 dic 2024","cost","Se solicita a Grupo Macro ajustar su oferta a la Fase 1: excavación, muros de retención y obra gris de 5 sótanos, mezanine y 8 niveles."],
    ["8 ene 2025","cost","Grupo Macro responde que no puede iniciar antes de mayo o junio de 2025 por el límite de su equipo (grúas, formaletas, personal) al tener varios edificios arrancando al mismo tiempo.",1],
    ["10 ene 2025","cost","Se solicita a ITSA una nueva oferta de la Fase 1."],
    ["11–24 ene 2025","cost","Para mantener la competencia en excavación y protecciones se invita a Grupo Precon (Geocon), Corpiec, Nabilsa y Prodecsa, siempre con el diseño de muros de la Ing. Wilma De León. Se reciben ofertas de Nabilsa (20 ene), Precon-Geocon y Corpiec (24 ene)."],
    ["27 ene 2025","cost","ITSA entrega su oferta actualizada de movimiento de tierras, protecciones y estructura principal."],
    ["4–13 mar 2025","cost","ITSA presenta programa y flujo de caja. GRUBORJA detecta un incremento en corte, carga y acarreo y pide aclaración; ITSA sostiene el precio de enero, retira las acometidas de energía y agua y fija la ejecución en 9 meses."],
    ["12–13 mar 2025","cost","Comparativo Macro vs. ITSA vs. Geocon enviado a Diego: ITSA es la oferta más conveniente.",1],
    ["mar 2025","cost","Negociación del contrato con ITSA: multa por atraso en pago de 0.33 por millar diario a pedido de Diego, retenido de 10 % y planos como anexo. Negociación con los vecinos para la definición final de trabajos."],
    ["7–9 abr 2025","cost","Solicitud y cheque de anticipo a ITSA.",1],
    ["8 abr 2025","cost","Se agradece a Corpiec su participación y se le informa que no fue seleccionada."],
    ["16 may 2025","cost","Diego firma el contrato con ITSA."]
   ]},
  {id:"f8", n:"Construcción y administración", s:"2025-04", e:"2026-09", c:"--p8", live:1,
   p:"En curso desde el anticipo a ITSA. Las especialidades se siguen licitando con varias empresas.",
   ev:[
    ["jul 2025","cost","ITSA entrega las fianzas de anticipo y de cumplimiento (3 jul). Diego aprueba la póliza CAR con Tecniseguros (11 jul)."],
    ["ago–sep 2025","cost","Licitaciones por especialidad con varias empresas: hidrosanitarias y obra civil (INGEOTEC, Grupo E4, entre otras), instalaciones eléctricas (INELEQ, Genetec), planta de tratamiento (Wasyma) y extracción (Airetec)."],
    ["19 ene 2026","cost","Aclaración a Diego del cuadro de honorarios: el anteproyecto se cobró solo en 2019 y en el cuadro vigente está descontado en su totalidad (renglón «Descuento porque ya estaba el anteproyecto», 0.65 %)."],
    ["20 ene 2026","cli","Diego confirma: «fue error mío… Estamos bien entonces y muy agradecidos con Uds.»",1]
   ]},
  {id:"f9", n:"Distribuciones con propietarios", s:"2025-11", e:"2026-06", c:"--p9",
   p:"Revisión de las distribuciones de apartamentos con sus dueños.",
   ev:[
    ["nov 2025","diseno","Se envían las distribuciones a los dueños de los apartamentos."],
    ["mar 2026","diseno","Se reciben las últimas modificaciones a las distribuciones."],
    ["jun 2026","diseno","Se reciben nuevas observaciones de distribución de apartamentos."]
   ]}
];

const HITOS = [
  ["2019-02","feb 2019","Estudio de suelos y diseño de protecciones aprobados"],
  ["2019-09","sep 2019","Decisión: estructura de concreto"],
  ["2020-03","mar 2020","JD confirma el nombre IRIDIUM"],
  ["2022-02","feb 2022","Reinicio del proyecto"],
  ["2023-01","25 ene 2023","Primera reunión 360° con la Municipalidad"],
  ["2023-05","5 may 2023","Invitación a licitar: Grupo E4, Grupo Macro e ITSA"],
  ["2023-10","oct 2023","Licencia Ambiental (MARN)"],
  ["2024-09","sep 2024","DCT aprueba el proyecto"],
  ["2024-12","dic 2024","Acta de incentivos firmada por el Alcalde"],
  ["2025-02","feb 2025","Resolución final de la Municipalidad"],
  ["2025-04","abr 2025","Anticipo a ITSA"]
];

/* ---------- Gantt ---------- */
const g = document.getElementById("gantt");
function row(label, sub, inner, cls=""){
  return `<div class="g-row ${cls}"><div class="g-label">${label}${sub?`<small>${sub}</small>`:""}</div><div class="g-track">${inner}</div></div>`;
}
let years = "";
for(let y=START;y<=END;y++) years += `<div class="yr" style="left:${pct((y-START)*12)}">${y}</div>`;
let grid = "";
for(let y=START;y<=END;y++) grid += `<div class="gridline" style="left:${pct((y-START)*12)}"></div>`;
const todayI = idx("2026-09") + 0.8;
const today = `<div class="today" style="left:${pct(todayI)}"></div>`;
let html = row("Etapa","", years, "g-years");
let dias = "";
HITOS.forEach((h,i)=>{ dias += `<div class="dia ${i%2?'lo':'hi'}" style="left:${pct(idx(h[0])+0.5)}" title="${h[1]} — ${h[2]}"><b>${i+1}</b></div>`; });
html += row("Hitos clave","", grid + dias + today, "g-hitos");
PHASES.forEach(p=>{
  const a = idx(p.s), b = idx(p.e)+1;
  const cls = p.pause ? "bar pause" : p.live ? "bar live" : "bar";
  const bg = (p.pause||p.live) ? "" : `background:var(${p.c});`;
  const txt = p.pause ? "Pausa · 13 meses" : p.live ? "En curso" : `${b-a} meses`;
  const inner = grid + `<button class="${cls}" style="left:${pct(a)};width:calc(${pct(b-a)});${bg}" data-go="${p.id}" title="${p.n}: ${fmt(p.s)} – ${fmt(p.e)}">${(b-a)>=9?txt:""}</button>` + today;
  html += row(p.n, `${fmt(p.s)} – ${p.live?"hoy":fmt(p.e)}`, inner);
});
g.innerHTML = html;
// "Hoy" label once, on the years row
g.querySelector(".g-years .g-track").insertAdjacentHTML("beforeend", `<div class="today" style="left:${pct(todayI)}"><span>Hoy</span></div>`);
g.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>{
  const t=document.getElementById(b.dataset.go); if(t) t.scrollIntoView({block:"start"});
}));

document.getElementById("hitos").innerHTML = HITOS.map((h,i)=>
  `<li><span class="k"><span>${i+1}</span></span><span class="d">${h[1]}</span><span>${h[2]}</span></li>`).join("");

/* ---------- Programa ---------- */
const PROG = [
  ["may 2017",3,3,"Primeros análisis de distribución"],
  ["jul 2017",3,8,"Se agregan 5 niveles"],
  ["sep 2017",4,8,"Se agrega un sótano"],
  ["may 2019",5,8,"Se solicita el 5.º sótano"],
  ["mar 2022",5,8,"Salas de ventas y elevador de vehículos",1]
];
function bld(s,n){
  let h = "";
  for(let i=0;i<n;i++) h+=`<i></i>`;
  h += `<hr>`;
  for(let i=0;i<s;i++) h+=`<i class="b"></i>`;
  return `<div class="bld" aria-hidden="true">${h}</div>`;
}
document.getElementById("prog").innerHTML = PROG.map(p=>`
  <div class="step${p[4]?" final":""}">
    <div class="d">${p[0]}</div>
    <div class="v">${p[1]} sót. <em>+</em> ${p[2]} niv.</div>
    ${bld(p[1],p[2])}
    <div class="s">${p[3]}</div>
  </div>`).join("");

/* ---------- Licencias ---------- */
const LS = idx("2023-01"), LE = idx("2025-03"), LT = LE - LS;
const lp = i => ((i - LS) / LT * 100) + "%";
const LIC = [
  ["Aeronáutica Civil","Ingreso → resolución aprobada","2023-06","2023-07"],
  ["MARN · Licencia Ambiental","Contratación de gestión → licencia","2023-02","2023-10"],
  ["MSPAS","Ingreso → resolución","2023-07","2024-03"],
  ["CONRED","Inicio de estudios → resolución","2023-05","2024-02"],
  ["EMPAGUA · DCT · DPD","Ingreso → aprobación DCT","2023-11","2024-09"],
  ["Incentivos POT y desmembración","Solicitud municipal → acta firmada","2024-01","2024-12"],
  ["Municipalidad (total)","Reunión 360° → resolución final","2023-01","2025-02",1]
];
let lh = `<div class="lic-row lic-head"><div class="nm">Trámite</div><div class="tr">`;
for(let y=2023;y<=2025;y++) lh += `<span style="left:${lp(idx(y+"-01"))}">${y}</span>`;
lh += `</div><div class="du">Duración</div></div>`;
lh += LIC.map(l=>{
  const a=idx(l[2]), b=idx(l[3])+1, m=b-a-1;
  const meses = m<=1 ? "1 mes" : m+" meses";
  return `<div class="lic-row"><div class="nm">${l[0]}<small>${l[1]}</small></div>
    <div class="tr"><div class="lbar${l[4]?" total":""}" style="left:${lp(a)};width:${(b-a)/LT*100}%" title="${fmt(l[2])} – ${fmt(l[3])}"></div></div>
    <div class="du"><b>${meses}</b><br>${fmt(l[2])} – ${fmt(l[3])}</div></div>`;
}).join("");
document.getElementById("lic").innerHTML = lh;

/* ---------- Detalle ---------- */
const active = new Set(Object.keys(CATS));
const fEl = document.getElementById("filters");
fEl.innerHTML = Object.entries(CATS).map(([k,v])=>
  `<button class="chip" id="chip-${k}" aria-pressed="true" data-k="${k}" style="--c:var(${v.c})"><i></i>${v.n}</button>`).join("");
fEl.addEventListener("click",e=>{
  const b=e.target.closest(".chip"); if(!b) return;
  const k=b.dataset.k;
  // first click isolates a category; clicking the only active one restores all
  if(active.size===Object.keys(CATS).length){ active.clear(); active.add(k); }
  else if(active.has(k)){ active.delete(k); if(!active.size) Object.keys(CATS).forEach(x=>active.add(x)); }
  else active.add(k);
  fEl.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed", active.has(c.dataset.k)));
  renderPhases();
});
function renderPhases(){
  document.getElementById("phases").innerHTML = PHASES.filter(p=>p.ev.length).map((p,i)=>{
    const evs = p.ev.filter(e=>active.has(e[1]));
    const list = evs.length ? evs.map(e=>{
      const c=CATS[e[1]];
      return `<li class="ev${e[3]?" key":""}"><div class="d">${e[0]}</div><div><div class="tag" style="--c:var(${c.c})"><i></i>${c.n}</div><p class="t">${e[2]}</p></div></li>`;
    }).join("") : `<li class="empty">Sin actividades de este tipo en la etapa.</li>`;
    return `<article class="phase" id="${p.id}" style="--pc:var(${p.pause?"--ink-3":p.c})">
      <div class="phase-h"><div class="sw"></div><div class="no">ETAPA ${i+1}</div><h3>${p.n}</h3>
      <div class="rng">${MESL[+p.s.slice(5)-1]} ${p.s.slice(0,4)} – ${MESL[+p.e.slice(5)-1]} ${p.e.slice(0,4)}</div><p>${p.p}</p></div>
      <div><ul class="evs">${list}</ul>${p.note&&active.size===Object.keys(CATS).length?`<div class="note">${p.note}</div>`:""}</div>
    </article>`;
  }).join("");
}
renderPhases();
