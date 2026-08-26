export function parseQrData(qrString: string) {
  try {
    return JSON.parse(qrString);
  } catch {
    return { raw: qrString };
  }
}
