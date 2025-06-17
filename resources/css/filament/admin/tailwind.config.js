// import preset from '../../../../vendor/filament/filament/tailwind.config.preset' // Dihapus sementara

export default {
    // presets: [preset], // Dihapus sementara
    content: [
        './app/Filament/**/*.php',
        './resources/views/filament/**/*.blade.php',
        './vendor/filament/**/*.blade.php',
    ],
    theme: {
        extend: {
            colors: {
                'custom-purple': {
                    '50': '#f5f3ff',
                    '100': '#ede9fe',
                    '200': '#ddd6fe',
                    '300': '#c4b5fd',
                    '400': '#a78bfa',
                    '500': '#8b5cf6', // Warna ungu utama Anda
                    '600': '#7c3aed',
                    '700': '#6d28d9',
                    '800': '#5b21b6',
                    '900': '#4c1d95',
                    '950': '#2e1065',
                },
                'custom-white': '#ffffff',
                'custom-light-gray': '#f8fafc', // Contoh untuk latar belakang terang
                'custom-dark-text': '#1f2937', // Contoh untuk teks gelap di atas latar putih
                'custom-light-text': '#e5e7eb', // Contoh untuk teks terang di atas latar ungu
            },
        },
    },
}
