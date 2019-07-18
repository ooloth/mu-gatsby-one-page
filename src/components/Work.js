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
        <SeeMore
          operaIsChecked={operaIsChecked}
          websitesIsChecked={websitesIsChecked}
          handleLoadMore={handleLoadMore}
        />
      )}
    </section>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react'

import Filters from './Filters'
import Projects from './Projects'
import SeeMore from './SeeMore'

export default Work
