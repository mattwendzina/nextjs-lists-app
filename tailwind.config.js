module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                teal: {
                    50: '#F0FDFA',
                    100: '#CCFBF1',
                    200: '#99F6E4',
                    300: '#5EEAD4',
                    400: '#2DD4BF',
                    500: '#14B8A6',
                    600: '#0D9488',
                    700: '#0F766E',
                    800: '#115E59',
                    900: '#134E4A',
                },
                'yellow-red': {
                    50: '#FFEBC3',
                    100: '#FFE7B7',
                    200: '#FFE3AB',
                    300: '#FFDF9F',
                    400: '#FFDB93',
                    500: '#FFD787',
                    600: '#FFD37B',
                    700: '#FFCF6F',
                    800: '#FFCB63',
                    900: '#FFC857',
                },
                gainsboro: {
                    50: '#F1F2F5',
                    100: '#EFF0F3',
                    200: '#ECEDF1',
                    300: '#E9EBEF',
                    400: '#E6E8ED',
                    500: '#E4E6EB',
                    600: '#E1E3E9',
                    700: '#DEE1E7',
                    800: '#DCDEE5',
                    900: '#D8DBE2',
                },
                charcoal: {
                    50: '#557C93',
                    100: '#50768C',
                    200: '#4B7085',
                    300: '#456A7E',
                    400: '#406477',
                    500: '#3B5E6F',
                    600: '#365868',
                    700: '#305261',
                    800: '#2B4C5A',
                    900: '#264653',
                },
            },
            fontFamily: {
                lexend: ['Lexend', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
