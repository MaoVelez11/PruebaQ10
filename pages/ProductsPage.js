class ProductsPage {
  constructor(page) {
    this.page = page;
    this.generatedCode = null; // Variable para almacenar el código generado

    // Selectores para la prueba gratuita
    this.demoButton = 'a[href="/PruebaGratuita/Colombia/Profesional"]'; // Botón de prueba gratuita
    this.editionDropdown = 'button[data-id="PruebaGratuita_edicion"]'; // Dropdown de edición
    this.colegioOption = 'a:has-text("Colegios")'; // Opción Colegios
    this.nombreInput = 'input[id="PruebaGratuita_nombres"]'; // Campo de nombre
    this.apellidoInput = 'input[id="PruebaGratuita_apellidos"]'; // Campo de apellido
    this.cargoDropdown = 'button[data-id="PruebaGratuita_Cargo"]'; // Dropdown de cargo
    this.coordinadorOption = 'a:has-text("Coordinador")'; // Opción Coordinador
    this.correoInput = 'input[id="PruebaGratuita_correo"]'; // Campo de correo
    this.telefonoInput = 'input[id="PruebaGratuita_telefono"]'; // Campo de teléfono
    this.ciudadDropdown = 'div.selectize-control'; // Dropdown de ciudad
    this.abejorralOption = 'span[title="Abejorral (Antioquia)"]'; // Opción Abejorral
    this.institucionInput = 'input[id="PruebaGratuita_institucion"]'; // Campo de institución
    this.terminosCheckbox = 'input[id="PruebaGratuita_acepto_condiciones"]'; // Checkbox de términos
    this.iniciarPruebaButton = 'button[id="submit-button"]'; // Botón de iniciar prueba

    // Selectores originales (resto de la funcionalidad)
    this.treasuryLink = 'a.dropdown-toggle:has-text("Tesorería")'; // Botón de Tesorería
    this.structuringLink = 'a:has-text("Estructuración") >> visible=true'; // Botón de Estructuración
    this.productsLink = 'a[href="/Productos"]'; // Botón de Productos
    this.createProductButton = 'a[href="/Producto/Crear"]'; // Botón para crear producto
    this.productCodeInput = 'input[id="Producto_prod_codigoP"]'; // Campo de código del producto
    this.productNameInput = 'input[id="Producto_prod_nombre"]'; // Campo de nombre del producto
    this.netValueInput = 'input[id="Producto_prod_valor_neto_currencytxt"]'; // Campo de valor neto
    this.saveButton = 'input[id="submit-btn"]'; // Botón para guardar
    this.productNameLink = 'a.opendetails[href^="/Producto/"][href*="/Detalle"]'; // Enlace del nombre del producto
    this.editButton = 'a.modal-form:has-text("Editar")'; // Botón para editar en la página de detalles
    this.deleteButton = 'a.btn-link.modal-form[href^="/Producto/"][href*="/Eliminar"]'; // Botón para eliminar
    this.confirmDeleteButton = 'button#submit-btn.btn-primary.q10button'; // Botón para confirmar eliminación
    this.productRow = (code) => `tr:has-text("${code}")`; // Fila del producto en la tabla
  }

  async navigate() {
    await this.page.goto('https://www.q10.com/PruebaGratuita/Colombia/Profesional'); // Navega a la página de inicio
  }

  async startFreeTrial(nombre, apellido, correo, telefono, institucion) {
    // Hacer clic en el botón de prueba gratuita
    

    // Seleccionar la edición "Colegios"
    await this.page.click(this.editionDropdown);
    await this.page.click(this.colegioOption);

    // Llenar el campo de nombre
    await this.page.fill(this.nombreInput, nombre);

    // Llenar el campo de apellido
    await this.page.fill(this.apellidoInput, apellido);

    // Seleccionar el cargo "Coordinador"
    await this.page.click(this.cargoDropdown); // Abrir el dropdown
    await this.page.waitForSelector(this.coordinadorOption, { state: 'visible' }); // Esperar a que la opción esté visible
    await this.page.click(this.coordinadorOption); // Seleccionar "Coordinador"

    // Llenar el campo de correo
    await this.page.fill(this.correoInput, correo);

    // Llenar el campo de teléfono
    await this.page.fill(this.telefonoInput, telefono);

    // Seleccionar la ciudad "Medellín"
    await this.page.click(this.ciudadDropdown);
    await this.page.click('span[title="Abejorral (Antioquia)"]');
    
    // Llenar el campo de institución
    await this.page.fill(this.institucionInput, institucion);

    // Aceptar los términos y condiciones
    await this.page.click(this.terminosCheckbox);

    // Hacer clic en el botón de iniciar prueba gratuita
    await this.page.click(this.iniciarPruebaButton);

    // Esperar a que la página redirija después de iniciar la prueba
    await this.page.waitForNavigation();
  }

  // Resto de los métodos (goToTreasury, goToStructuring, etc.) permanecen igual
  async goToTreasury() {
    await this.page.click(this.treasuryLink);
  }

  async goToStructuring() {
    const structuringMenu = this.page.locator(this.structuringLink);

    // Asegurar que el elemento sea visible antes de hacer hover
    await structuringMenu.waitFor({ state: 'visible' });
    await this.page.hover(this.structuringLink, { force: true });
  }

  async goToProducts() {
    await this.page.click(this.productsLink);
  }

  async openCreateProductModal() {
    await this.page.click(this.createProductButton);
  }

  async fillProductForm(code, name, netValue) {
    await this.page.fill(this.productCodeInput, code);
    await this.page.fill(this.productNameInput, name);
    await this.page.fill(this.netValueInput, netValue);
  }

  async saveProduct() {
    await this.page.click(this.saveButton);
  }

  async editProduct(code) {
    await this.page.click(this.productNameLink);
    await this.page.click(this.editButton);
  }

  async updateProductName(newName) {
    await this.page.fill(this.productNameInput, newName);
  }

  async deleteProduct(code) {
    await this.page.click(this.deleteButton);
    await this.page.click(this.confirmDeleteButton);
  }

  async validateProductAdded(code) {
    // Espera a que la fila del producto esté visible en la tabla
    await this.page.waitForSelector(this.productRow(code), { state: 'visible', timeout: 5000 });

    // Devuelve el elemento para que la validación se realice en el archivo de prueba
    return this.page.locator(this.productRow(code));
  }

  async validateProductDeleted(code) {
    // Aquí puedes implementar la lógica para validar que el producto fue eliminado
    // Por ejemplo, verificar que la fila del producto ya no esté visible
    await this.page.waitForSelector(this.productRow(code), { state: 'hidden', timeout: 5000 });
  }
}

module.exports = ProductsPage;