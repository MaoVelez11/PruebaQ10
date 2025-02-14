// playwright.config.js
const config = {
  testDir: './tests', // Directorio donde están las pruebas
  timeout: 50000, // Tiempo de espera para cada prueba
  use: {
    headless: false, // Modo no headless para ver el navegador
    channel: 'chrome', // Usar Google Chrome
    viewport: { width: 1280, height: 720 }, // Tamaño de la ventana
    screenshot: 'only-on-failure', // Captura de pantalla solo en fallos
    video: 'retain-on-failure', // Grabar video solo en fallos
  },
};

module.exports = config;