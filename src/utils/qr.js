import { downloadQRCode, generateQRCode } from "shadow-qr-generator";

export function normalizeQrValue(value) {
  if (!value || typeof value !== "string" || !value.trim()) {
    throw new Error("Missing QR value");
  }

  const trimmed = value.trim();

  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) {
    return trimmed;
  }

  if (typeof window === "undefined") {
    return trimmed;
  }

  return new URL(trimmed, window.location.origin).toString();
}

export async function generatePortfolioQrDataUrl(value) {
  const target = normalizeQrValue(value);

  return generateQRCode(target, {
    width: 320,
    darkColor: "#F5F5F5",
    lightColor: "#0B0B0B",
  });
}

export function downloadPortfolioQr(dataUrl, filename = "portfolio-qr.png") {
  if (!dataUrl) {
    throw new Error("Missing QR image");
  }

  downloadQRCode(dataUrl, filename);
}
