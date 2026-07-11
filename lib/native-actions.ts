export async function copyTextToClipboard(text: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    return false;
  }

  await navigator.clipboard.writeText(text);
  return true;
}

export async function shareReceipt(details: {
  title: string;
  text: string;
  url?: string;
}) {
  if (typeof navigator !== "undefined" && "share" in navigator && navigator.share) {
    await navigator.share(details);
    return "shared";
  }

  await copyTextToClipboard(details.text);
  return "copied";
}
