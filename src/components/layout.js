/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import { Helmet } from "react-helmet"
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
                <div key={"social-" + item.name} className="social-media">
                    <a href={item.link}>
                        <FeatherIcons icon={item.icon} />
                    </a>
                </div>
            )
        })

        return (
            <>
                <Helmet>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&family=Work+Sans:wght@300;400;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>
                <div
                    className={`${this.props.className} ${
                        this.props.fadeLoad ? "" : "override-fade"
                    } main-container content`}
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
