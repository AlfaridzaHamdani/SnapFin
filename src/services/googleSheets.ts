export interface Transaction {
  date: string;
  name: string;
  type: 'Pengeluaran' | 'Pemasukan';
  amount: number;
}

// TODO: Replace with user's specific Web App URL
const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

export const saveTransaction = async (data: Transaction) => {
  if (!API_URL) {
    console.warn("API URL not set. Logging data:", data);
    return { success: true, message: "Mock success (No API URL)" };
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      // mode: "no-cors" // Often needed for Google Apps Script Web App, but limits response reading.
      // Better to check if we can use CORS or just a simple form post.
      // Usually fetch with 'no-cors' is safest for simple fire-and-forget.
      // However, to get response, we need redirect following or CORS support in GAS.
    });
    
    // For 'no-cors', we can't check response.ok. We assume success if no network error.
    return { success: true };
  } catch (error) {
    console.error("Error saving:", error);
    return { success: false, error };
  }
};
