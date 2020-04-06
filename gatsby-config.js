module.exports = {
    siteMetadata: {
        title: `Flixerr`,
        description: `Stream your favorite movies and TV shows for free. Straight from your desktop.`,
        author: `@carlelieser`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `flixerr-website`,
                short_name: `flixerr`,
                start_url: `/`,
                background_color: `#10101e`,
                theme_color: `#10101e`,
                display: `minimal-ui`,
                icon: `src/images/favicon-32x32.png`,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-162943044-1",
            },
        },
    ],
}
