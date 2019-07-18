function Work({ projects }) {
  const [limit, setLimit] = useState(5)
  const [operaIsChecked, setOperaIsChecked] = useState(true)
  const [websitesIsChecked, setWebsitesIsChecked] = useState(true)

  function handleFilterClick(e) {
    let showOperas = operaIsChecked
    let showWebsites = websitesIsChecked

    // TODO: turn this into a state machine (states = showOpera, showWebsites, showAll)?
    if (e.target.value === 'opera') {
      if (e.target.checked) {
        showOperas = true
      } else if (!websitesIsChecked) {
        showOperas = true
        showWebsites = true
      } else {
        showOperas = false
      }
    }

    if (e.target.value === 'websites') {
      if (e.target.checked) {
        showWebsites = true
      } else if (!operaIsChecked) {
        showOperas = true
        showWebsites = true
      } else {
        showWebsites = false
      }
    }

    if (operaIsChecked !== showOperas) setOperaIsChecked(showOperas)
    if (websitesIsChecked !== showWebsites) setWebsitesIsChecked(showWebsites)
    if (limit !== 5) setLimit(5)
  }

  function handleLoadMore() {
    // Increment the number of projects shown (up to the total number of projects)
    if (limit < projects.length) {
      if (limit + 5 > projects.length) {
        setLimit(projects.length)
      } else {
        setLimit(limit + 5)
      }
    }
  }

  // Which projects are in the active category? (Keep separate to calculate allLoaded.)
  const projectsInActiveCategory = projects.filter(project => {
    if (operaIsChecked && websitesIsChecked) return project
    else if (operaIsChecked) return project.category === `Opera`
    else if (websitesIsChecked) return project.category === `Website`
  })

  // Which projects in the active category should be visible?
  const visibleProjects = [...projectsInActiveCategory].slice(0, limit)

  // Are all projects in the active category visible? (If yes, hide "See More" button.)
  const allLoaded = limit >= projectsInActiveCategory.length

  return (
    <section className="pv6 avenir">
      <h2 className="sr-only">Opera and Website Projects</h2>

      <Filters
        operaIsChecked={operaIsChecked}
        websitesIsChecked={websitesIsChecked}
        handleChange={handleFilterClick}
      />

      <Projects projects={visibleProjects} />

      {!allLoaded && (
        <SeeMoreProjects
          operaIsChecked={operaIsChecked}
          websitesIsChecked={websitesIsChecked}
          handleLoadMore={handleLoadMore}
        />
      )}
    </section>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function SeeMoreProjects({ operaIsChecked, websitesIsChecked, handleLoadMore }) {
  let buttonText = 'projects'
  if (!operaIsChecked) buttonText = 'websites'
  if (!websitesIsChecked) buttonText = 'operas'

  return (
    <div className="container pt5">
      <button onClick={handleLoadMore} className="link">
        See more {buttonText}
      </button>
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Filters({ operaIsChecked, websitesIsChecked, handleChange }) {
  return (
    <fieldset className="container mb4 lh-solid f3 fw4 ttl">
      <legend className="sr-only">
        Select whether to view opera projects, website projects, or both:
      </legend>

      <Filter
        category="opera"
        handleChange={handleChange}
        operaIsChecked={operaIsChecked}
        websitesIsChecked={websitesIsChecked}
      />

      <Filter
        category="websites"
        handleChange={handleChange}
        operaIsChecked={operaIsChecked}
        websitesIsChecked={websitesIsChecked}
      />
    </fieldset>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Filter({ category, handleChange, operaIsChecked, websitesIsChecked }) {
  let isChecked = false
  if (
    (category === `websites` && websitesIsChecked) ||
    (category === `opera` && operaIsChecked)
  ) {
    isChecked = true
  }

  return (
    <label
      htmlFor={category}
      className={`custom-checkbox animate cursor-pointer${
        category === `opera` ? ` mr4` : ``
      }`}
    >
      {/* Actual (but visually-hidden) checkbox */}
      <input
        id={category}
        type="checkbox"
        value={category}
        onChange={handleChange}
        checked={isChecked}
        className="ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-3px`, width: `1.4rem`, height: `1.4rem` }}
      />

      {/* Styled "checkbox" */}
      <span
        className="checkmark ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-3px`, width: `1.4rem`, height: `1.4rem` }}
      />

      {/* Visible text label */}
      <span className="checkbox-label">
        &nbsp;
        {category}
      </span>
    </label>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Projects({ projects }) {
  return (
    <ul>
      {projects.map(project => {
        return (
          <Project
            key={project.image.childImageSharp.fluid.src + project.link}
            project={project}
          />
        )
      })}
    </ul>
  )
}

///////////////////////////////////////////////////////////////////////////////////

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

function ProjectHeader({ title, tags, expanded }) {
  return (
    <div className="group flex justify-between items-baseline container pv2">
      <HeaderInfo title={title} tags={tags} />
      <HeaderIcon expanded={expanded} />
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function HeaderInfo({ title, tags }) {
  return (
    <div>
      <h3
        lang={title.lang && title.lang}
        className="mb2 lh-solid f2 sm:f1 fw9 ttu"
      >
        {title.text}
      </h3>

      <ul className="nb2">
        {tags.map((tag, i) => {
          return (
            <li key={i} className="dib mr2 mb2 bg-green pv1 ph2 sm:f4 fw4 ttl">
              {tag}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function HeaderIcon({ expanded }) {
  return (
    <span
      aria-hidden="true"
      className={`dn md:db f1 fw9 animate${!expanded && ` o-0 group-hover:o-100`}`}
    >
      {expanded ? `-` : `+`}
    </span>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function ProjectDetails({ project }) {
  function handleClick(e) {
    e.target.nodeName === `A` && e.stopPropagation()
  }

  return (
    <div className="container pt4 lh-tall">
      <FeaturedImage
        image={project.image.childImageSharp.fluid}
        alt={project.alt}
      />

      {/* Don't collapse the project when links in the following sections are clicked */}
      <div onClick={handleClick}>
        {project.reviews && <Reviews reviews={project.reviews} />}
        {project.features && <Features features={project.features} />}
        {project.description && <Description description={project.description} />}
        {project.details && <Details details={project.details} />}

        <Link href={project.link} className="link mv4 tc">
          Visit site →
        </Link>
      </div>
    </div>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function FeaturedImage({ image, alt }) {
  return (
    <figure>
      <Img fluid={image} alt={alt} className="shadow-lg" />
      <figcaption className="o-50 pt1 f6">{alt}</figcaption>
    </figure>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Reviews({ reviews }) {
  return reviews.map((review, i) => (
    <blockquote key={i} className="mt4 pv2">
      <div className="bw3 bt-0 br-0 bb-0 b--green pl3 measure">
        <p
          className="mb2 f4 sm:f3"
          dangerouslySetInnerHTML={{ __html: review.quotation }}
        />

        {review.link ? (
          <cite className="sm:f4 fw7 fs-normal">
            <Link
              href={review.link}
              className="link-inline di sm:dib cursor-pointer"
            >
              <span dangerouslySetInnerHTML={{ __html: review.source }} />
            </Link>
          </cite>
        ) : (
          <cite className="sm:f4 fw7 fs-normal">{review.source}</cite>
        )}
      </div>
    </blockquote>
  ))
}

///////////////////////////////////////////////////////////////////////////////////

function Features({ features }) {
  return (
    <ul className="mt4 nb1">
      {features.map((feature, i) => {
        return <Feature key={i} feature={feature} />
      })}
    </ul>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Feature({ feature }) {
  let ariaLabel
  if (feature.emoji === '📺') ariaLabel = 'Emoji of a television'
  if (feature.emoji === '📖') ariaLabel = 'Emoji of an open book'
  if (feature.emoji === '🎧') ariaLabel = 'Emoji of a pair of headphones'

  return (
    <li className="flex align-baseline pb1">
      <Emoji
        emoji={feature.emoji}
        ariaLabel={ariaLabel}
        className="feature-emoji-alignment mr1"
      />
      <p dangerouslySetInnerHTML={{ __html: feature.text }} className="measure" />
    </li>
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Description({ description }) {
  return (
    <p dangerouslySetInnerHTML={{ __html: description }} className="mt4 measure" />
  )
}

///////////////////////////////////////////////////////////////////////////////////

function Details({ details }) {
  return (
    <dl className="mt4">
      {details.map((detail, i) => {
        return (
          detail.name !== `Dates` && (
            <Fragment key={i}>
              <dt className="fl fw7">
                {detail.name}
                :&nbsp;
              </dt>
              <dd lang={detail.lang && detail.lang}>{detail.value}</dd>
            </Fragment>
          )
        )
      })}
    </dl>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React, { Fragment, useState, useRef } from 'react'
import loadjs from 'loadjs'

import Emoji from '../components/Emoji'
import Link from '../components/Link'
import Img from '../components/Img'

export default Work
