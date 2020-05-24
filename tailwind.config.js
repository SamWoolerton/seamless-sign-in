module.exports = {
    theme: {
        extend: {
            opacity: {
                mask: "0.65",
            },
            duration: {
                base: "0.24",
            },
        },
    },
    // explicitly configuring PurgeCSS in postcss.config.js
    purge: false,
}
