class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems      = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButton   = (productName) =>
      page.locator(`[data-test="remove-${productName}"]`);
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async removeProduct(productName) {
    await this.removeButton(productName).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };