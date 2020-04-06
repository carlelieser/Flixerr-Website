import React, { Component } from "react"

import DownloadButton from "../components/download-button"
import BannerImg from "../images/watch-tv.png"
import "../styles/download-banner.css"

class DownloadBanner extends Component {
    render() {
        return (
            <div className="download-banner-container">
                <div className="download-banner-img">
                    <img alt="Banner Image" src={BannerImg} />
                </div>
                <div className="download-banner-content">
                    <div className="download-banner-title">
                        Let's get this party started.
                    </div>
                    <div className="download-banner-subtitle">
                        You're one step closer to paying a LOT less for
                        entertainment.
                    </div>
                    <DownloadButton
                        className="download-banner-btn"
                        analyticsLabel="Download banner button"
                        text="Download Now"
                    />
                </div>
            </div>
        )
    }
}

export default DownloadBanner
