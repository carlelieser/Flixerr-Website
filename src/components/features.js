import React, { Component } from "react"
import FeatherIcon from "feather-icons-react"

import "../styles/features.css"

class Features extends Component {
    constructor(props) {
        super(props)

        this.state = {
            featuresList: [
                {
                    icon: "zap",
                    title: "Fast & Reliable",
                    desc:
                        "Get blazing fast streaming speeds with little to no buffering time.",
                },
                {
                    icon: "award",
                    title: "Bestest & Mostest",
                    desc:
                        "Stream over 400,000 movies in high-definition or full HD. You choose.",
                },
                {
                    icon: "cloud-lightning",
                    title: "Sync, sync, sync",
                    desc:
                        "Create an account and sync your favorite movies across all your devices.",
				},
				{
					icon: 'cast',
					title: 'Small screen? No problem.',
					desc: 'Cast to any chromecast available device.'
				},
				{
					icon: 'moon',
					title: 'Pull an all-nighter.',
					desc: 'Easily toggle between light and dark mode for your viewing pleasure.'
				}, 
				{
					icon: 'gift',
					title: 'Our gift.',
					desc: 'Enjoy our beautifully designed app for free, always.'
				}
            ],
        }
    }
    render() {
        let features = this.state.featuresList.map(feature => {
            let { icon, title, desc } = feature
            return (
                <div key={"feature-" + title} className="feature">
                    <FeatherIcon icon={icon} size={36} />
                    <div className="feature-title">{title}</div>
                    <div className="feature-desc">{desc}</div>
                </div>
            )
        })
        return (
            <div id="features" className="features-container">
                {features}
            </div>
        )
    }
}

export default Features
