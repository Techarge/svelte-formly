import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import browsersync from "rollup-plugin-browsersync";
import {terser} from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import css from "rollup-plugin-css-only";
import pkg from "./package.json";
import sveltePreprocess from "svelte-preprocess";

const watch = process.env.WATCH;
const mainpath = watch ? "docs/index.js" : pkg.main;

const dedupe = (importee) =>
    importee === "svelte" || importee.startsWith("svelte/");

const bundleName = `bundle-sformly`;

const scssOptions = {
    transformers: {
        scss: {
            includePaths: ["node_modules", "src"],
        },
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
};

const production = !process.env.ROLLUP_WATCH;

export default {
    input: !production ? "src/main.js" : "src/index.js",
    output: [
        {file: pkg.module, format: "es", name: "es", sourcemap: !production},
        {file: mainpath, format: "iife", name: "iife", sourcemap: !production},
    ],
    plugins: [
        svelte({
            preprocess: sveltePreprocess(scssOptions),
        }),
        css({
            output: `${bundleName}.css`,
        }),
        resolve({
            browser: true,
            dedupe: ["svelte"],
        }),
        commonjs({
            include: ["/node_modules/**"],
        }),
        watch && browsersync({server: "docs"}),
        !watch && terser(),
    ],
};
