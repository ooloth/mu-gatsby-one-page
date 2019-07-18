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

import React from 'react'

export default ProjectHeader
