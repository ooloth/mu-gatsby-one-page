class Work extends React.Component {
  state = {
    limit: 5,
    operaIsChecked: true,
    websitesIsChecked: true
  }

  handleFilterClick = e => {
    const { operaIsChecked, websitesIsChecked } = this.state
    let filters = {}

    switch (e.target.value) {
    case `opera`:
      if (e.target.checked) filters = { operaIsChecked: true }
      else if (!websitesIsChecked)
        filters = { operaIsChecked: true, websitesIsChecked: true }
      else filters = { operaIsChecked: false }
      break

    case `websites`:
      if (e.target.checked) filters = { websitesIsChecked: true }
      else if (!operaIsChecked)
        filters = { operaIsChecked: true, websitesIsChecked: true }
      else filters = { websitesIsChecked: false }
      break
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

    // Reduce project list to the active category
    const projectsInActiveCategory = projects.filter(project => {
      if (operaIsChecked && websitesIsChecked) return project
      else if (operaIsChecked) return project.node.category === `Opera`
      else if (websitesIsChecked) return project.node.category === `Website`
      else console.error(`Error in projectsInActiveCategory calculation in <Work />`)
    })

    const visibleProjects = projectsInActiveCategory.slice(0, limit)
    const allLoaded = limit >= projectsInActiveCategory.length

    return (
      <section className="pv6">
        <h2 className="sr-only">Opera and Website Projects</h2>

        <Filters
          operaIsChecked={operaIsChecked}
          websitesIsChecked={websitesIsChecked}
          handleChange={this.handleFilterClick}
        />

        <Projects
          projects={visibleProjects}
          // operaIsChecked={operaIsChecked}
          // websitesIsChecked={websitesIsChecked}
        />

        {!allLoaded && <LoadMoreProjects handleLoadMore={this.handleLoadMore} />}
      </section>
    )
  }
}

/* 
 *
 * Load More Projects
 * 
 */

const LoadMoreProjects = ({ handleLoadMore }) => (
  <div className="container pt5">
    <button onClick={handleLoadMore} className="link">
      Load more projects
    </button>
  </div>
)

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
      <span className="checkbox-label">&nbsp;{category}</span>
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
// DOCS: https://greensock.com/docs/TweenMax
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
      TweenMax.fromTo(
        gsapTarget,
        1,
        {
          height: 0,
          autoAlpha: 0
        },
        {
          height: gsapTarget.offsetHeight,
          autoAlpha: 1,
          ease: `Power3.easeInOut`
        }
      )
    })
  }

  collapse = () => {
    const gsapTarget = this.details.current

    loadjs.ready(`gsap`, () => {
      // Collapse the section to 0
      TweenMax.to(gsapTarget, 1, {
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
    <h3 className="mb2 lh-solid f2 sm:f1 fw9 ttu">{title}</h3>
    <ul className="nb2">
      {tags.map((tag, index) => {
        return (
          <li
            key={`tag-${index}`}
            className="dib mr2 mb2 bg-green pv1 ph2 md:f4 fw4 ttl"
          >
            {tag}
          </li>
        )
      })}
    </ul>
  </div>
)

const HeaderIcon = ({ expanded }) => (
  <div
    aria-hidden="true"
    className={`dn md:db f1 fw9 animate${!expanded && ` o-0 group-hover:o-100`}`}
  >
    {expanded ? `-` : `+`}
  </div>
)

/* 
 *
 * Project Details
 * 
 */

const ProjectDetails = ({ project }) => (
  <div className="container pt4 lh-tall">
    <FeaturedImage image={project.image.childImageSharp.sizes} alt={project.alt} />

    {project.reviews && <Reviews reviews={project.reviews} />}
    {project.features && <Features features={project.features} />}
    {project.description && <Description description={project.description} />}
    {project.details && <Details details={project.details} />}

    <HyperLink href={project.link} className="link mv4 tc">
      View site →
    </HyperLink>
  </div>
)

const FeaturedImage = ({ image, alt }) => (
  <figure>
    <Img sizes={image} alt={alt} className="shadow-lg" />
    <figcaption className="o-50 pt1 f6">{alt}</figcaption>
  </figure>
)

const Reviews = ({ reviews }) =>
  reviews.map((review, index) => {
    return (
      <blockquote key={`review-${index}`} className="mt4 pv2">
        <div className="bw3 bt-0 br-0 bb-0 b--green pl3 measure">
          <p
            className="mb2 f3"
            dangerouslySetInnerHTML={{ __html: review.quotation }}
          />
          {review.link ? (
            <cite className="f4 fw7 fs-normal">
              <HyperLink href={review.link}>{review.source}</HyperLink>
            </cite>
          ) : (
            <cite className="f4 fw7 fs-normal">{review.source}</cite>
          )}
        </div>
      </blockquote>
    )
  })

const Features = ({ features }) => (
  <ul className="mt4">
    {features.map((feature, index) => {
      return (
        <li key={`feature-${index}`} dangerouslySetInnerHTML={{ __html: feature }} />
      )
    })}
  </ul>
)

const Description = ({ description }) => (
  <p className="mt4 measure" dangerouslySetInnerHTML={{ __html: description }} />
)

const Details = ({ details }) => (
  <div className="mt4">
    {details.map((detail, index) => {
      return (
        detail.name !== `Dates` && (
          <dl key={`detail-${index}`}>
            <dt className="dib fw7">{detail.name}:&nbsp;</dt>
            <dd className="dib">{detail.value}</dd>
          </dl>
        )
      )
    })}
  </div>
)

/* 
 *
 * Imports & Exports
 * 
 */

import React from 'react'
import loadjs from 'loadjs'

import HyperLink from '../components/HyperLink'
import Img from '../components/Img'

export default Work
