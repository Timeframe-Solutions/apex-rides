import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: { compatibilityVersion: 4 },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@pinia/nuxt"],

  css: ["~/assets/css/main.css"],

  fonts: {
    families: [
      { name: "Plus Jakarta Sans", weights: [700, 800] },
      { name: "Inter", weights: [400, 500, 600] },
    ],
  },

  icon: {
    serverBundle: { collections: ["lucide"] },
  },

  image: {
    provider: "ipx",
    quality: 85,
    format: ["webp"],
  },

  app: {
    head: {
      titleTemplate: "%s | Apex Rides Nairobi",
      htmlAttrs: { lang: "en" },
      meta: [
        {
          name: "description",
          content:
            "Browse affordable cars, SUVs, and pickups for sale and hire in Nairobi.",
        },
        { name: "theme-color", content: "#111111" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { property: "og:image", content: "/og-image.jpg" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  runtimeConfig: {
    resendApiKey: "",
    dbUrl: "",
    public: {
      whatsappNumber: "254700000000",
      phoneNumber: "+254700000000",
      gaId: "",
      siteUrl: "https://apexridesnairobi.co.ke",
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["node"],
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["yup > tiny-case"],
    },
  },

  devtools: { enabled: true },
});
