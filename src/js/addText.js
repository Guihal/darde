import { elementReady } from "./utils/elementReady";

export async function addText() {
  const delivery = await elementReady(".t706");

  const observer = new MutationObserver(callback);
  observer.observe(delivery, { childList: true, subtree: true });

  callback();

  function callback() {
    const block = delivery.querySelector(
      'input[value="Самовывоз"]:not(.check)'
    );

    if (!block) return;

    block.classList.add("check");

    block.parentNode.append(
      Object.assign(document.createElement("span"), {
        className: "delivery-minimum-price",
        innerHTML: "0 р.",
      })
    );
  }
}

addText();
