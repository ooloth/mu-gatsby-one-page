class Work extends React.Component {
  state = {
    limit: 5,
    operaIsChecked: true,
    websitesIsChecked: true
  }

  handleFilterClick = event => {
    let filters = {}

    switch (event.target.value) {
      case `opera`:
        if (event.target.checked) filters = { operaIsChecked: true }
        else if (!this.state.websitesIsChecked)
          filters = { operaIsChecked: true, websitesIsChecked: true }
        else filters = { operaIsChecked: false }
        break

      case `websites`:
        if (event.target.checked) filters = { websitesIsChecked: true }
        else if (!this.state.operaIsChecked)
          filters = { operaIsChecked: true, websitesIsChecked: true }
        else filters = { websitesIsChecked: false }
        break
    }

    this.setState({ ...filters, limit: 5 })
  }

  handleLoadMore = () => {
    const total = this.props.projects.length

    // Increment the number of projects shown (up to the total number of projects)
    if (this.state.limit < total) {
      if (this.state.limit + 5 > total) {
        this.setState({ limit: total })
      } else {
        this.setState({ limit: this.state.limit + 5 })
      }
    }
  }

  render() {
    const { limit, operaIsChecked, websitesIsChecked } = this.state
    const { projects } = this.props
    const total = projects.length
    // const allLoaded = limit < total ? false : true

    // Reduce project list to the active category
    const projectsInActiveCategory = projects.filter(project => {
      if (operaIsChecked && websitesIsChecked) return project
      else if (operaIsChecked) return project.node.category === `Opera`
      else if (websitesIsChecked) return project.node.category === `Website`
      else console.error(`Error in projectsInActiveCategory calculation in <Work />`)
    })

    const allLoaded = limit < projectsInActiveCategory.length ? false : true

    return (
      <section className="pv6">
        <h2 className="sr-only">Opera and Website Projects</h2>

        <Filters
          operaIsChecked={operaIsChecked}
          websitesIsChecked={websitesIsChecked}
          handleChange={this.handleFilterClick}
        />

        <Projects
          // Reduce number of projects shown to the current limit
          projects={projectsInActiveCategory.slice(0, limit)}
          operaIsChecked={operaIsChecked}
          websitesIsChecked={websitesIsChecked}
        />

        {!allLoaded && (
          <div className="container pt5">
            <button onClick={this.handleLoadMore} className="link">
              Load more projects
            </button>
          </div>
        )}
      </section>
    )
  }
}

export default Work

/* 
 *
 * General
 * 
 */

import React, { Fragment } from 'react'
import shortid from 'shortid'

/*
 *
 * Filters
 * 
 */

const Filters = ({ operaIsChecked, websitesIsChecked, handleChange }) => (
  <fieldset className="container mb4 lh-solid f3 fw4 ttl">
    <legend className="sr-only">Choose which project types to show</legend>

    <label htmlFor="opera" className="custom-checkbox mr4 animate cursor-pointer">
      <input
        id="opera"
        type="checkbox"
        value="opera"
        onChange={event => handleChange(event)}
        checked={operaIsChecked}
        className="ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-3px`, width: `1.4rem`, height: `1.4rem` }}
      />
      <span
        className="checkmark ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-8px`, width: `1.4rem`, height: `1.4rem` }}
      />
      <span className="checkbox-label">&nbsp;Opera</span>
    </label>

    <label htmlFor="websites" className="custom-checkbox animate cursor-pointer">
      <input
        id="websites"
        type="checkbox"
        value="websites"
        onChange={event => handleChange(event)}
        checked={websitesIsChecked}
        className="ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-3px`, width: `1.4rem`, height: `1.4rem` }}
      />
      <span
        className="checkmark ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-3px`, width: `1.4rem`, height: `1.4rem` }}
      />
      <span className="checkbox-label">&nbsp;Websites</span>
    </label>
  </fieldset>
)

/* 
 *
 * Projects
 * 
 */

const Projects = ({ projects, operaIsChecked, websitesIsChecked }) => (
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

import loadjs from 'loadjs'

class Project extends React.Component {
  state = { expanded: false }

  componentDidMount = () => {
    if (!loadjs.isDefined('gsap')) {
      loadjs('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js', 'gsap')
    }
  }

  handleClick = () => (this.state.expanded ? this.collapse() : this.expand())

  expand = () => {
    loadjs.ready('gsap', () => {
      // When expanding, set this immediately
      this.setState({ expanded: true })

      // Invalidate the temporary inline styles (which match the starting state for the animation and are added to prevent a flash of content in the ending position)
      this.item.removeAttribute('style')

      // Expand the section to its natural height
      TweenMax.fromTo(
        this.item,
        1,
        {
          height: 0,
          autoAlpha: 0
        },
        {
          height: this.item.offsetHeight,
          autoAlpha: 1,
          ease: Power3.easeInOut
        }
      )
    })
  }

  collapse = () => {
    loadjs.ready('gsap', () => {
      // Collapse the section to 0
      TweenMax.to(this.item, 1, {
        height: 0,
        autoAlpha: 0,
        ease: Power3.easeInOut,
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
        onKeyUp={e => e.key === 'Enter' && this.handleClick()}
        className="relative cursor-pointer"
      >
        <span className="sr-only">Click to see project details</span>
        <div className="pv4 hover:bg-near-white animate">
          <ProjectHeader project={project} expanded={expanded} />
          <div
            ref={el => (this.item = el)}
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

const ProjectHeader = ({ project, expanded }) => (
  <div className="group flex justify-between items-baseline container pv2">
    <div>
      <h3 className="mb2 lh-solid f2 sm:f1 fw9 ttu">{project.title}</h3>
      <ul className="nb2">
        {project.tags.map(tag => {
          return (
            <li key={shortid()} className="dib mr2 mb2 bg-green pv1 ph2 md:f4 fw4 ttl">
              {tag}
            </li>
          )
        })}
      </ul>
    </div>

    {expanded ? (
      <div aria-hidden="true" className="dn md:db f1 fw9 animate">
        -
      </div>
    ) : (
      <div aria-hidden="true" className="dn md:db o-0 group-hover:o-100 f1 fw9 animate">
        +
      </div>
    )}
  </div>
)

/* 
 *
 * Project Details
 * 
 */

import HyperLink from '../components/HyperLink'
import Img from '../components/Img'

const ProjectDetails = ({ project }) => (
  <div className="container pt4 lh-tall">
    {/* <div> */}
    {/* <div
      className="mb4 "
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr)`,
        gridGap: `1rem`
      }}
    > */}
    {/* Remove the "images" loop? */}
    {project.images ? (
      <ul
        className=""
        style={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr)`,
          gridGap: `1rem`
        }}
      >
        {project.images.map(photo => {
          return (
            <li>
              <Img
                key={shortid()}
                sizes={photo.image.childImageSharp.sizes}
                alt={photo.alt}
                critical={true}
                className="shadow-lg"
              />
            </li>
          )
        })}
      </ul>
    ) : (
      <figure role="group">
        <Img
          sizes={project.image.childImageSharp.sizes}
          alt={project.alt}
          critical={true}
          className="shadow-lg"
        />
        <figcaption className="o-50 pt1 f6">{project.alt}</figcaption>
      </figure>
    )}
    {/* </div> */}

    {project.reviews &&
      project.reviews.map(review => {
        return (
          <blockquote key={shortid()} className="mt4 pv2">
            <div className="bw3 bt-0 br-0 bb-0 b--green pl3 measure">
              <p className="mb2 f3">{review.quotation}</p>
              {review.link ? (
                <cite className="f4 fw7 fs-normal">
                  <HyperLink href={review.link} className="">
                    {review.source}
                  </HyperLink>
                </cite>
              ) : (
                <cite className="f4 fw7 fs-normal">{review.source}</cite>
              )}
            </div>
          </blockquote>
        )
      })}

    <p className="mt4 measure">{project.description}</p>

    <div className="mt4">
      {project.details &&
        project.details.map(detail => {
          return (
            detail.name !== `Dates` && (
              <dl key={shortid()}>
                <dt className="dib fw7">{detail.name}:&nbsp;</dt>
                <dd className="dib">{detail.value}</dd>
              </dl>
            )
          )
        })}
    </div>

    <HyperLink href={project.link} className="link mv4 tc">
      View site →
    </HyperLink>
  </div>
)
