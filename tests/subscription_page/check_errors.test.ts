import { test } from "@playwright/test";
import { SubscriptionPage } from "../../modules/subscriptionPage";
let subscriptionPage: SubscriptionPage;

test.beforeEach(async ({ page }) => {
  subscriptionPage = new SubscriptionPage(page);
  await subscriptionPage.navigate();
});

test('Check errors in required fields "Recipients name" and "Recipients email"', async () => {
  await subscriptionPage.goToCart();
  await subscriptionPage.checkRecipientNameError();
  await subscriptionPage.checkRecipientEmailError();
});

test('Check error in field "Recipients email" with invalid email', async () => {
  await subscriptionPage.goToCart();
  await subscriptionPage.fillRecipientNameField("Test client");
  await subscriptionPage.fillRecipientEmailField("invalidemail");
  await subscriptionPage.checkRecipientEmailError();
});
