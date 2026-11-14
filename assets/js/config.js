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
    email: 'hola@brutalprint.pa', // PLACEHOLDER
    address: 'Ciudad de Panamá, Panamá', // PLACEHOLDER: dirección del taller
    hours: 'Lun–Vie 8:00–17:00 · Sáb 9:00–13:00', // PLACEHOLDER
    currency: '$',
    depositPct: 50,
    leadTimes: {
      dtf: '2–3 días hábiles',
      serigrafia: '5–7 días hábiles',
      sublimacion: '3–5 días hábiles'
    },
    shipping: {
      pickup: { label: 'Retiro en taller', price: 0 },
      city: { label: 'Entrega en Ciudad de Panamá / San Miguelito', price: 4 }, // PLACEHOLDER
      interior: { label: 'Envío al interior (Panamá Oeste, Colón, resto del país)', price: 8 } // PLACEHOLDER
    },
    freeShippingOver: 100, // PLACEHOLDER
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
