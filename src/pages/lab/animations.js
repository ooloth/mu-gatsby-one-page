const AnimationsPage = ({ data }) => {
  return (
    <main className="">
      <h1>Animations</h1>
      <MountTransitionExample />
      <ParallaxExample />
    </main>
  )
}

export default AnimationsPage

/* 
 *
 * General
 * 
 */

import React, { Component, Fragment } from 'react'

/* 
 *
 * Mount Transition Example
 * 
 */

const MountTransitionExample = () => (
  <section>
    <h2>Mount Transition Example</h2>
    <AnimatingBox />
  </section>
)

/* 
 *
 * Animating Box
 * 
 */

// TODO: see this for more ideas: https://github.com/reactjs/react-transition-group/issues/136
// TODO: the above may show how to use this for page transitions as well...

import loadjs from 'loadjs'
import Transition from 'react-transition-group/Transition'

class AnimatingBox extends Component {
  state = { in: false }

  componentDidMount = () => {
    if (!loadjs.isDefined('gsap')) {
      loadjs(
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js',
        'gsap',
        () => this.setState({ in: true })
      )
    }
  }

  expand = transitionChild => {
    loadjs.ready('gsap', () => {
      // Expand the section to its natural height
      TweenMax.fromTo(
        transitionChild,
        1,
        {
          height: 0
        },
        {
          height: `8rem`,
          ease: Power3.easeInOut
        }
      )
    })
  }

  render() {
    return (
      <Transition
        in={this.state.in}
        onEnter={this.expand}
        timeout={1000}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <div className="flex justify-center items-center bg-pink w4">Hi</div>
      </Transition>
    )
  }
}

/* 
 *
 * Parallax Example
 * 
 */

import Parallax from 'react-rellax'
// see: https://github.com/nelonoel/react-rellax

const ParallaxExample = () => (
  <section className="mv7 pv7">
    <h2>Parallax Example</h2>

    <div className="flex justify-between items-center bg-pink h7">
      <p>I'm normal</p>
      <Parallax
        className="bg-blue h-50 shadow-md"
        style={{ height: `110%` }}
        speed={2}
        percentage={0.5}
      >
        I’m slow and smooth
      </Parallax>
    </div>
  </section>
)
