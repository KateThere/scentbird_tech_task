import { expect, Locator, Page } from "@playwright/test";
const subscriptionPageUrl = "https://www.scentbird.com/gift?months=6";

export class SubscriptionPage {
  readonly page: Page;
  readonly cologneOption: Locator;
  readonly perfumeOption: Locator;
  readonly recipientName: Locator;
  readonly recipientEmail: Locator;
  readonly recipientMessage: Locator;
  readonly senderName: Locator;
  readonly sendNowOption: Locator;
  readonly sendLaterOption: Locator;
  readonly goToCartBtn: Locator;
  readonly cart: Locator;
  readonly checkoutBtn: Locator;
  readonly recipientNameError: Locator;
  readonly recipientEmailError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cologneOption = page.getByTestId("recipientGenderOptionMale");
    this.perfumeOption = page.getByTestId("recipientGenderOptionFemale");
    this.recipientName = page.getByTestId("recipientName");
    this.recipientEmail = page.getByTestId("recipientEmail");
    this.recipientMessage = page.getByTestId("recipientMessage");
    this.senderName = page.getByTestId("senderName");
    this.sendNowOption = page.getByTestId("sendDateOptionNow");
    this.sendLaterOption = page.getByTestId("sendDateOptionLater");
    this.goToCartBtn = page.getByTestId("checkoutNowButton");
    this.cart = page.getByTestId("cartModal");
    this.checkoutBtn = page.getByTestId("modalPrimaryButton");
    this.recipientNameError = page.getByTestId("recipientNameError");
    this.recipientEmailError = page.getByTestId("recipientEmailError");
  }

  /**
   * go to subscription page
   */
  async navigate() {
    await this.page.goto(subscriptionPageUrl);
    await expect(this.page).toHaveTitle(
      /The Perfect Gift: Perfume Subscription Starting at/
    );
  }

  /**
   * choose "Сologne" option
   */
  async chooseCologneOption() {
    await this.cologneOption.check();
    expect(await this.cologneOption.isChecked()).toBeTruthy();
  }

  /**
   * choose "Perfume" option
   */
  async choosePerfumeOption() {
    await this.perfumeOption.check();
    expect(await this.perfumeOption.isChecked()).toBeTruthy();
  }

  /**
   * fill filed "Recipient's name"
   * @param {string} name - recipient's name
   */
  async fillRecipientNameField(name: string) {
    await this.recipientName.fill(name);
  }

  /**
   * fill filed "Recipient's email"
   * @param {string} email - recipient's email
   */
  async fillRecipientEmailField(email: string) {
    await this.recipientEmail.fill(email);
  }

  /**
   * fill filed "Write a personal message"
   * @param {string} message - recipient's email
   */
  async fillMessageField(message: string) {
    await this.recipientMessage.fill(message);
  }

  /**
   * fill filed "Who is it from?"
   * @param {string} name - sender's name
   */
  async fillSenderNameField(name: string) {
    await this.senderName.fill(name);
  }

  /**
   * choose "Send right now" option
   */
  async chooseSendNowOption() {
    await this.sendNowOption.check();
    expect(await this.sendNowOption.isChecked()).toBeTruthy();
  }

  /**
   * choose "Choose a later date to send" option
   */
  async chooseSendLaterOption() {
    await this.sendLaterOption.check();
    expect(await this.sendLaterOption.isChecked()).toBeTruthy();
  }

  /**
   * click "Pay for your order" button
   */
  async goToCart() {
    await this.goToCartBtn.click();
  }

  /**
   * check cart modal window is open
   */
  async checkCartIsOpen() {
    await expect(this.cart).toBeVisible();
    await expect(this.checkoutBtn).toBeEnabled();
  }

  /**
   * click "Checkout" button in cart
   */
  async goToCheckout() {
    await this.checkoutBtn.click();
  }

  /**
   * check redirect to register page
   */
  async checkRedirectToRegisterPage() {
    await expect(this.page).toHaveURL(/.*register/);
  }

  /**
   * check error field "Recipient's name" is required
   */
  async checkRecipientNameError() {
    await expect(this.recipientNameError).toBeVisible();
  }
  /**
   * check error field "Recipient's email" is required
   */
  async checkRecipientEmailError() {
    await expect(this.recipientEmailError).toBeVisible();
  }
}
