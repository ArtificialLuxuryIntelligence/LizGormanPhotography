import React, { Component } from "react"
import posed from "react-pose"
import TransitionLink, { TransitionState } from "gatsby-plugin-transition-link"

const Box = posed.div({
  hidden: {
    opacity: 0,
    height: 0,
    width: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  visible: {
    opacity: 1,
    height: "100vh",
    width: "100vw",
    position: "absolute",
    top: 0,
    left: 0,
  },
})

const TRANSITION_DURATION = 1.5

export default class FadeLink extends React.Component {
  render() {
    const { props } = this

    return (
      <>
        <TransitionState>
          {({ transitionStatus: status }) => {
            return (
              <TransitionLink
                to={props.to}
                exit={{
                  length: 1,
                  trigger: () => console.log("We are exiting"),
                }}
                entry={{ length: 1 }}
              >
                <p>Link</p>
              
              </TransitionLink>
            )
          }}
        </TransitionState>
      </>
    )
  }
}
