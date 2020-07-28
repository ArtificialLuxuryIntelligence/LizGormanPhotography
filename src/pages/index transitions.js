import React from "react"
// import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import indexStyles from "./index.module.scss"
import TransitionLink, { TransitionState } from "gatsby-plugin-transition-link"
import posed from "react-pose"

const TRANSITION_LENGTH = 2.45

const FadingContent = posed.div({
  exiting: {
    opacity: 0,
  },
  // entering: { opacity: 1 },
  entered: { opacity: 1 },
})

const SlidingContent = posed.div({
  entering: { opacity: 0 },
  entered: { opacity: 0 },
  exited: { opacity: 0 },
  exiting: {
    opacity: 1,
    translateX: "100%",
    transition: {
      translateX: {
        delay: 450,
        duration: 2000,
        ease: "easeIn",
      },
    },
  },
})

const IndexPage = () => {
  const exitTransition = {
    length: TRANSITION_LENGTH,
    zIndex: 2,
    // trigger: () => {
    //   if (document) {
    //     document.body.style.overflow = "hidden"
    //   }
    // },
  }

  const entryTransition = {
    zIndex: 2,
    delay: TRANSITION_LENGTH,
    // trigger: () => {
    //   if (document && window) {
    //     window.scrollTo(0, 0)
    //     document.body.style.overflow = "visible"
    //   }
    // },
  }
  return (
    <>
      <TransitionState>
        {({ transitionStatus }) => {
          console.log("STATUS", transitionStatus)
          return (
            <>
              <SlidingContent pose={transitionStatus}>
                <div className={indexStyles.slidingContent}></div>
              </SlidingContent>
              <Layout>
                <SEO title="Home" />
                <FadingContent pose={transitionStatus}>
                  <h2>SOME FADING TEXT</h2>
                  <TransitionLink
                    to="/art/"
                    exit={exitTransition}
                    entry={entryTransition}
                  >
                    ART
                  </TransitionLink>
                  <p>
                    l lalaa some this agdsgasdgasdlg adngl asdng klasdg laksdgn
                    alksfgnlaksdg asglasfng lkasfng lkasfnglkasfsngasfgnfs
                  </p>
                </FadingContent>
              </Layout>
            </>
          )
        }}
      </TransitionState>
    </>
  )
}

export default IndexPage

// return (
//   <Layout>
//     <SEO title="Home" />
//     <FadeLink to="/art/">ART</FadeLink>
//     <br />
//     {/* <FadeLink to="/commercial/">COMMERCIAL</FadeLink> */}

//     {/* <animated.div className={indexStyles.animated} style={props}>
//       I will fade in
//     </animated.div> */}
//   </Layout>
// )
