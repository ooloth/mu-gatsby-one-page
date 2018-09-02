class Work extends React.Component {
  state = {
    limit: 5,
    operaIsChecked: true,
    websitesIsChecked: true
  }

  handleFilterClick = e => {
    const { operaIsChecked, websitesIsChecked } = this.state
    let filters = {}

    // TODO: turn this into a state machine (states = showOpera, showWebsites, showAll)?
    if (e.target.value === 'opera') {
      if (e.target.checked) filters = { operaIsChecked: true }
      else if (!websitesIsChecked)
        filters = { operaIsChecked: true, websitesIsChecked: true }
      else filters = { operaIsChecked: false }
    } else if (e.target.value === 'websites') {
      if (e.target.checked) filters = { websitesIsChecked: true }
      else if (!operaIsChecked)
        filters = { operaIsChecked: true, websitesIsChecked: true }
      else filters = { websitesIsChecked: false }
    }

    this.setState({ ...filters, limit: 5 })
  }

  handleLoadMore = () => {
    const { projects } = this.props
    const { limit } = this.state
    const total = projects.length

    // Increment the number of projects shown (up to the total number of projects)
    if (limit < total) {
      if (limit + 5 > total) this.setState({ limit: total })
      else this.setState({ limit: limit + 5 })
    }
  }

  render() {
    const { limit, operaIsChecked, websitesIsChecked } = this.state
    const { projects } = this.props

    // Which projects are in the active category? (Keep separate to calculate allLoaded.)
    const projectsInActiveCategory = projects.filter(project => {
      if (operaIsChecked && websitesIsChecked) return project
      else if (operaIsChecked) return project.node.category === `Opera`
      else if (websitesIsChecked) return project.node.category === `Website`
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
          handleChange={this.handleFilterClick}
        />

        <Projects projects={visibleProjects} />

        {!allLoaded && (
          <SeeMoreProjects
            operaIsChecked={operaIsChecked}
            websitesIsChecked={websitesIsChecked}
            handleLoadMore={this.handleLoadMore}
          />
        )}
      </section>
    )
  }
}

/* 
 *
 * Load More Projects
 * 
 */

const SeeMoreProjects = ({ operaIsChecked, websitesIsChecked, handleLoadMore }) => {
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

/*
 *
 * Filters
 * 
 */

const Filters = ({ operaIsChecked, websitesIsChecked, handleChange }) => (
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

const Filter = ({ category, handleChange, operaIsChecked, websitesIsChecked }) => {
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

/* 
 *
 * Projects
 * 
 */

const Projects = ({ projects }) => (
  <ul>
    {projects.map(project => {
      return <Project key={project.key} project={project.node} />
    })}
  </ul>
)

/* 
 *
 * Project
 * 
 */

// DOCS: https://github.com/muicss/loadjs#documentation
// DOCS: https://greensock.com/docs/TweenLite
// Forum: https://greensock.com/forums/topic/15749-gsap-with-create-react-app/

class Project extends React.Component {
  state = { expanded: false }
  details = React.createRef()

  handleClick = () => (this.state.expanded ? this.collapse() : this.expand())
  handleKeyUp = e => e.key === `Enter` && this.handleClick()

  expand = () => {
    const gsapTarget = this.details.current

    loadjs.ready(`gsap`, () => {
      // When expanding, set this immediately
      this.setState({ expanded: true })

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

  collapse = () => {
    const gsapTarget = this.details.current

    loadjs.ready(`gsap`, () => {
      // Collapse the section to 0
      TweenLite.to(gsapTarget, 1, {
        height: 0,
        autoAlpha: 0,
        ease: `Power3.easeInOut`,
        // When collapsing, set this after animation completes
        onComplete: () => this.setState({ expanded: false })
      })
    })
  }

  render() {
    const { project } = this.props
    const { expanded } = this.state

    return (
      <li
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
        onKeyUp={this.handleKeyUp}
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
            ref={this.details}
            className="relative z-2 overflow-hidden"
            style={{ height: 0 }}
          >
            <ProjectDetails project={project} />
          </div>
        </div>
      </li>
    )
  }
}

/* 
 *
 * Project Header
 * 
 */

const ProjectHeader = ({ title, tags, expanded }) => (
  <div className="group flex justify-between items-baseline container pv2">
    <HeaderInfo title={title} tags={tags} />
    <HeaderIcon expanded={expanded} />
  </div>
)

const HeaderInfo = ({ title, tags }) => (
  <div>
    <h3 lang={title.lang && title.lang} className="mb2 lh-solid f2 sm:f1 fw9 ttu">
      {title.text}
    </h3>
    <ul className="nb2">
      {tags.map((tag, index) => {
        return (
          <li
            key={`tag-${index}`}
            className="dib mr2 mb2 bg-green pv1 ph2 sm:f4 fw4 ttl"
          >
            {tag}
          </li>
        )
      })}
    </ul>
  </div>
)

const HeaderIcon = ({ expanded }) => (
  <span
    aria-hidden="true"
    className={`dn md:db f1 fw9 animate${!expanded && ` o-0 group-hover:o-100`}`}
  >
    {expanded ? `-` : `+`}
  </span>
)

/*****************
 *
 * Project Details
 *
 *****************/

class ProjectDetails extends Component {
  // Prevent link clicks from triggering click event handlers on parent components
  handleClick = e => e.target.nodeName === `A` && e.stopPropagation()

  render() {
    const { project } = this.props
    return (
      <div className="container pt4 lh-tall">
        <FeaturedImage
          image={project.image.childImageSharp.fluid}
          alt={project.alt}
        />

        {/* Don't collapse the project when links in the following sections are clicked */}
        <div onClick={this.handleClick}>
          {project.reviews && <Reviews reviews={project.reviews} />}
          {project.features && <Features features={project.features} />}
          {project.description && <Description description={project.description} />}
          {project.details && <Details details={project.details} />}

          <HyperLink href={project.link} className="link mv4 tc">
            View site →
          </HyperLink>
        </div>
      </div>
    )
  }
}

/* 
 *
 * Featured Image
 * 
 */

const FeaturedImage = ({ image, alt }) => (
  <figure>
    <Img fluid={image} alt={alt} className="shadow-lg" />
    <figcaption className="o-50 pt1 f6">{alt}</figcaption>
  </figure>
)

/* 
 *
 * Reviews
 * 
 */

// TODO: refactor using <Quote />?
const Reviews = ({ reviews }) =>
  reviews.map((review, i) => {
    return (
      <blockquote key={i} className="mt4 pv2">
        <div className="bw3 bt-0 br-0 bb-0 b--green pl3 measure">
          <p
            className="mb2 f4 sm:f3"
            dangerouslySetInnerHTML={{ __html: review.quotation }}
          />

          {review.link ? (
            <cite className="sm:f4 fw7 fs-normal">
              <HyperLink href={review.link} className="link-inline di sm:dib">
                {review.source}
              </HyperLink>
            </cite>
          ) : (
            <cite className="sm:f4 fw7 fs-normal">{review.source}</cite>
          )}
        </div>
      </blockquote>
    )
  })

/*
 *
 * Features
 *
 */

const Features = ({ features }) => (
  <ul className="mt4 nb1">
    {features.map((feature, i) => {
      return <Feature key={i} feature={feature} />
    })}
  </ul>
)

const Feature = ({ feature }) => {
  let ariaLabel
  if (feature.emoji === '📺') ariaLabel = 'Emoji of a television'
  if (feature.emoji === '📖') ariaLabel = 'Emoji of an open book'
  if (feature.emoji === '🎧') ariaLabel = 'Emoji of a pair of headphones'

  return (
    <li className="flex pb1">
      <Emoji emoji={feature.emoji} ariaLabel={ariaLabel} className="pr1" />
      <p dangerouslySetInnerHTML={{ __html: feature.text }} className="measure" />
    </li>
  )
}

/* 
 *
 * Description
 * 
 */

const Description = ({ description }) => (
  <p dangerouslySetInnerHTML={{ __html: description }} className="mt4 measure" />
)

/* 
 *
 * Details
 * 
 */

const Details = ({ details }) => (
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

/* 
 *
 * Imports & Exports
 * 
 */

import React, { Component, Fragment } from 'react'
import loadjs from 'loadjs'

import Emoji from '../components/Emoji'
import HyperLink from '../components/HyperLink'
import Img from '../components/Img'

export default Work
