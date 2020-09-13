import React, { Component } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Features from "../components/features"
import DownloadBanner from "../components/download-banner"

import FeatherIcons from "feather-icons-react"
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

    getOS = lowerCase => {
		if (typeof window !== "undefined"){
			let { navigator } = window
            let { appVersion } = navigator,
                OSName = "Unsupported"
            if (appVersion.indexOf("Win") != -1) OSName = "Windows"
            if (appVersion.indexOf("Mac") != -1) OSName = "MacOS"
            if (appVersion.indexOf("X11") != -1) OSName = "Linux"
            if (appVersion.indexOf("Linux") != -1) OSName = "Linux"
            OSName = lowerCase ? OSName.toLowerCase() : OSName
            return OSName
		}
			
    }

    componentDidMount() {
        this.loadImage()
    }

    render() {
		let os = this.getOS();
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
                {os === "MacOS" ? (
                    <div className="mac-os-warning">
                        <FeatherIcons icon="info" />
                        <div className="title">Opening Flixerr on Mac OS</div>
                        <p className="supporting-text">
                            After installing the app, and launching it, you will
                            get a warning about not being able to open Flixerr
                            because{" "}
                            <em>"it is from an unidentified developer".</em> To
                            solve this problem, dismiss the warning and go into{" "}
                            <strong>
                                System Preferences {">"} Security & Privacy{" "}
                                {">"} General
                            </strong>{" "}
                            and click "Open Anyway".
                        </p>
                    </div>
                ) : null}
                <div className="mac-os-warning"></div>
                <DownloadBanner />
            </Layout>
        )
    }
}
export default IndexPage
