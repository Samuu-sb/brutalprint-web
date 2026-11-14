(function (BP) {
  BP.$('#cForm').addEventListener('submit', e => {
    e.preventDefault();
    window.open(BP.wa(`Hola Brutal Print, soy ${BP.$('#cNm').value.trim()}.\n${BP.$('#cMsg').value.trim()}`), '_blank', 'noopener');
  });
})(window.BP);
