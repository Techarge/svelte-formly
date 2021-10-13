module.exports = {
    mode: 'jit',
    purge: {
        content: ["./src/**/*.{html,js,svelte,ts}",],
        enabled: true,
        options: {
            safelist: {
                standard: [/^grid-col/, /^grid-row/, "bg-dark-grey", "bg-light-grey"]
            }
        }
    },
    darkMode: false,
    theme: {
        extend: {
            colors: {
                'light-grey': '#EDEDED',
                'dark-grey': '#C4C4C4'
            },
            padding: {
                '10px': '10px',
                '30px': '30px',
            }
        },
    },
    plugins: [],
};
