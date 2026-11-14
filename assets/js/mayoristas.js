(function (BP) {
  BP.$('#mForm').addEventListener('submit', e => {
    e.preventDefault();
    const nm = BP.$('#mNm').value.trim(); if (!nm) return;
    window.open(BP.wa(`Hola Brutal Print, quiero abrir una cuenta de mayorista.\n• Nombre/empresa: ${nm}\n• Tipo de negocio: ${BP.$('#mTy').value}\n• Volumen mensual: ${BP.$('#mVol').value}`), '_blank', 'noopener');
    BP.track('lead', { source: 'mayoristas' });
  });
})(window.BP);
