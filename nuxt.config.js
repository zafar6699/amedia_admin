export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "Admin markaz",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css

    css: ["element-ui/lib/theme-chalk/index.css", "@/assets/style/style.scss"],
    styleResources: {
        scss: ["@/assets/style/*.scss"],
    },

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["@/plugins/element-ui", "@/plugins/axios"],
    router: {
        middleware: ["auth"],
    },
    auth: {
        redirect: {
            login: "/auth/login",
            logout: "/auth/login",
            callback: "/auth/login",
            home: "/",
        },
        strategies: {
            local: {
                token: {
                    property: "token",
                },
                user: {
                    property: "data",
                },
                endpoints: {
                    login: { url: "/auth/login", method: "post" },
                    user: { url: "/auth/me", method: "get" },
                },
            },
        },
    },

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios,
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: "http://cdn.amediatv.uz/api/",
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [/^element-ui/],
    },
};
