import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Features from "../components/features"
import DownloadBanner from "../components/download-banner"

import mockupImage from "../images/flixerr-mac-mockup-min.png"
import "../styles/home.css"

class IndexPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageLoaded: false,
            imageUrl: "",
        }
    }

    handleLoadImage = () => {
        this.setState({ imageLoaded: true }, () => {
            console.log("Image loaded.")
        })
    }

    loadImage = () => {
        let image = new Image()

        image.onload = this.handleLoadImage
        image.src = mockupImage
    }

    componentDidMount() {
        this.loadImage()
    }

    render() {
        return (
            <Layout
                fadeLoad={true}
                className={this.state.imageLoaded ? "fade-in-long" : ""}
            >
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <SEO title="Home" />
                <div className="home-container">
                    <div className="big-title">
                        Get the best free movie streaming experience. Period.
                    </div>
                    <div className="mockup">
                        <img alt="Mockup image" src={mockupImage} />
                    </div>
                </div>
                <Features />
                <DownloadBanner />
            </Layout>
        )
    }
}
export default IndexPage
