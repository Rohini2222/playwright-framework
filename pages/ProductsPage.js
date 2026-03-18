class ProductsPage {
  constructor(page) {
    this.page = page;

    this.pageTitle    = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.addToCartBtn = (productName) =>
      page.locator(`[data-test="add-to-cart-${productName}"]`);
    this.cartBadge    = page.locator('.shopping_cart_badge');
    this.cartIcon     = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productName) {
    await this.addToCartBtn(productName).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartCount() {
    return await this.cartBadge.textContent();
  }
}

module.exports = { ProductsPage };