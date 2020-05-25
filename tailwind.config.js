module.exports = {
    theme: {
        extend: {
            opacity: {
                mask: "0.65",
            },
            duration: {
                base: "0.24",
            },
            colors: {
                inherit: "inherit",
            },
            maxHeight: {
                "85vh": "85vh",
            },
        },
    },
    // explicitly configuring PurgeCSS in postcss.config.js
    purge: false,
}
