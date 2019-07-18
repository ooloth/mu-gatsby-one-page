// DOCS: https://github.com/muicss/loadjs#documentation
// DOCS: https://greensock.com/docs/TweenLite
// Forum: https://greensock.com/forums/topic/15749-gsap-with-create-react-app/

function Project({ project }) {
  const [expanded, setExpanded] = useState(false)
  const details = useRef()

  function handleClick() {
    expanded ? collapse() : expand()
  }

  function handleKeyUp(e) {
    e.key === `Enter` && handleClick()
  }

  function expand() {
    const gsapTarget = details.current

    loadjs.ready(`gsap`, () => {
      // When expanding, set this immediately
      setExpanded(true)

      // Invalidate the temporary inline styles (which match the starting state for the animation and are added to prevent a flash of content in the ending position)
      gsapTarget.removeAttribute(`style`)

      // Expand the section to its natural height
      TweenLite.fromTo(
        gsapTarget,
        1,
        {
          height: 0,
          autoAlpha: 0
        },
        {
          height: gsapTarget.offsetHeight,
          autoAlpha: 1,
          ease: `Power3.easeInOut`,
          // after expanding, allow height to adapt naturally when window is resized:
          onComplete: () => gsapTarget.removeAttribute(`style`)
        }
      )
    })
  }

  function collapse() {
    const gsapTarget = details.current

    loadjs.ready(`gsap`, () => {
      // Collapse the section to 0
      TweenLite.to(gsapTarget, 1, {
        height: 0,
        autoAlpha: 0,
        ease: `Power3.easeInOut`,
        // When collapsing, set this after animation completes
        onComplete: () => setExpanded(false)
      })
    })
  }

  return (
    <li
      role="button"
      tabIndex="0"
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      aria-expanded={expanded}
      className="relative cursor-pointer"
    >
      <span className="sr-only">
        Click or press enter to expand/collapse project details
      </span>

      <div className="pv4 hover:bg-near-white animate">
        <ProjectHeader
          title={project.title}
          tags={project.tags}
          expanded={expanded}
        />
        <div
          ref={details}
          className="relative z-2 overflow-hidden"
          style={{ height: 0 }}
        >
          <ProjectDetails project={project} />
        </div>
      </div>
    </li>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React, { useState, useRef } from 'react'
import loadjs from 'loadjs'

import ProjectHeader from './ProjectHeader'
import ProjectDetails from './ProjectDetails'

export default Project
