const config = {
    mode: "jit",
    purge: {
        content: ["./src/**/*.{html,js,svelte,ts}",],
        options: {
            safelist:
                [...Array(12).keys()].map((_, i) => `grid-rows-${i + 1}`).concat(
                    [...Array(12).keys()].map((_, i) => `grid-cols-${i + 1}`).contat(
                        ["bg-dark-grey",
                            "py-15px",
                            "py-30px",
                            "12px",
                            "15px",
                        ]
                    )
                ),
        },
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
