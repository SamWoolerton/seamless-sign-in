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
                blue: {
                    default: "#6296c0",
                    100: "#EBF8FF",
                    200: "#c9e0ed",
                    300: "#a2c9e2",
                    400: "#81afcf",
                    500: "#6296c0",
                    600: "#5881a7",
                    700: "#4f6e8c",
                    800: "#41556c",
                    900: "#384556",
                },
            },
            maxHeight: {
                "85vh": "85vh",
            },
            padding: {
                full: "100%",
            },
        },
    },
    // explicitly configuring PurgeCSS in postcss.config.js
    purge: false,
}
