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

import React from 'react'

export default Filters
