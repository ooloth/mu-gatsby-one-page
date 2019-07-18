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

import React from 'react'

import Project from './Project'

export default Projects
