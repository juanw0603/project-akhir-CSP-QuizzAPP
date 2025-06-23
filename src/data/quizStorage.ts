"use client"

export interface StoredQuizResult {
  score: number; // Jumlah jawaban benar
  percentage: number; // Persentase skor
  totalQuestions: number; // Jumlah total soal
  timestamp: number; // Waktu penyimpanan (Date.now())
}

const STORAGE_KEY = "quizResultsHistory";

export const saveQuizResultToHistory = (result: Omit<StoredQuizResult, 'timestamp'>): void => {
  if (typeof window !== "undefined") {
    const newResultWithTimestamp: StoredQuizResult = {
      ...result,
      timestamp: Date.now(),
    };
    const existingResults = getQuizResultsHistory();
    existingResults.push(newResultWithTimestamp);
    // Opsional: Batasi jumlah riwayat yang disimpan
    // const MAX_HISTORY_LENGTH = 20;
    // if (existingResults.length > MAX_HISTORY_LENGTH) {
    //   existingResults.sort((a, b) => b.timestamp - a.timestamp); // Simpan yang terbaru
    //   existingResults.splice(MAX_HISTORY_LENGTH);
    // }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingResults));
  }
};

export const getQuizResultsHistory = (): StoredQuizResult[] => {
  if (typeof window !== "undefined") {
    const storedResults = localStorage.getItem(STORAGE_KEY);
    return storedResults ? JSON.parse(storedResults) : [];
  }
  return [];
};

export const getBestQuizScore = (): StoredQuizResult | null => {
  const results = getQuizResultsHistory();
  if (results.length === 0) return null;
  return results.reduce((best, current) => (current.percentage > best.percentage ? current : best), results[0]);
};