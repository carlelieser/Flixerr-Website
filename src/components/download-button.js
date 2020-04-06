import React, { Component } from "react"
import FeatherIcon from "feather-icons-react"
import axios from "axios"
import cheerio from "cheerio"
import { window } from "browser-monads"

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

    extractDownloadLinkFromHtml = async html => {
        let os = this.getOS()
        let $ = cheerio.load(html)
        let links = []

        $("a").each((index, element) => {
            if (element) {
                let link = element.attribs.href
                if (link) {
                    let isDownloadLink =
                        link.indexOf(
                            "/carlelieser/Flixerr/releases/download/"
                        ) > -1
                    let isCompatible = link.indexOf(os) > -1
                    let completeLink = `https://github.com${link}`
                    if (isDownloadLink && isCompatible) links.push(completeLink)
                }
            }
        })

        let mostRecentLink = links[0]

        return mostRecentLink
    }

    getReleaseHtml = () => {
        let url = "https://github.com/carlelieser/Flixerr/releases"
        return axios
            .get(url, { crossdomain: true })
            .then(response => {
                return response.data
            })
            .catch(err => console.log(err))
    }

    getDownloadLink = async () => {
        let body = await this.getReleaseHtml()
        let link = await this.extractDownloadLinkFromHtml(body)
        return link
    }

    setDownloadLink = downloadLink => {
        this.setState({ downloadLink })
    }

    initDownloadLink = async () => {
        let url = await this.getDownloadLink()
        this.setDownloadLink(url)
    }

    toggleShowOs = () => {
        this.setState(prevState => {
            return {
                showOs: !prevState.showOs,
            }
        })
    }

    updateAnalytics = () => {
        let analytics = Analytics({
            app: "flixerrtv",
            plugins: [
                googleAnalytics({
                    trackingId: "UA-162943044-1",
                }),
            ],
        })
        analytics.track("downloadedApp", {
            os,
            analyticsLabel: label,
        })
    }

    handleClick = () => {
        let { analyticsLabel } = this.props
        let os = this.getOS()
        this.updateAnalytics(os, analyticsLabel)
    }

    componentDidMount() {
        if (window) {
            this.initDownloadLink()
        }
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
            >
                <span>
                    <a
                        href={this.state.downloadLink}
                        target="_blank"
                        onClick={this.handleClick}
                    >
                        <FeatherIcon icon="download" size={20} />
                        <span>
                            {this.props.text}
                            {this.state.showOs ? <span> for {os}</span> : ""}
                        </span>
                    </a>
                </span>
            </div>
        )
    }
}

export default DownloadButton
