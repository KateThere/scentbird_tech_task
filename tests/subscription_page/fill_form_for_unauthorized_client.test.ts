import { test } from '@playwright/test';
import { SubscriptionPage } from '../../modules/subscriptionPage';
let subscriptionPage: SubscriptionPage;

const clientName = "Test client name";
const clientEmail = "sometestemail@gmail.com";
const messageText = "Some message for recipient";
const senderName = "Test sender name";

test.beforeEach(async ({ page }) => {
    subscriptionPage = new SubscriptionPage(page);
    await subscriptionPage.navigate();
  });

test('Fill form with options: cologne, send right now, required fields only', async () => {
  await subscriptionPage.chooseCologneOption();
  await subscriptionPage.fillRecipientNameField(clientName);
  await subscriptionPage.fillRecipientEmailField(clientEmail);
  await subscriptionPage.chooseSendNowOption();
  await subscriptionPage.goToCart();
  await subscriptionPage.checkCartIsOpen();
  await subscriptionPage.goToCheckout();
  await subscriptionPage.checkRedirectToRegisterPage();
});

test('Fill form with options: perfume, send later, all fields', async () => {
  await subscriptionPage.choosePerfumeOption();
  await subscriptionPage.fillRecipientNameField(clientName);
  await subscriptionPage.fillRecipientEmailField(clientEmail);
  await subscriptionPage.fillMessageField(messageText);
  await subscriptionPage.fillSenderNameField(senderName);
  await subscriptionPage.chooseSendLaterOption();
  await subscriptionPage.goToCart();
  await subscriptionPage.checkCartIsOpen();
  await subscriptionPage.goToCheckout();
  await subscriptionPage.checkRedirectToRegisterPage();
});
