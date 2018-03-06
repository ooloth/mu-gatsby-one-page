class Work extends React.Component {
  state = {
    projects: null,
    total: null,
    limit: 9,
    operaIsChecked: true,
    websitesIsChecked: true
  }

  componentDidMount = () => {
    // Merge the opera and website arrays (alternate categories)
    const mergedProjects = this.mergeProjectArrays()

    // Add a key to each project (to prevent unnecessary rerendering)
    const projectsWithKeys = mergedProjects.map(project => {
      project.key = shortid.generate()
      return project
    })

    // Wait to render projects until we have the merged version with keys
    this.setState({ projects: projectsWithKeys, total: projectsWithKeys.length })
  }

  mergeProjectArrays = () => {
    const array1 = this.props.websites
    const array2 = this.props.operas
    let combinedArray = []

    // General function for merging arrays in an alternating pattern
    for (let i = 0; i < 10000; i++) {
      if (array1[i] && array2[i]) combinedArray.push(array1[i], array2[i])
      else if (array1[i]) combinedArray.push(array1[i])
      else if (array2[i]) combinedArray.push(array2[i])
      else break
    }

    return combinedArray
  }

  handleFilterClick = event => {
    switch (event.target.value) {
      case `opera`:
        if (event.target.checked) this.setState({ operaIsChecked: true })
        else if (!this.state.websitesIsChecked)
          this.setState({ operaIsChecked: true, websitesIsChecked: true })
        else this.setState({ operaIsChecked: false })
        break

      case `websites`:
        if (event.target.checked) this.setState({ websitesIsChecked: true })
        else if (!this.state.operaIsChecked)
          this.setState({ operaIsChecked: true, websitesIsChecked: true })
        else this.setState({ websitesIsChecked: false })
        break
    }
  }

  handleLoadMore = () => {
    // Increment the number of projects shown (up to the total number of projects)
    if (this.state.limit < this.state.total) {
      if (this.state.limit + 5 > this.state.total) {
        this.setState({ limit: this.state.total })
      } else {
        this.setState({ limit: this.state.limit + 5 })
      }
    }
  }

  render() {
    const { projects, total, limit, operaIsChecked, websitesIsChecked } = this.state
    const allLoaded = limit < total ? false : true

    return (
      <section class="pv6">
        <div class="container mb4">
          {/* <h3 class="fw4">total: {total}</h3>
          <h3 class="fw4">limit: {limit}</h3>
          <h3 class="fw4">allLoaded: {allLoaded ? `true` : `false`}</h3>
          <h3 class="fw4">operaIsChecked: {operaIsChecked ? `true` : `false`}</h3>
          <h3 class="mb4 fw4">websitesIsChecked: {websitesIsChecked ? `true` : `false`}</h3> */}

          <Filters
            operaIsChecked={operaIsChecked}
            websitesIsChecked={websitesIsChecked}
            handleChange={this.handleFilterClick}
          />
        </div>
        {this.state.projects && (
          <Projects
            projects={projects}
            limit={limit}
            operaIsChecked={operaIsChecked}
            websitesIsChecked={websitesIsChecked}
          />
        )}
        {!allLoaded && (
          <div class="container pt5">
            <button onClick={this.handleLoadMore} class="link">
              Load more
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

import React from 'react'
import shortid from 'shortid'

// TODO: style these checkboxes
const Filters = ({ operaIsChecked, websitesIsChecked, handleChange }) => (
  <fieldset class="lh-solid f3 fw4 ttl">
    <legend class="sr-only">Choose which project types to show</legend>
    <label class="custom-checkbox mr4 animate cursor-pointer">
      <input
        type="checkbox"
        value="opera"
        onChange={event => handleChange(event)}
        checked={operaIsChecked}
        class="ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-3px`, width: `1.4rem`, height: `1.4rem` }}
      />
      <span
        class="checkmark ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-8px`, width: `1.4rem`, height: `1.4rem` }}
      />
      <span class="checkbox-label">&nbsp;Opera</span>
    </label>
    <label class="custom-checkbox animate cursor-pointer">
      <input
        type="checkbox"
        value="websites"
        onClick={event => handleChange(event)}
        checked={websitesIsChecked}
        class="ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-3px`, width: `1.4rem`, height: `1.4rem` }}
      />
      <span
        class="checkmark ba bw2 b--green cursor-pointer"
        style={{ marginBottom: `-3px`, width: `1.4rem`, height: `1.4rem` }}
      />
      <span class="checkbox-label">&nbsp;Websites</span>
    </label>
  </fieldset>
)

/* 
 *
 * Projects
 * 
 */

const Projects = ({ projects, limit, operaIsChecked, websitesIsChecked }) => {
  // Reduce project list to the active category
  const projectsInActiveCategory = projects.filter(project => {
    if (operaIsChecked && websitesIsChecked) return project
    else if (operaIsChecked) return project.node.category === `Opera`
    else if (websitesIsChecked) return project.node.category === `Website`
    else console.error(`Error in projectsInActiveCategory calculation in <Projects />`)
  })

  return (
    <ul>
      {/* Reduce visible projects to the current limit */}
      {projectsInActiveCategory.slice(0, limit).map(project => {
        return (
          <li key={project.key}>
            <Project project={project.node} />
          </li>
        )
      })}
    </ul>
  )
}

/* 
 *
 * Project
 * 
 */

// DOCS: https://github.com/muicss/loadjs#documentation
// DOCS: https://greensock.com/docs/TweenMax
// Forum: https://greensock.com/forums/topic/15749-gsap-with-create-react-app/

import loadjs from 'loadjs'

// TODO: extract expand/collapse functionality into a "Collapse" component

// TODO: add tags for "Opera", "Website", "Design & Development", "Development", "Cover", "Mainstage", etc? Or only list the detailed ones inside the details (maybe as a row of tags at the bottom...)

class Project extends React.Component {
  state = { expanded: false }

  componentDidMount = () => {
    // console.log(`pk2`, this.props)
    if (!loadjs.isDefined('gsap')) {
      loadjs('https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js', 'gsap')
    }
  }

  handleClick = () => {
    if (this.state.expanded) {
      this.setState({ expanded: false })
      this.collapse()
    } else {
      this.setState({ expanded: true })
      this.expand()
    }
  }

  expand = () => {
    loadjs.ready('gsap', () => {
      // Invalidate the temporary inline styles (which match the starting state for the animation and are added to prevent a flash of content in the ending position)
      this.item.style = null

      const expand = TweenMax.to(this.item, 1, {
        height: this.item.offsetHeight,
        autoAlpha: 1,
        ease: Power4.easeInOut
      })

      // Store tween in DOM node
      this.item.animation = expand
    })
  }

  collapse = () => {
    loadjs.ready('gsap', () => this.item.animation.reverse())
  }

  render() {
    return (
      <div
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
        onKeyUp={e => e.key === 'Enter' && this.handleClick()}
        class="relative cursor-pointer"
      >
        <span class="sr-only">Click to see project details</span>
        <div class="pv4 hover:bg-near-white animate">
          <ProjectHeader project={this.props.project} expanded={this.state.expanded} />
          <div
            ref={el => (this.item = el)}
            class="relative z-2 overflow-hidden"
            style={{ height: 0 }}
          >
            <ProjectDetails project={this.props.project} />
          </div>
        </div>
      </div>
    )
  }
}

/* 
 *
 * Project Header
 * 
 */

const ProjectHeader = ({ project, expanded }) => (
  <div class="group flex justify-between items-baseline container pv2">
    <div>
      <h3 class="mb2 lh-solid f2 sm:f1 fw9 ttu">{project.title}</h3>
      <ul>
        {project.tags.map(tag => {
          return (
            <li key={shortid()} class="dib mr2 bg-green pv1 ph2 md:f4 fw4 ttl">
              {tag}
            </li>
          )
        })}
      </ul>
    </div>

    {!expanded && (
      <div aria-hidden="true" class="dn md:db o-0 group-hover:o-100 f1 fw9 animate">
        +
      </div>
    )}
    {expanded && (
      <div aria-hidden="true" class="dn md:db f1 fw9 animate">
        -
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
  <div class="container pt4 lh-tall">
    <div
      class="mb4 "
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr)`,
        gridGap: `1rem`
      }}
    >
      {/* Remove the "images" loop? */}
      {project.images ? (
        project.images.map(photo => {
          return (
            <Img
              key={shortid()}
              sizes={photo.image.childImageSharp.sizes}
              alt={photo.alt}
              critical={true}
              className="shadow-lg"
            />
          )
        })
      ) : (
        <figure>
          <Img
            sizes={project.image.childImageSharp.sizes}
            alt={project.alt}
            critical={true}
            className="shadow-lg"
          />
          <figcaption class="o-50 pt1 f6">{project.alt}</figcaption>
        </figure>
      )}
    </div>

    {project.reviews &&
      project.reviews.map(review => {
        return (
          <blockquote key={shortid()} class="pv1">
            <div class="bw3 bt-0 br-0 bb-0 b--green pl3 measure">
              <p class="mb2 f3">{review.quotation}</p>
              {review.link ? (
                <cite class="f4 fw7 fs-normal">
                  <HyperLink href={review.link} className="">
                    {review.source}
                  </HyperLink>
                </cite>
              ) : (
                <cite class="">&mdash; {review.source}</cite>
              )}
            </div>
          </blockquote>
        )
      })}

    <p class="mb4 measure">{project.description}</p>

    <div class="mb4 ">
      {project.details &&
        project.details.map(detail => {
          return (
            detail.name !== `Dates` && (
              <dl key={shortid()}>
                <dt class="dib fw7">{detail.name}:&nbsp;</dt>
                <dd class="dib">{detail.value}</dd>
              </dl>
            )
          )
        })}
    </div>

    <HyperLink href={project.link} className="link mb4 tc">
      View site →
    </HyperLink>
  </div>
)
