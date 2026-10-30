const downloadButton = document.querySelector('.js-recruit-download');

if (downloadButton) {
  downloadButton.addEventListener('click', () => {
    window.print();
  });
}
