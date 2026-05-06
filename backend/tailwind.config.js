module.exports = {
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
                    '500': '#8b5cf6',
                    '600': '#7c3aed',
                    '700': '#6d28d9',
                    '800': '#5b21b6',
                    '900': '#4c1d95',
                    '950': '#2e1065',
                },
                'custom-white': '#ffffff',
                'custom-light-gray': '#f8fafc',
                'custom-dark-text': '#1f2937',
                'custom-light-text': '#e5e7eb',
            },
        },
    },
} 