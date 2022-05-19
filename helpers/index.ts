import { notify } from "@kyvg/vue3-notification";

import mitt from "mitt";
export const emitter = mitt();

export function fallbackCopyTextToClipboard(text: string) {
  CopyToClipboard(text);
  if (text.length > 20) {
    text = text.substring(0, 20) + "...";
  }
  notify({
    text: "Copied to clipboard: " + text,
    type: "success",
  });
}

export function shortenAddress(address: string) {
  return typeof address == "string"
    ? address.slice(0, 5) + "..." + address.slice(-3)
    : address;
}
export const CopyToClipboard = function (text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
};
