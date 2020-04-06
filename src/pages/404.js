import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import pageNotFoundImage from "../images/page-not-found.svg"

const NotFoundPage = () => (
    <Layout>
        <SEO title="404: Not found" />
        <div className="page-not-found-container">
            <div className="container-illustration">
                <img src={pageNotFoundImage} />
            </div>
            <div className="title">Woopsie...</div>
            <div className="supporting-text">
                You just hit a route that doesn't exist... the sadness.
            </div>
        </div>
    </Layout>
)

export default NotFoundPage
