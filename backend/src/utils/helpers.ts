export const generateReceiptNumber = (): string => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `RCP-${new Date().getFullYear()}-${randomNum}`;
};

export const generateVerificationCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'UT-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const formatCurrency = (amount: number, currency: string = 'PKR'): string => {
  return `${currency} ${amount.toLocaleString()}`;
};
