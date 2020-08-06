import React, { Component } from "react"
import Slider from "react-slick" //css files added in gatsby-config
import "./slickStyles.scss"
// import Img from "gatsby-image"

export default class SlickAndThumbs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nav1: null,
      nav2: null,
    }
  }
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    })
  }

  render() {
    const settings = {
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: "innerSlick",
      // centerPadding: 0,
    }
    const settingsNav = {
      infinite: true,
      speed: 500,
      slidesToShow: Math.min(5, this.props.children.length),
      //   slidesToShow: 4,
      slidesToScroll: 3,
      focusOnSelect: true,
    }
    return (
      <div>
        <div className="slick-container">
          <Slider
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            {...settings}
          >
            {this.props.children}
          </Slider>
        </div>
        <div className="slick-nav-container">
          <Slider
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            {...settingsNav}
          >
            {this.props.children}
          </Slider>
        </div>
      </div>
    )
  }
}
