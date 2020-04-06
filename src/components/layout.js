/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import PropTypes from "prop-types"

import Header from "./header"
import FeatherIcons from "feather-icons-react"
import "../styles/layout.css"

class Layout extends Component {
    constructor(props) {
        super(props)
	}
	
    render() {
        const socialMediaData = [
            {
                name: "Facebook",
                icon: "facebook",
                link: "https://www.facebook.com/flixerr/",
            },
            {
                name: "Instagram",
                icon: "instagram",
                link: "https://www.instagram.com/flixerr/",
            },
            {
                name: "Twitter",
                icon: "twitter",
                link: "https://twitter.com/theflixerr",
            },
            {
                name: "GitHub",
                icon: "github",
                link: "https://github.com/carlelieser/Flixerr",
            },
        ]

        const socialMedia = socialMediaData.map(item => {
            return (
                <div className="social-media">
                    <a href={item.link}>
                        <FeatherIcons icon={item.icon} />
                    </a>
                </div>
            )
        })

        return (
            <>
                <div
                    className={`${this.props.className} main-container content`}
                >
                    <Header siteTitle="Flixerr" />
                    <main>{this.props.children}</main>
                </div>
                <footer>
                    <div className="content">
                        <div className="social-container">{socialMedia}</div>
                        <div className="footer-desc">
                            <span>Have a question?</span>
                            <a href="mailto:support@flixerrtv.com">
                                We'll answer it.
                            </a>
                        </div>
                        <div className="footer-legal">
                            © Flixerr, {new Date().getFullYear()}
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
