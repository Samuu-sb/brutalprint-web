/* ============================================================
   BRUTAL PRINT PANAMÁ — Configuración central
   Todo lo marcado como PLACEHOLDER debe reemplazarse con datos reales
   del cliente antes de publicar.
   ============================================================ */
(function (BP) {
  BP.config = {
    brand: 'Brutal Print Panamá',
    // PLACEHOLDER: número real con código de país, sin + ni espacios
    whatsapp: '50765325139',
    whatsappDisplay: '+507 6532-5139',
    instagram: 'brutalprintpanama',
    email: 'brutalprintpanama@gmail.com',
    address: 'Ciudad de Colón, Panamá', // taller en Colón (falta dirección exacta)
    hours: 'Lun–Vie 8:00 a. m. – 5:00 p. m. · Sáb 9:00 a. m. – 1:00 p. m. (hora de Panamá)', // PLACEHOLDER: confirmar horario real
    currency: '$',
    depositPct: 50,
    leadTimes: {
      dtf: '3–4 días hábiles',
      serigrafia: 'Depende de la cantidad',
      sublimacion: '1–2 días hábiles',
      impresion3d: 'Depende del modelo'
    },
    shipping: {
      pickup: { label: 'Retiro en taller', price: 0 },
      metro: { label: 'Entrega en estaciones del Metro (Panamá, sábados)', price: 0 },
      city: { label: 'Envío a Ciudad de Panamá', price: 5 },
      interior: { label: 'Envío al resto del país', price: 5 } // PLACEHOLDER: tarifa provisional, por confirmar
    },
    freeShippingOver: 40, // envío gratis a cualquier parte en compras de MÁS de este monto
    payments: {
      yappy: '@brutalprintpanama', // PLACEHOLDER
      bank: { name: 'Banco General', type: 'Cuenta corriente', number: '0000000000', holder: 'Brutal Print Panamá' } // PLACEHOLDER
    },
    // Analítica: dejar vacío para no cargar nada. Agregar IDs reales al publicar.
    analytics: { metaPixelId: '', ga4Id: '' },
    siteUrl: 'https://brutalprint.pa' // PLACEHOLDER
  };

  BP.wa = function (text) {
    return 'https://wa.me/' + BP.config.whatsapp + '?text=' + encodeURIComponent(text || 'Hola Brutal Print, quiero información.');
  };
})(window.BP = window.BP || {});
