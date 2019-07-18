export const onInitialClientRender = () => {
  // GSAP for site-wide animations
  if (!loadjs.isDefined(`gsap`)) {
    loadjs(
      [
        `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenLite.min.js`,
        `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/plugins/CSSPlugin.min.js`
      ],
      `gsap`
    )
  }

  // A11Y: Detect keyboard vs. mouse vs. touch input (for focus styling)
  if (!loadjs.isDefined(`what-input`)) {
    loadjs(
      `https://cdnjs.cloudflare.com/ajax/libs/what-input/5.0.5/what-input.min.js`,
      `what-input`
    )
  }
}

///////////////////////////////////////////////////////////////////////////////////

import loadjs from 'loadjs'
