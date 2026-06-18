/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: string; // unique ID
  title: string;
  name: string;
  quote: string;
  rating: number;
  date: string;
  source: string;
}

export interface TarotCard {
  id: string;
  name: string;
  image: string;
  meaning: string;
  aspect: 'Amor' | 'Destino' | 'Energía';
  role: 'Pasado' | 'Presente' | 'Futuro';
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
    feedback: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price?: string;
  tag?: string;
  details: string[];
  image: string;
}

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    title: "El Reencuentro de Elena",
    name: "Elena G.",
    quote: "Recuperé la paz que creía perdida para siempre. Mi hogar vuelve a brillar tras realizar la limpieza profunda de aura. Mi esposo y yo volvimos a encontrarnos con amor.",
    rating: 5,
    date: "Hace 3 días",
    source: "Consulta Presencial"
  },
  {
    id: "t2",
    title: "La Claridad de Marcos",
    name: "Marcos V.",
    quote: "Los bloqueos desaparecieron tras la primera sesión de armonización de chakras. Sentía una pesadez inexplicable y por fin siento mi mente despejada. Una guía espiritual auténtica.",
    rating: 5,
    date: "Hace 1 semana",
    source: "Aero-Sanación"
  },
  {
    id: "t3",
    title: "Sanación de Sofía",
    name: "Sofía M.",
    quote: "Sentí el equilibrio energético de inmediato. Mi relación floreció de nuevo cuando realizamos el endulzamiento sagrado. Recomiendo de corazón su sabiduría.",
    rating: 5,
    date: "Hace 2 semanas",
    source: "Trabajo Sagrado"
  }
];

export const SERVICES: Service[] = [
  {
    id: "s1",
    title: "Sanación energética profunda",
    subtitle: "Limpieza de aura y restauración de tu campo vibratorio para eliminar bloqueos estancados.",
    description: "Ideal para cuando sientes que todo se traba, pesadez en el cuerpo o mala racha recurrente.",
    details: [
      "Eliminación de miasmas y energías de personas ajenas",
      "Restauración de fisuras en el campo bioenergético",
      "Protección sellada para evitar nuevas cargas negativas",
      "Baño espiritual de florecimiento con hierbas sagradas"
    ],
    image: "/src/assets/images/sanacion_profunda_1781750723622.jpg"
  },
  {
    id: "s2",
    title: "Armonización de chakras",
    subtitle: "Alineación de tus centros de energía para recuperar la vitalidad y el equilibrio emocional.",
    description: "Sintoniza tu resonancia natural para abrir caminos en el amor, salud y abundancia.",
    details: [
      "Activación de los 7 centros energéticos principales",
      "Canalización de luz con cuarzos maestros consagrados",
      "Péndulo de diagnóstico preciso y limpieza vibracional",
      "Consejo rúnico para mantener tus canales despejados"
    ],
    image: "/src/assets/images/armonizacion_chakras_1781750741350.jpg"
  },
  {
    id: "s3",
    title: "Eliminación de vicios o adicciones",
    subtitle: "Liberación y sanación profunda para romper patrones destructivos y recuperar tu camino vital.",
    description: "Sana el cuerpo, fortalece la fuerza de voluntad y repele las influencias negativas de adicciones y alcoholismo.",
    details: [
      "Ruptura de lazos energéticos obsesivos con sustancias o vicios",
      "Sanación y protección de tu campo áurico contra dependencias destructivas",
      "Fortalecimiento de la fuerza de voluntad e inmunidad espiritual",
      "Ritual sagrado de purificación con hierbas sagradas sobre recipientes consagrados"
    ],
    image: "/src/assets/images/vicios_adicciones_1781752121108.jpg"
  },
  {
    id: "s4",
    title: "Amarres y Retornos de Pareja",
    subtitle: "Trabajos sagrados para fortalecer la unión y el compromiso con el ser amado.",
    description: "Reaviva la pasión perdida, aleja malas influencias y promueve la reconciliación real.",
    details: [
      "Endulzamientos con rosas y cera virgen consagrada",
      "Retorno de almas separadas por distanciamientos o terceras personas",
      "Protección conyugal para blindar el amor",
      "Resultados discretos, respetuosos y altamente sanadores"
    ],
    image: "/src/assets/images/amarres_amor_1781750781490.jpg",
    tag: "Trabajos Sagrados"
  },
  {
    id: "s5",
    title: "Consultas general",
    subtitle: "Una guía clara para entender tu situación actual y los pasos a seguir con el tarot.",
    description: "Descubre lo que el destino tiene para ti y toma decisiones informadas con paz mental.",
    tag: "OFERTA",
    details: [
      "Lectura extendida de Tarot (Pasado, Presente y Futuro)",
      "Análisis de compatibilidad amorosa",
      "Lectura de velas para ver bloqueos",
      "Recetario espiritual personalizado al finalizar"
    ],
    image: "/src/assets/images/consultas_tarot_1781750797128.jpg"
  }
];

export const TAROT_DECK: TarotCard[] = [
  {
    id: "c1",
    name: "El Loco (La Búsqueda)",
    image: "🃏",
    meaning: "Simboliza nuevos comienzos, confianza ciega y saltar hacia lo desconocido. Ha llegado el momento de dejar ir los miedos obsoletos y dar ese paso espiritual.",
    aspect: "Destino",
    role: "Pasado"
  },
  {
    id: "c2",
    name: "Los Enamorados (La Unión)",
    image: "❤️",
    meaning: "Representa el amor profundo, el reencuentro de almas gemelas y las elecciones del corazón. Alguien en tu entorno anhela una reconexión contigo.",
    aspect: "Amor",
    role: "Presente"
  },
  {
    id: "c3",
    name: "La Estrella (La Esperanza)",
    image: "🌟",
    meaning: "Trae luz tras la tormenta. Es de las mejores cartas para indicar sanación profunda, restauración espiritual y bendición celestial sobre tus metas.",
    aspect: "Energía",
    role: "Futuro"
  },
  {
    id: "c4",
    name: "El Mago (La Creación)",
    image: "🪄",
    meaning: "Posees todos los recursos y herramientas para transformar tu destino. Es momento de actuar y canalizar tu fuerza de manifestación interna.",
    aspect: "Energía",
    role: "Presente"
  },
  {
    id: "c5",
    name: "El Ermitaño (La Sabiduría)",
    image: "🕯️",
    meaning: "Te indica que es momento de introspección profunda. El cansancio no es físico, tu alma necesita silencio, recogimiento y un guía para salir de la oscuridad.",
    aspect: "Destino",
    role: "Pasado"
  },
  {
    id: "c6",
    name: "El Mundo (La Totalidad)",
    image: "🌍",
    meaning: "La culminación exitosa de un ciclo difícil. Se avecina una oleada de alivio absoluto donde todo lo estancado finalmente fluye hacia tu favor.",
    aspect: "Destino",
    role: "Futuro"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "¿Cómo describirías tu nivel de cansancio físico y mental últimamente?",
    options: [
      { text: "Ligero, se quita con descansar el fin de semana.", score: 1, feedback: "Tu energía está estable, solo requieres revitalización regular." },
      { text: "Muy pesado, amanezco con cansancio y un 'nudo en el pecho'.", score: 4, feedback: "Un síntoma clásico de desequilibrio áurico que bloquea el flujo vital." },
      { text: "Siento que la mala suerte de otros se me ha pegado encima.", score: 3, feedback: "Absorción energética pasiva de ambientes o pensamientos externos." }
    ]
  },
  {
    id: 2,
    text: "En el amor y tus relaciones personales, ¿qué situación te genera más angustia?",
    options: [
      { text: "Ruptura, alejamiento o frialdad inexplicable con mi ser amado.", score: 4, feedback: "Suele indicar la presencia de bloqueos kármicos o terceras personas." },
      { text: "No logro concretar una pareja formal, se van rápido si se acercan.", score: 3, feedback: "Fisura en el chakra raíz que impide consolidar los lazos terrenales." },
      { text: "Todo está en paz, solo busco consolidar nuestra conexión espiritual.", score: 1, feedback: "Excelente momento para coronar con un endulzamiento de abundancia." }
    ]
  },
  {
    id: 3,
    text: "¿Has experimentado bloqueos financieros o que el dinero se esfuma?",
    options: [
      { text: "Sí, gano bien pero tengo gastos imprevistos y pérdidas constantes.", score: 4, feedback: "Bloqueo severo en el chakra del plexo solar por envidias o mala vibra." },
      { text: "Estable, pero siento que podría recibir mucho más.", score: 2, feedback: "Falta flujo de prosperidad por indecisiones sentimentales." },
      { text: "Inestable, pero considero que es algo normal de la economía actual.", score: 1, feedback: "Mantienes una actitud sensata, requiere estimulación aurífera básica." }
    ]
  }
];

export const CANDLE_OPTIONS = [
  { id: "love", name: "Llama del Amor", color: "#e11d48", glow: "#fda4af", meaning: "Fortalece uniones, reconciliación y atracción mutua." },
  { id: "protection", name: "Manto Protector", color: "#2563eb", glow: "#93c5fd", meaning: "Aleja malas influencias, envidias y bloqueos pesados." },
  { id: "wealth", name: "Camino de Oro", color: "#ca8a04", glow: "#fde047", meaning: "Abre puertas a la prosperidad, ascensos y suerte." },
  { id: "health", name: "Luz de Salud", color: "#16a34a", glow: "#86efac", meaning: "Sana el cansancio corporal, dolores áuricos y da vigor." }
];
