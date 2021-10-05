const config = {
    mode: "jit",
    purge: {
        content: ["./src/**/*.{html,js,svelte,ts}",],
        safelist: [
            "bg-emsx-blue",
        ],
    },
    theme: {
        extend: {
            colors: {
                'light-grey': '#EDEDED;',
                'dark-grey': '#C4C4C4;',
                "emsx-blue": "#383C50",
            },
            padding: {
                '10px': '10px',
                '30px': '30px',
            }
        },
    },
    plugins: [],
};

module.exports = config;
