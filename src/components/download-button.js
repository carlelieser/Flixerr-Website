import React, { Component } from "react"
import FeatherIcon from "feather-icons-react"
import axios from "axios"
import cheerio from "cheerio"
import { window } from "browser-monads"

import { trackCustomEvent } from "gatsby-plugin-google-analytics"

class DownloadButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            downloadLink: false,
            showOs: false,
        }
    }

    getOS = () => {
        let { navigator } = window
        let { appVersion } = navigator,
            OSName = ""
        if (appVersion.indexOf("Win") != -1) OSName = "Windows"
        if (appVersion.indexOf("Mac") != -1) OSName = "MacOS"
        if (appVersion.indexOf("X11") != -1) OSName = "UNIX"
        if (appVersion.indexOf("Linux") != -1) OSName = "Linux"
        return OSName
    }

    extractDownloadLink = async data => {
        let { assets } = data,
            os = this.getOS()

        let filtered = assets.filter(item => {
            let containsOSName = item.name.indexOf(os) > -1
            return containsOSName
        })

        let chosen = filtered[0]
        let link = chosen.browser_download_url

        return link
    }

    getReleaseHtml = () => {
        let url =
            "https://api.github.com/repos/carlelieser/flixerr/releases/latest"
        return axios
            .get(url, { crossdomain: true })
            .then(response => {
                return response.data
            })
            .catch(err => console.log(err))
    }

    getDownloadLink = async () => {
        let body = await this.getReleaseHtml()
        let link = await this.extractDownloadLink(body)
        return link
    }

    setDownloadLink = downloadLink => {
        this.setState({ downloadLink })
    }

    toggleShowOs = () => {
        this.setState(prevState => {
            return {
                showOs: !prevState.showOs,
            }
        })
    }

    openLink = async () => {
        let url = await this.getDownloadLink()
        window.open(url, "_blank")
    }

    handleClick = () => {
        let os = this.getOS()
        trackCustomEvent({
            category: `${os} Downloads`,
            action: "Download",
            label: this.props.analyticsLabel,
        })
        this.openLink()
    }

    render() {
        let buttonClass = `${
                this.props.className ? this.props.className : ""
            } ${this.state.showOs ? "fade-in" : ""} btn btn-primary`,
            os = this.getOS()

        return (
            <div
                className={buttonClass}
                onMouseEnter={this.toggleShowOs}
                onMouseLeave={this.toggleShowOs}
                onClick={this.handleClick}
            >
                <span>
                    <FeatherIcon icon="download" size={20} />
                    <span>
                        {this.props.text}
                        {this.state.showOs ? <span> for {os}</span> : ""}
                    </span>
                </span>
            </div>
        )
    }
}

export default DownloadButton
