export interface QuizQuestion {
    id: number
    question: string
    options: string[]
    correctAnswer: number
}

export const quizData: QuizQuestion[] = [
    {
        id: 1,
        question: "Apa ibukota Indonesia?",
        options: ["Jakarta", "Surabaya", "Bandung", "Medan"],
        correctAnswer: 0
    },
    {
        id: 2,
        question: "Kapan Indonesia merdeka?",
        options: ["17 Agustus 1945", "27 Desember 1949", "1 Juni 1945", "28 Oktober 1928"],
        correctAnswer: 0
    },
    {
        id: 3,
        question: "Apa lambang negara Indonesia?",
        options: ["Garuda Pancasila", "Bhinneka Tunggal Ika", "Pancasila", "UUD 1945"],
        correctAnswer: 0
    },
    {
        id: 4,
        question: "Berapa jumlah provinsi di Indonesia saat ini?",
        options: ["34", "33", "35", "32"],
        correctAnswer: 0
    },
    {
        id: 5,
        question: "Apa bahasa nasional Indonesia?",
        options: ["Bahasa Indonesia", "Bahasa Jawa", "Bahasa Melayu", "Bahasa Sunda"],
        correctAnswer: 0
    },
    {
        id: 6,
        question: "Siapa pencipta lagu Indonesia Raya?",
        options: ["W.R. Supratman", "Ibu Sud", "C. Simanjuntak", "H. Mutahar"],
        correctAnswer: 0
    },
    {
        id: 7,
        question: "Apa nama gunung tertinggi di Indonesia?",
        options: ["Puncak Jaya", "Kerinci", "Semeru", "Rinjani"],
        correctAnswer: 0
    },
    {
        id: 8,
        question: "Apa nama danau terbesar di Indonesia?",
        options: ["Danau Toba", "Danau Singkarak", "Danau Poso", "Danau Matano"],
        correctAnswer: 0
    },
    {
        id: 9,
        question: "Apa nama pulau terbesar di Indonesia?",
        options: ["Papua", "Kalimantan", "Sumatera", "Sulawesi"],
        correctAnswer: 0
    },
    {
        id: 10,
        question: "Apa nama mata uang Indonesia?",
        options: ["Rupiah", "Ringgit", "Baht", "Peso"],
        correctAnswer: 0
    },
    {
        id: 11,
        question: "Apa nama presiden pertama Indonesia?",
        options: ["Soekarno", "Soeharto", "B.J. Habibie", "Abdurrahman Wahid"],
        correctAnswer: 0
    },
    {
        id: 12,
        question: "Apa nama satelit komunikasi pertama Indonesia?",
        options: ["Palapa A1", "Telkom-1", "Lapan-A1", "Nusantara-1"],
        correctAnswer: 0
    },
    {
        id: 13,
        question: "Apa nama candi terbesar di Indonesia?",
        options: ["Borobudur", "Prambanan", "Mendut", "Sewu"],
        correctAnswer: 0
    },
    {
        id: 14,
        question: "Apa nama suku terbesar di Indonesia?",
        options: ["Jawa", "Sunda", "Batak", "Bugis"],
        correctAnswer: 0
    },
    {
        id: 15,
        question: "Apa nama bandara internasional terbesar di Indonesia?",
        options: ["Soekarno-Hatta", "Ngurah Rai", "Juanda", "Kualanamu"],
        correctAnswer: 0
    },
    {
        id: 16,
        question: "Apa semboyan negara Indonesia?",
        options: ["Bhinneka Tunggal Ika", "Garuda Pancasila", "Tut Wuri Handayani", "Merdeka atau Mati"],
        correctAnswer: 0
    },
    {
        id: 17,
        question: "Di pulau manakah letak Candi Borobudur?",
        options: ["Jawa", "Sumatera", "Bali", "Lombok"],
        correctAnswer: 0
    },
    {
        id: 18,
        question: "Siapakah wakil presiden pertama Indonesia?",
        options: ["Mohammad Hatta", "Adam Malik", "Sri Sultan Hamengkubuwono IX", "Try Sutrisno"],
        correctAnswer: 0
    },
    {
        id: 19,
        question: "Apa warna bendera Indonesia?",
        options: ["Merah dan Putih", "Biru dan Putih", "Merah dan Kuning", "Hijau dan Kuning"],
        correctAnswer: 0
    },
    {
        id: 20,
        question: "Tahun berapa Konferensi Asia-Afrika pertama kali diadakan di Bandung?",
        options: ["1955", "1945", "1965", "1950"],
        correctAnswer: 0
    },    {
        id: 21, // Ganti dengan ID unik berikutnya (misalnya, jika soal terakhir ID 20, ini jadi 21)
        question: "Tulis pertanyaan Anda di sini?",
        options: [
            "Pilihan Jawaban A",
            "Pilihan Jawaban B",
            "Pilihan Jawaban C",
            "Pilihan Jawaban D"
        ],
        correctAnswer: 0 // Ganti dengan indeks jawaban yang benar (0 untuk Pilihan A, 1 untuk Pilihan B, dst.)
    },

] 