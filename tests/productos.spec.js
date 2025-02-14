const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');

test.describe('CRUD de Productos', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.navigate(); // Navega a la página de inicio
    await productsPage.startFreeTrial(
      'Mauricio', // Nombre
      'Velez', // Apellido
      'maovelez11@gmail.com', // Correo
      '1234567890', // Teléfono
      'Candidato a Coordinar QA - Mauricio Velez' // Institución
    );
    await productsPage.goToTreasury();
    await productsPage.goToStructuring();
    await productsPage.goToProducts();
  });

  test('Crear, editar y eliminar un producto', async () => {
    const productCode = 'PROD001';
    const initialName = 'Producto de Prueba';
    const updatedName = 'Producto Editado';
    const netValue = '100';

    // 1. Crear un producto
    await productsPage.openCreateProductModal();
    await productsPage.fillProductForm(productCode, initialName, netValue);
    await productsPage.saveProduct();
    await productsPage.validateProductAdded(productCode);

     // Validar que el producto se haya agregado
     const productRow = await productsPage.validateProductAdded(productCode);
     await expect(productRow).toBeVisible();
     
    // 2. Editar el producto
    await productsPage.editProduct(productCode);
    await productsPage.updateProductName(updatedName);
    await productsPage.saveProduct();
    

    
    // Validar que el producto se haya actualizado
    const updatedProductRow = await productsPage.validateProductAdded(productCode);
    await expect(updatedProductRow).toContainText(updatedName);

    // 3. Eliminar el producto
    await productsPage.deleteProduct(productCode);
    await productsPage.validateProductDeleted(productCode);
  });
});