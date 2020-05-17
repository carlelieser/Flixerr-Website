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
            isMobile: false,
            operatingSystem: false,
            isUnsupported: false,
        }
    }

    isMobile = () => {
        let { userAgent } = navigator
        let isMobile = userAgent.match(
            /(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i
        )
        return isMobile
    }

    getOS = lowerCase => {
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

    extractDownloadLink = async data => {
        let { assets } = data,
            os = this.getOS(true)
        let filtered = assets.filter(item => {
            let name = item.name.toLowerCase()
            let containsOSName = name.indexOf(os) > -1
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

    openDownloadLink = async () => {
        let url = await this.getDownloadLink()
        window.open(url, "_blank")
    }

    handleClick = () => {
        let { operatingSystem, isUnsupported } = this.state
        if (!isUnsupported) {
            trackCustomEvent({
                category: `${operatingSystem} Downloads`,
                action: "Download",
                label: this.props.analyticsLabel,
            })
            this.openDownloadLink()
        }
    }

    initMobile = () => {
        let isMobile = this.isMobile()
        this.setState({ isMobile })
    }

    initOS = () => {
        let operatingSystem = this.getOS()
        this.setState({ operatingSystem })
    }

    init = () => {
        this.initMobile()
        this.initOS()
    }

    checkIfUnsupported = () => {
        if (
            this.state.operatingSystem === "Unsupported" ||
            this.state.isMobile
        ) {
            this.setState({ isUnsupported: true })
        } else {
            this.setState({ isUnsupported: false })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.operatingSystem !== this.state.operatingSystem ||
            prevState.isMobile !== this.state.isMobile
        ) {
            this.checkIfUnsupported()
        }
    }

    componentDidMount() {
        this.init()
    }

    render() {
        let { showOs, operatingSystem, isUnsupported } = this.state
        let { className, text } = this.props
        let buttonClass = `${className ? className : ""} ${
            showOs ? "fade-in" : ""
        } btn btn-primary`
        let unSupportedStyles = {
            backgroundColor: "#616161",
        }

        return (
            <div
                className={buttonClass}
                onMouseEnter={this.toggleShowOs}
                onMouseLeave={this.toggleShowOs}
                onClick={this.handleClick}
                style={isUnsupported ? unSupportedStyles : null}
            >
                <span>
                    <FeatherIcon
                        icon={isUnsupported ? "frown" : "download"}
                        size={20}
                    />
                    {isUnsupported ? (
                        <span>Unsupported</span>
                    ) : (
                        <span>
                            {text}
                            {showOs ? <span> for {operatingSystem}</span> : ""}
                        </span>
                    )}
                </span>
            </div>
        )
    }
}

export default DownloadButton
