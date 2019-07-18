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
      <Image fluid={image} alt={alt} className="shadow-lg" />
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

import React, { Fragment } from 'react'
import Image from 'gatsby-image'

import Emoji from './Emoji'
import Link from './Link'

export default ProjectDetails
