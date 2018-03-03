// TODO: run site through my full checklist...

const TestPage = ({ data }) => (
  <main>
    <Hero />
    <Work projects={data.allProjectsJson.edges} />
    <Contact />
  </main>
)

export default TestPage

/* 
 *
 * General
 * 
 */

import React from 'react'
import shortid from 'shortid'

/* 
 *
 * Hero
 * 
 */

// TODO: extract data

const Hero = () => (
  <section class="bg-near-white pv6">
    <div class="container">
      <p
        class="mb4 sm:mb3 lh-solid f-5 sm:f-7 md:f-10 fw9 ttu"
        style={{ marginLeft: `-.25rem` }}
      >
        Hello<span class="green">.</span>
      </p>
      <h1 class="mb4 measure-narrow lh-copy f4 sm:f3 fw4" style={{ maxWidth: `34ch` }}>
        I'm Michael Uloth, an opera singer and web developer based in Toronto.
      </h1>
      <p class="flex lh-copy f4">
        See my recent work below.<span class="f3">👇</span>
      </p>
    </div>
  </section>
)

/* 
 *
 * Work
 * 
 */

// TODO: enabling filtering by "Opera" vs. "Website"

class Work extends React.Component {
  state = { operaIsChecked: true, websitesIsChecked: true }

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

  render() {
    let filteredProjects
    if (this.state.operaIsChecked && this.state.websitesIsChecked) {
      filteredProjects = this.props.projects
    } else if (this.state.operaIsChecked && !this.state.websitesIsChecked) {
      filteredProjects = this.props.projects.filter(project => {
        return project.node.category === 'Opera' || project.node.category === 'opera'
      })
    } else if (!this.state.operaIsChecked && this.state.websitesIsChecked) {
      filteredProjects = this.props.projects.filter(project => {
        return project.node.category === 'Website' || project.node.category === 'website'
      })
    } else {
      console.log('Something weird in the render method of <Work />...')
    }

    return (
      <section class="pv6">
        <div class="container mb4">
          {/* <h2
            class="mb2 f-4 sm:f-5 md:f-6 fw9 ttu"
            style={{
              marginLeft: `-.25rem`
            }}
          >
            Work<span class="green">.</span>
          </h2> */}
          <Filters
            operaIsChecked={this.state.operaIsChecked}
            websitesIsChecked={this.state.websitesIsChecked}
            handleChange={this.handleFilterClick}
          />
        </div>
        <Projects projects={filteredProjects} />
      </section>
    )
  }
}

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

class Projects extends React.Component {
  state = { limit: 3, total: this.props.projects.length, allLoaded: false }

  handleClick = () => {
    if (this.state.limit < this.state.total) {
      if (this.state.limit + 3 < this.state.total) {
        this.setState({ limit: this.state.limit + 3 })
      } else if (this.state.limit + 3 === this.state.total) {
        this.setState({ limit: this.state.limit + 3, allLoaded: true })
      } else {
        this.setState({ limit: this.state.total, allLoaded: true })
      }
    }
  }

  render() {
    const visibleProjects = this.props.projects.filter((project, index) => {
      if (index < this.state.limit) return project
    })

    return (
      <div>
        <ul>
          {visibleProjects.map(project => {
            return <Project key={shortid()} project={project.node} />
          })}
        </ul>
        {!this.state.allLoaded && (
          <div class="container pt5">
            <button onClick={this.handleClick} class="link">
              Load more
            </button>
          </div>
        )}
      </div>
    )
  }
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
      <li
        key={this.props.key}
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
        onKeyUp={e => e.key === 'Enter' && this.handleClick()}
        class="relative cursor-pointer"
      >
        <span class="sr-only">Click to see project details</span>
        <div class="pv4 hover:bg-near-white animate">
          <ProjectHeader project={this.props.project} />
          <div
            ref={el => (this.item = el)}
            class="relative z-2 overflow-hidden"
            style={{ height: 0 }}
          >
            <ProjectDetails project={this.props.project} />
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

const ProjectHeader = ({ project }) => (
  <div class="group flex justify-between items-center container pv2">
    <div>
      <h3 class="mb2 lh-solid f2 sm:f1 fw9 ttu">{project.title}</h3>
      <ul>
        <li class="dib mr2 bg-green pv1 ph2 md:f4 fw4 ttl">{project.category}</li>
        {project.tags.map(tag => {
          return (
            <li key={shortid()} class="dib mr2 bg-green pv1 ph2 md:f4 fw4 ttl">
              {tag}
            </li>
          )
        })}
      </ul>
    </div>
    <div aria-hidden="true" class="dn md:db o-0 group-hover:o-100 f1 animate">
      🕵️‍♀️
    </div>
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

/* 
 *
 * Contact
 * 
 */

import FaTwitter from 'react-icons/lib/fa/twitter'
import FaGithub from 'react-icons/lib/fa/github'
import FaLinkedin from 'react-icons/lib/fa/linkedin'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o'

const Contact = () => (
  <section class="bg-near-white pt6 pb3">
    <div class="container ">
      <h2
        class="mb4 lh-solid f-3p5 sm:f-5 md:f-6 fw9 ttu"
        style={{
          marginLeft: `-.25rem`
        }}
      >
        Contact<span class="green">.</span>
      </h2>

      <p class="mb4 pb3 measure-narrow lh-copy f4 sm:f3 fw4" style={{ maxWidth: `32ch` }}>
        Want to work together? Tell me about your project! 👋
      </p>

      <div class="sm:flex sm:mb6">
        <HyperLink href="mailto:hello@michaeluloth.com" className="link dib mr3 mb4 sm:mb0">
          Email me
        </HyperLink>
        <ul class="mb6 sm:mb0">
          {links.map(link => {
            return (
              <li key={shortid()} className="dib mr3 f3">
                <HyperLink href={link.url} className={`icon`}>
                  {link.icon}
                </HyperLink>
              </li>
            )
          })}
        </ul>
      </div>
      <Copyright />
    </div>
  </section>
)

const links = [
  {
    icon: <FaFacebook className="" style={{ width: `1.608rem`, height: `1.5rem` }} />,
    url: 'https://www.facebook.com/michaeluloth'
  },
  {
    icon: <FaTwitter className="" style={{ width: `1.608rem`, height: `1.5rem` }} />,
    url: 'https://twitter.com/ooloth'
  },
  {
    icon: <FaLinkedin className="" style={{ width: `1.608rem`, height: `1.5rem` }} />,
    url: 'https://www.linkedin.com/in/michael-uloth-848a1b98/'
  },
  {
    icon: <FaGithub className="" style={{ width: `1.608rem`, height: `1.5rem` }} />,
    url: 'https://github.com/ooloth'
  }
]

/* 
 *
 * Copyright
 * 
 */

const Copyright = () => (
  <p className="f6 sm:f5">&copy; {new Date().getFullYear()} Michael Uloth</p>
)

// TODO: update starter with this type of full-page query in pages/index.js
export const query = graphql`
  query TestPageQuery {
    allProjectsJson {
      edges {
        node {
          image {
            childImageSharp {
              sizes(maxWidth: 940) {
                ...GatsbyImageSharpSizes_withWebp
              }
            }
          }
          alt
          title
          category
          tags
          description
          reviews {
            quotation
            source
            link
          }
          details {
            name
            value
          }
          link
        }
      }
    }
  }
`
