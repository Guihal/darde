import { elementReady } from "./utils/elementReady";

export async function hideDeliveryMethod(paymentMethod, deliveryMethod) {
  const cart = await elementReady(".t706__orderform");
  const paymentMethodInput = await elementReady(
    `.t-radio_payment[value="${paymentMethod}"]`
  );

  cart.addEventListener("click", changeStateMethod);
  const observer = new MutationObserver(changeStateMethod);

  function changeStateMethod() {
    const deliveryMethodInput = cart.querySelector(
      `.t-radio_delivery[value="${deliveryMethod}"]`
    );

    if (!deliveryMethodInput) return;

    if (deliveryMethodInput.checked) {
      hidePaymentMethod();
    } else {
      showPaymentMethod();
    }
  }

  function hidePaymentMethod() {
    if (paymentMethodInput.parentNode.style.display === "none") return;

    paymentMethodInput.parentNode.style.display = "none";

    clickIfChecked();
  }

  function showPaymentMethod() {
    if (paymentMethodInput.parentNode.style.display === "table") return;

    paymentMethodInput.parentNode.style.display = "table";
  }

  function clickIfChecked() {
    if (!paymentMethodInput.checked) return;

    const anotherMethod = cart.querySelector(
      `.t-radio_payment:not([value="${paymentMethod}"])`
    );

    if (!anotherMethod) return;

    anotherMethod.parentNode.click();
  }

  observer.observe(cart, {
    childList: true,
    subtree: true,
  });
}
