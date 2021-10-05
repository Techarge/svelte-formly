const config = {
        mode: "jit",
        purge: {
            content: ["./src/**/*.{html,js,svelte,ts}",],
            options: {
                safelist: {

                    gridrows: [...Array(12).keys()].map((_, i) => `grid-rows-${i + 1}`),
                    gridcols: [...Array(12).keys()].map((_, i) => `grid-cols-${i + 1}`),
                    bg: [/^bg-/],
                    py: [/^py-/],
                    px: [/^px-/],
                    p: [/^p-/],
                    w: [/^w-/],
                    bgdg: "bg-dark-grey"
                }
            }
        },
    },
    theme: {
        extend: {
            colors: {
                'light-grey' : '#EDEDED;',
                'dark-grey' : '#C4C4C4;',
            }
            ,
            padding: {
                '10px' : '10px',
                '30px' : '30px',
            }
        }
        ,
    }
    ,
    plugins: [],
    }
;

module.exports = config;
