/*
Tailwind - The Utility-First CSS Framework
A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).
Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.
View the full documentation at https://tailwindcss.com.
|-------------------------------------------------------------------------------
| The default config
|-------------------------------------------------------------------------------
|
| This variable contains the default Tailwind config. You don't have
| to use it, but it can sometimes be helpful to have available. For
| example, you may choose to merge your custom configuration
| values with some of the Tailwind defaults.
|
*/

// let defaultConfig = require('tailwindcss/defaultConfig')()

/*
|-------------------------------------------------------------------------------
| Colors                                    https://tailwindcss.com/docs/colors
|-------------------------------------------------------------------------------
|
| Here you can specify the colors used in your project. To get you started,
| we've provided a generous palette of great looking colors that are perfect
| for prototyping, but don't hesitate to change them for your project. You
| own these colors, nothing will break if you change everything about them.
|
| We've used literal color names ("red", "blue", etc.) for the default
| palette, but if you'd rather use functional names like "primary" and
| "secondary", or even a numeric scale like "100" and "200", go for it.
|
*/

let colors = {
  transparent: 'transparent',

  black: '#000',
  'near-black': '#111',
  'dark-gray': '#333',
  'mid-gray': '#555',
  gray: '#777',
  silver: '#999',
  'light-silver': '#aaa',
  'moon-gray': '#ccc',
  'light-gray': '#eee',
  'near-white': '#f4f4f4',
  white: '#fff',

  'black-90': 'rgba(0,0,0,.9)',
  'black-80': 'rgba(0,0,0,.8)',
  'black-70': 'rgba(0,0,0,.7)',
  'black-60': 'rgba(0,0,0,.6)',
  'black-50': 'rgba(0,0,0,.5)',
  'black-40': 'rgba(0,0,0,.4)',
  'black-30': 'rgba(0,0,0,.3)',
  'black-20': 'rgba(0,0,0,.2)',
  'black-10': 'rgba(0,0,0,.1)',
  'black-05': 'rgba(0,0,0,.05)',
  'black-025': 'rgba(0,0,0,.025)',
  'black-0125': 'rgba(0,0,0,.0125)',

  'white-90': 'rgba(255,255,255,.9)',
  'white-80': 'rgba(255,255,255,.8)',
  'white-70': 'rgba(255,255,255,.7)',
  'white-60': 'rgba(255,255,255,.6)',
  'white-50': 'rgba(255,255,255,.5)',
  'white-40': 'rgba(255,255,255,.4)',
  'white-30': 'rgba(255,255,255,.3)',
  'white-20': 'rgba(255,255,255,.2)',
  'white-10': 'rgba(255,255,255,.1)',
  'white-05': 'rgba(255,255,255,.05)',
  'white-025': 'rgba(255,255,255,.025)',
  'white-0125': 'rgba(255,255,255,.0125)',

  'dark-red': '#e7040f',
  red: '#ff4136',
  'light-red': '#ff725c',
  orange: '#ff6300',
  gold: '#ffb700',
  yellow: '#ffd700',
  'light-yellow': '#fbf1a9',
  purple: '#5e2ca5',
  'light-purple': '#a463f2',
  'dark-pink': '#d5008f',
  'hot-pink': '#ff41b4',
  pink: '#ff80cc',
  'light-pink': '#ffa3d7',
  'dark-green': '#137752',
  green: '#19a974',
  'light-green': '#9eebcf',
  navy: '#001b44',
  'dark-blue': '#00449e',
  blue: '#357edd',
  'light-blue': '#96ccff',
  'lightest-blue': '#cdecff',
  'washed-blue': '#f6fffe',
  'washed-green': '#e8fdf5',
  'washed-yellow': '#fffceb',
  'washed-red': '#ffdfdf'
}

module.exports = {
  library: 'tachyons',

  /*
  |-----------------------------------------------------------------------------
  | Colors                                  https://tailwindcss.com/docs/colors
  |-----------------------------------------------------------------------------
  |
  | The color palette defined above is also assigned to the "colors" key of
  | your Tailwind config. This makes it easy to access them in your CSS
  | using Tailwind's config helper. For example:
  |
  | .error { color: config('colors.red') }
  |
  */

  colors: colors,

  /*
  |-----------------------------------------------------------------------------
  | Screens                      https://tailwindcss.com/docs/responsive-design
  |-----------------------------------------------------------------------------
  |
  | Screens in Tailwind are translated to CSS media queries. They define the
  | responsive breakpoints for your project. By default Tailwind takes a
  | "mobile first" approach, where each screen size represents a minimum
  | viewport width. Feel free to have as few or as many screens as you
  | want, naming them in whatever way you'd prefer for your project.
  |
  | Tailwind also allows for more complex screen definitions, which can be
  | useful in certain situations. Be sure to see the full responsive
  | documentation for a complete list of options.
  |
  | Class name: .{screen}:{utility}
  |
  */

  screens: {
    sm: '36em',
    md: '48em',
    lg: '62em',
    xl: '75em'
  },

  /*
  |-----------------------------------------------------------------------------
  | Fonts                                    https://tailwindcss.com/docs/fonts
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your project's font stack, or font families.
  | Keep in mind that Tailwind doesn't actually load any fonts for you.
  | If you're using custom fonts you'll need to import them prior to
  | defining them here.
  |
  | By default we provide a native font stack that works remarkably well on
  | any device or OS you're using, since it just uses the default fonts
  | provided by the platform.
  |
  | Class name: .font-{name}
  |
  */

  fonts: {
    'sans-serif': [
      `system-ui`,
      `BlinkMacSystemFont`,
      `-apple-system`,
      `Segoe UI`,
      `Roboto`,
      `Oxygen`,
      `Ubuntu`,
      `Cantarell`,
      `Fira Sans`,
      `Droid Sans`,
      `Helvetica Neue`,
      `sans-serif`
    ],
    serif: ['georgia', 'times', 'serif'],
    'system-sans-serif': ['sans-serif'],
    'system-serif': ['serif'],
    code: ['Consolas', 'monaco', 'monospace'],
    courier: ['Courier Next', 'courier', 'monospace'],
    helvetica: ['helvetica neue', 'helvetica', 'sans-serif'],
    avenir: ['avenir next', 'avenir', 'sans-serif'],
    athelas: ['athelas', 'georgia', 'serif'],
    georgia: ['georgia', 'serif'],
    times: ['times', 'serif'],
    bodoni: ['Bodoni MT', 'serif'],
    calisto: ['Calisto MT', 'serif'],
    garamond: ['garamond', 'serif'],
    baskerville: ['baskerville', 'serif']
  },

  /*
  |-----------------------------------------------------------------------------
  | Text sizes                         https://tailwindcss.com/docs/text-sizing
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your text sizes. Name these in whatever way
  | makes the most sense to you. We use size names by default, but
  | you're welcome to use a numeric scale or even something else
  | entirely.
  |
  | By default Tailwind uses the "rem" unit type for most measurements.
  | This allows you to set a root font size which all other sizes are
  | then based on. That said, you are free to use whatever units you
  | prefer, be it rems, ems, pixels or other.
  |
  | Class name: .text-{size}
  |
  */
  textSizes: {
    '7': '.75rem',
    '6': '.875rem',
    '5': '1rem',
    '4': '1.25rem',
    '3': '1.5rem',
    '2': '2.25rem',
    '1': '3rem',
    '-subheadline': '5rem',
    '-headline': '6rem',
    '-5': '5rem',
    '-6': '6rem'
  },

  /*
  |-----------------------------------------------------------------------------
  | Font weights                       https://tailwindcss.com/docs/font-weight
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your font weights. We've provided a list of
  | common font weight names with their respective numeric scale values
  | to get you started. It's unlikely that your project will require
  | all of these, so we recommend removing those you don't need.
  |
  | Class name: .font-{weight}
  |
  */

  fontWeights: {
    '1': 100,
    '2': 200,
    '3': 300,
    '4': 400,
    '5': 500,
    '6': 600,
    '7': 700,
    '8': 800,
    '9': 900
  },

  /*
  |-----------------------------------------------------------------------------
  | Leading (line height)              https://tailwindcss.com/docs/line-height
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your line height values, or as we call
  | them in Tailwind, leadings.
  |
  | Class name: .leading-{size}
  |
  */

  leading: {
    none: 0,
    solid: 1,
    title: 1.25,
    copy: 1.5,
    loose: 2
  },

  /*
  |-----------------------------------------------------------------------------
  | Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your letter spacing values, or as we call
  | them in Tailwind, tracking.
  |
  | Class name: .tracking-{size}
  |
  */

  tracking: {
    tight: '-.05em',
    normal: '.1em',
    mega: '.25em'
  },

  /*
  |-----------------------------------------------------------------------------
  | Text colors                         https://tailwindcss.com/docs/text-color
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your text colors. By default these use the
  | color palette we defined above, however you're welcome to set these
  | independently if that makes sense for your project.
  |
  | Class name: .text-{color}
  |
  */
  textColors: colors,

  /*
  |-----------------------------------------------------------------------------
  | Typography               https://github.com/tachyons-css/tachyons-typography
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your text colors. By default these use the
  | color palette we defined above, however you're welcome to set these
  | independently if that makes sense for your project.
  |
  | Class name: .text-{color}
  |
  */

  typography: {
    measure: '30em',
    measureWide: '34em',
    measureNarrow: '20em',
    indent: '1em'
  },

  /*
  |-----------------------------------------------------------------------------
  | Background colors             https://tailwindcss.com/docs/background-color
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your background colors. By default these use
  | the color palette we defined above, however you're welcome to set
  | these independently if that makes sense for your project.
  |
  | Class name: .bg-{color}
  |
  */

  backgroundColors: Object.assign({ inherit: 'inherit' }, colors),

  /*
  |-----------------------------------------------------------------------------
  | Background with Foreground colors
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your background and contrasting foreground
  | colors.
  |
  | Class name: .bfg-{color}
  |
  */

  backgroundForegroundColors: {
    black: ['#111', '#f4f4f4'],
    white: ['#f4f4f4', '#111']
  },

  /*
  |-----------------------------------------------------------------------------
  | Rotate
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your element rotation.
  | Class name: .rotate{-value}
  |
  */

  rotate: {
    '45': '45deg',
    '90': '90deg',
    '135': '135deg',
    '180': '180deg',
    '225': '225deg',
    '270': '270deg',
    '315': '315deg'
  },

  /*
  |-----------------------------------------------------------------------------
  | Border widths                     https://tailwindcss.com/docs/border-width
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your border widths. Take note that border
  | widths require a special "default" value set as well. This is the
  | width that will be used when you do not specify a border width.
  |
  | Class name: .border{-side?}{-width?}
  |
  */

  borderWidths: {
    default: '1px',
    '0': '0',
    '1': '.125rem',
    '2': '.25rem',
    '3': '.5rem',
    '4': '1rem',
    '5': '2rem'
  },

  /*
  |-----------------------------------------------------------------------------
  | Border colors                     https://tailwindcss.com/docs/border-color
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your border colors. By default these use the
  | color palette we defined above, however you're welcome to set these
  | independently if that makes sense for your project.
  |
  | Take note that border colors require a special "default" value set
  | as well. This is the color that will be used when you do not
  | specify a border color.
  |
  | Class name: .border-{color}
  |
  */

  borderColors: Object.assign(
    {
      default: colors['grey-light'],
      inherit: 'inherit'
    },
    colors
  ),

  /*
  |-----------------------------------------------------------------------------
  | Border radius                    https://tailwindcss.com/docs/border-radius
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your border radius values. If a `default` radius
  | is provided, it will be made available as the non-suffixed `.rounded`
  | utility.
  |
  | If your scale includes a `0` value to reset already rounded corners, it's
  | a good idea to put it first so other values are able to override it.
  |
  | Class name: .rounded{-side?}{-size?}
  |
  */

  borderRadius: {
    default: '.125rem',
    '0': '0',
    '1': '.125rem',
    '2': '.25rem',
    '3': '.5rem',
    '4': '1rem',
    '-100': '100%',
    '-pill': '9999px'
  },

  /*
  |-----------------------------------------------------------------------------
  | Width                                    https://tailwindcss.com/docs/width
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your width utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default
  | we provide a sensible rem based numeric scale, a percentage
  | based fraction scale, plus some other common use-cases. You
  | can, of course, modify these values as needed.
  |
  |
  | It's also worth mentioning that Tailwind automatically escapes
  | invalid CSS class name characters, which allows you to have
  | awesome classes like .w-2/3.
  |
  | Class name: .w-{size}
  |
  */

  width: {
    '-auto': 'auto',
    '-px': '1px',
    '1': '1rem',
    '2': '2rem',
    '3': '4rem',
    '4': '8rem',
    '5': '16rem',
    '-10': '10%',
    '-20': '20%',
    '-25': '25%',
    '-30': '30%',
    '-33': '33%',
    '-34': '34%',
    '-40': '40%',
    '-50': '50%',
    '-60': '60%',
    '-70': '70%',
    '-75': '75%',
    '-80': '80%',
    '-90': '90%',
    '-100': '100%',
    '-third': 'calc(100% / 3)',
    '-two-thirds': 'calc(100% / 1.5)',
    '-screen': '100vw'
  },

  /*
  |-----------------------------------------------------------------------------
  | Height                                  https://tailwindcss.com/docs/height
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your height utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default
  | we provide a sensible rem based numeric scale plus some other
  | common use-cases. You can, of course, modify these values as
  | needed.
  |
  | Class name: .h-{size}
  |
  */

  height: {
    '-auto': 'auto',
    '-inherit': 'inherit',
    '-px': '1px',
    '1': '1rem',
    '2': '2rem',
    '3': '4rem',
    '4': '8rem',
    '5': '16rem',
    '-25': '25%',
    '-50': '50%',
    '-75': '75%',
    '-100': '100%',
    'vh-25': '25vh',
    'vh-50': '50vh',
    'vh-75': '75vh',
    'vh-100': '100vh'
  },

  /*
  |-----------------------------------------------------------------------------
  | Minimum width                        https://tailwindcss.com/docs/min-width
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your minimum width utility sizes. These can
  | be percentage based, pixels, rems, or any other units. We provide a
  | couple common use-cases by default. You can, of course, modify
  | these values as needed.
  |
  | Class name: .min-w-{size}
  |
  */

  minWidth: {
    '0': '0',
    full: '100%'
  },

  /*
  |-----------------------------------------------------------------------------
  | Minimum height                      https://tailwindcss.com/docs/min-height
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your minimum height utility sizes. These can
  | be percentage based, pixels, rems, or any other units. We provide a
  | few common use-cases by default. You can, of course, modify these
  | values as needed.
  |
  | Class name: .min-h-{size}
  |
  */

  minHeight: {
    '0': '0',
    '100': '100%',
    vh100: '100vh'
  },

  /*
  |-----------------------------------------------------------------------------
  | Maximum width                        https://tailwindcss.com/docs/max-width
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your maximum width utility sizes. These can
  | be percentage based, pixels, rems, or any other units. By default
  | we provide a sensible rem based scale and a "full width" size,
  | which is basically a reset utility. You can, of course,
  | modify these values as needed.
  |
  | Class name: .max-w-{size}
  |
  */

  maxWidth: {
    '1': '1rem',
    '2': '2rem',
    '3': '4rem',
    '4': '8rem',
    '5': '16rem',
    '6': '32rem',
    '7': '48rem',
    '8': '64rem',
    '9': '96rem',
    '-none': 'none',
    '-100': '100%'
  },

  /*
  |-----------------------------------------------------------------------------
  | Maximum height                      https://tailwindcss.com/docs/max-height
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your maximum height utility sizes. These can
  | be percentage based, pixels, rems, or any other units. We provide a
  | couple common use-cases by default. You can, of course, modify
  | these values as needed.
  |
  | Class name: .max-h-{size}
  |
  */

  maxHeight: {
    full: '100%',
    screen: '100vh'
  },

  /*
  |-----------------------------------------------------------------------------
  | Padding                                https://tailwindcss.com/docs/padding
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your padding utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default we
  | provide a sensible rem based numeric scale plus a couple other
  | common use-cases like "1px". You can, of course, modify these
  | values as needed.
  |
  | Class name: .p{side?}-{size}
  |
  */

  padding: {
    px: '1px',
    '0': '0',
    '1': '.25rem',
    '2': '.5rem',
    '3': '1rem',
    '4': '2rem',
    '5': '4rem',
    '6': '8rem',
    '7': '16rem'
  },

  /*
  |-----------------------------------------------------------------------------
  | Margin                                  https://tailwindcss.com/docs/margin
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your margin utility sizes. These can be
  | percentage based, pixels, rems, or any other units. By default we
  | provide a sensible rem based numeric scale plus a couple other
  | common use-cases like "1px". You can, of course, modify these
  | values as needed.
  |
  | Class name: .m{side?}-{size}
  |
  */

  margin: {
    '-px': '1px',
    '0': '0',
    '1': '.25rem',
    '2': '.5rem',
    '3': '1rem',
    '4': '2rem',
    '5': '4rem',
    '6': '8rem',
    '7': '16rem',
    '-auto': 'auto'
  },

  /*
  |-----------------------------------------------------------------------------
  | Position
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your positioning utility sizes. These can be
  | percentage based, pixels, rems, or any other units.
  |
  | Class name: .{position?}-{size}
  |
  */

  position: {
    '0': '0',
    '1': '1rem',
    '2': '2rem',
    '-1': '-1rem',
    '-2': '-2rem'
  },

  /*
  |-----------------------------------------------------------------------------
  | Negative margin                https://tailwindcss.com/docs/negative-margin
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your negative margin utility sizes. These can
  | be percentage based, pixels, rems, or any other units. By default we
  | provide matching values to the padding scale since these utilities
  | generally get used together. You can, of course, modify these
  | values as needed.
  |
  | Class name: .-m{side?}-{size}
  |
  */

  negativeMargin: {
    px: '1px',
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '1rem',
    '4': '-2rem',
    '5': '-4rem',
    '6': '-8rem',
    '7': '-16rem'
  },

  /*
  |-----------------------------------------------------------------------------
  | Shadows                                https://tailwindcss.com/docs/shadows
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your shadow utilities. As you can see from
  | the defaults we provide, it's possible to apply multiple shadows
  | per utility using comma separation.
  |
  | If a `default` shadow is provided, it will be made available as the non-
  | suffixed `.shadow` utility.
  |
  | Class name: .shadow-{size?}
  |
  */

  shadows: {
    '1': '0px 0px 4px 2px rgba( 0, 0, 0, 0.2 )',
    '2': '0px 0px 8px 2px rgba( 0, 0, 0, 0.2 )',
    '3': '2px 2px 4px 2px rgba( 0, 0, 0, 0.2 )',
    '4': '2px 2px 8px 0px rgba( 0, 0, 0, 0.2 )',
    '5': '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )',
    none: 'none'
  },

  /*
  |-----------------------------------------------------------------------------
  | Z-index                                https://tailwindcss.com/docs/z-index
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your z-index utility values. By default we
  | provide a sensible numeric scale. You can, of course, modify these
  | values as needed.
  |
  | Class name: .z-{index}
  |
  */

  zIndex: {
    auto: 'auto',
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '999': 999,
    '9999': 9999,
    max: 2147483647,
    inherit: 'inherit',
    initial: 'initial',
    unset: 'unset'
  },

  /*
  |-----------------------------------------------------------------------------
  | Opacity                                https://tailwindcss.com/docs/opacity
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your opacity utility values. By default we
  | provide a sensible numeric scale. You can, of course, modify these
  | values as needed.
  |
  | Class name: .opacity-{name}
  |
  */

  opacity: {
    '0': '0',
    '025': '.025',
    '05': '.05',
    '10': '.1',
    '20': '.2',
    '30': '.3',
    '40': '.4',
    '50': '.5',
    '60': '.6',
    '70': '.7',
    '80': '.8',
    '90': '.9',
    '100': '1'
  },

  /*
  |-----------------------------------------------------------------------------
  | Aspect Ratio
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your aspect ratio utility values. By default we
  | provide a sensible numeric scale. You can, of course, modify these
  | values as needed.
  |
  | Class name: .aspect-ratio-{name}
  |
  */

  aspectRatios: {
    '16x9': '56.25%',
    '9x16': '177.77%',
    '4x3': '75%',
    '3x4': '133.33%',
    '6x4': '66.6%',
    '4x6': '150%',
    '8x5': '62.5%',
    '5x8': '160%',
    '7x5': '71.42%',
    '5x7': '140%',
    '1x1': '100%'
  },

  /*
  |-----------------------------------------------------------------------------
  | CMS                             https://github.com/tachyons-css/tachyons-cms
  |-----------------------------------------------------------------------------
  |
  | CSS module for styling unqualified elements with Tachyons
  | Class name: .nested-{name}
  |
  */

  cms: {
    copyLineHeight: '1.5',
    headlineLineHeight: '1.5',
    copyIndent: '1em',
    copySeparator: '1.5em'
  },

  /*
  |-----------------------------------------------------------------------------
  | SVG fill                                   https://tailwindcss.com/docs/svg
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your SVG fill colors. By default we just provide
  | `fill-current` which sets the fill to the current text color. This lets you
  | specify a fill color using existing text color utilities and helps keep the
  | generated CSS file size down.
  |
  | Class name: .fill-{name}
  |
  */

  svgFill: {
    current: 'currentColor'
  },

  /*
  |-----------------------------------------------------------------------------
  | SVG stroke                                 https://tailwindcss.com/docs/svg
  |-----------------------------------------------------------------------------
  |
  | Here is where you define your SVG stroke colors. By default we just provide
  | `stroke-current` which sets the stroke to the current text color. This lets
  | you specify a stroke color using existing text color utilities and helps
  | keep the generated CSS file size down.
  |
  | Class name: .stroke-{name}
  |
  */

  svgStroke: {
    current: 'currentColor'
  },

  /*
  |-----------------------------------------------------------------------------
  | Table Stripes
  |-----------------------------------------------------------------------------
  |
  | Class name: .striped--{name}
  |
  */

  stripes: {
    'light-silver': colors['light-silver'],
    'moon-gray': colors['moon-gray'],
    'light-gray': colors['light-gray'],
    'near-white': colors['near-white']
  },

  /*
  |-----------------------------------------------------------------------------
  | Debug
  |-----------------------------------------------------------------------------
  |
  | Class name: .debug-{name}
  |
  */

  // debug: {
  //   '': 'debug'
  //   debug: 'debug',
  //   debugWhite: 'debug-white',
  //   debugBlack: 'debug-black',
  //   debugGrid: 'debug-grid'
  // },

  /*
  |-----------------------------------------------------------------------------
  | Modules                  https://tailwindcss.com/docs/configuration#modules
  |-----------------------------------------------------------------------------
  |
  | Here is where you control which modules are generated and what variants are
  | generated for each of those modules.
  |
  | Currently supported variants: 'responsive', 'hover', 'focus'
  |
  | To disable a module completely, use `false` instead of an array.
  |
  */

  modules: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: ['responsive', 'hover'],
    backgroundForegroundColors: ['responsive', 'hover'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borders: ['responsive'],
    borderColors: ['responsive', 'hover'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidths: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: ['responsive'],
    fonts: ['responsive'],
    fontWeights: ['responsive', 'hover'],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    opacity: ['responsive'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    shadows: ['responsive'],
    svgFill: [],
    svgStroke: [],
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover'],
    textSizes: ['responsive'],
    textStyle: ['responsive', 'hover'],
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
    aspectRatios: ['responsive'],
    rotate: ['responsive'],
    boxSizing: [],
    outline: ['responsive'],
    cms: [],
    typography: ['responsive'],
    debug: [],
    interactive: [],
    reset: [],
    stripes: []
  },

  /*
  |-----------------------------------------------------------------------------
  | Advanced Options         https://tailwindcss.com/docs/configuration#options
  |-----------------------------------------------------------------------------
  |
  | Here is where you can tweak advanced configuration options. We recommend
  | leaving these options alone unless you absolutely need to change them.
  |
  */

  options: {
    prefix: '',
    important: false,
    separator: ':'
  },

  naming: {
    backgroundColors: {
      base: 'bg',
      modifierPrefix: '-'
    },
    backgroundForegroundColors: {
      base: 'bfg',
      modifierPrefix: '-'
    },
    backgroundPositions: {
      base: 'bg-',
      sides: {
        top: 'top',
        right: 'right',
        rightTop: 'right-top',
        rightBottom: 'right-bottom',
        bottom: 'bottom',
        left: 'left',
        leftTop: 'left-top',
        leftBottom: 'left-bottom',
        left: 'left',
        center: 'center'
      }
    },
    backgroundAttachment: {
      fixed: 'bg-fixed',
      local: 'bg-local',
      scroll: 'bg-scroll'
    },
    backgroundRepeat: {
      repeat: 'bg-repeat',
      noRepeat: 'bg-no-repeat',
      repeatX: 'bg-repeat-x',
      repeatY: 'bg-repeat-y'
    },
    backgroundSize: {
      contain: 'contain',
      cover: 'cover'
    },
    borders: {
      all: 'ba',
      top: 'bt',
      right: 'br',
      bottom: 'bb',
      left: 'bl',
      none: 'bn'
    },
    borderColors: {
      base: 'b',
      modifierPrefix: '--'
    },
    borderStyle: {
      solid: 'b--solid',
      dashed: 'b--dashed',
      dotted: 'b--dotted',
      none: 'b--none'
    },
    borderWidths: {
      base: 'bw',
      withSides: 'b',
      modifierPrefix: '-',
      sides: {
        top: 't',
        right: 'r',
        bottom: 'b',
        left: 'l'
      }
    },
    container: {
      base: 'container'
    },
    cursor: {
      auto: 'cursor-auto',
      default: 'cursor-default',
      pointer: 'pointer',
      notAllowed: 'cursor-not-allowed'
    },
    display: {
      block: 'db',
      inlineBlock: 'dib',
      inline: 'di',
      inlineTable: 'dit',
      table: 'dt',
      tableCell: 'dtc',
      tableRow: 'dt-row',
      tableRowGroup: 'dt-row-group',
      tableColumn: 'dt-column',
      tableColumnGroup: 'dt-column-group',
      hidden: 'dn',
      tableFixed: 'dt--fixed',
      collapse: 'collapse'
    },
    flex: {
      flex: 'flex',
      inlineFlex: 'inline-flex',
      flexRow: 'flex-row',
      flexRowReverse: 'flex-row-reverse',
      flexCol: 'flex-column',
      flexColReverse: 'flex-column-reverse',
      flexWrap: 'flex-wrap',
      flexWrapReverse: 'flex-wrap-reverse',
      flexNoWrap: 'flex-nowrap',
      itemsStart: 'items-start',
      itemsEnd: 'items-end',
      itemsCenter: 'items-center',
      itemsBaseline: 'items-baseline',
      itemsStretch: 'items-stretch',
      selfAuto: 'self-auto',
      selfStart: 'self-start',
      selfEnd: 'self-end',
      selfCenter: 'self-center',
      selfStretch: 'self-stretch',
      selfBaseline: 'self-baseline',
      justifyStart: 'justify-start',
      justifyEnd: 'justify-end',
      justifyCenter: 'justify-center',
      justifyBetween: 'justify-between',
      justifyAround: 'justify-around',
      contentCenter: 'content-center',
      contentStart: 'content-start',
      contentEnd: 'content-end',
      contentBetween: 'content-between',
      contentAround: 'content-around',
      contentStretch: 'content-stretch',
      flex1: 'flex-1',
      flexAuto: 'flex-auto',
      flexInitial: 'flex-initial',
      flexNone: 'flex-none',
      flexGrow: 'flex-grow-1',
      flexShrink: 'flex-shrink-1',
      flexNoGrow: 'flex-grow-0',
      flexNoShrink: 'flex-shrink-0',
      order0: 'order-0',
      order1: 'order-1',
      order2: 'order-2',
      order3: 'order-3',
      order4: 'order-4',
      order5: 'order-5',
      order6: 'order-6',
      order7: 'order-7',
      order8: 'order-8',
      orderLast: 'order-last'
    },
    floats: {
      floatRight: 'fr',
      floatLeft: 'fl',
      floatNone: 'fn',
      clearLeft: 'cl',
      clearRight: 'cr',
      clearBoth: 'cb',
      clearNone: 'cn',
      clearfix: 'cf'
    },
    cms: {
      copyLineHeight: 'nested-copy-line-height',
      headlineLineHeight: 'nested-headline-line-height',
      copyIndent: 'nested-copy-indent',
      copySeparator: 'nested-copy-separator',
      /* Typo */
      copySeperator: 'nested-copy-seperator',
      listReset: 'nested-list-reset',
      img: 'nested-img',
      links: 'nested-links'
    },
    forms: {
      appearanceNone: 'appearance-none'
    },
    lists: {
      listReset: 'list-reset'
    },
    opacity: {
      base: 'o',
      modifierPrefix: '-'
    },
    overflow: {
      base: 'overflow-',
      auto: 'auto',
      hidden: 'hidden',
      visible: 'visible',
      scroll: 'scroll',
      xScroll: 'x-scroll',
      yScroll: 'y-scroll',
      xVisible: 'x-visible',
      yVisible: 'y-visible',
      xHidden: 'x-hidden',
      yHidden: 'y-hidden',
      xAuto: 'x-auto',
      yAuto: 'y-auto',
      scrollingTouch: 'scrolling-touch',
      scrollingAuto: 'scrolling-auto',
      /* Deprecated */
      container: 'container'
    },
    pointerEvents: {
      pointerAuto: 'pointer-events-auto',
      pointerNone: 'pointer-events-none'
    },
    position: {
      static: 'static',
      fixed: 'fixed',
      absolute: 'absolute',
      relative: 'relative',
      pin: 'absolute--fill',
      pinNone: 'pin-none',
      modifierPrefix: '-',
      sides: {
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right'
      },
      pinX: 'pin-x',
      pinY: 'pin-y'
    },
    rotate: {
      base: 'rotate',
      modifierPrefix: '-'
    },
    resize: {
      resize: 'resize',
      resizeNone: 'resize-none',
      resizeX: 'resize-x',
      resizeY: 'resize-y'
    },
    svgFill: {
      base: 'fill',
      modifierPrefix: '-'
    },
    svgStroke: {
      base: 'stroke',
      modifierPrefix: '-'
    },
    aspectRatios: {
      base: 'aspect-ratio',
      modifierPrefix: '--',
      object: 'aspect-ratio--object'
    },
    borderRadius: {
      base: 'br',
      withSides: 'br--',
      modifierPrefix: '',
      sidesSeparator: '--',
      sides: {
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left'
      }
    },
    boxSizing: {
      borderBox: 'border-box',
      contentBox: 'content-box'
    },
    shadow: {
      base: 'shadow',
      modifierPrefix: '-'
    },
    height: {
      base: 'h',
      modifierPrefix: '',
      screen: 'vh'
    },
    maxHeight: {
      base: 'max-h',
      modifierPrefix: '-'
    },
    minHeight: {
      base: 'min-h',
      modifierPrefix: '-',
      screen: 'min-vh'
    },
    width: {
      base: 'w',
      modifierPrefix: '',
      screen: 'vw'
    },
    maxWidth: {
      base: 'mw',
      modifierPrefix: ''
    },
    minWidth: {
      base: 'min-w',
      modifierPrefix: '-'
    },
    margin: {
      base: 'm',
      modifierPrefix: '',
      allModifierPrefix: 'a',
      y: 'v',
      x: 'h',
      t: 't',
      r: 'r',
      b: 'b',
      l: 'l',
      center: 'center'
    },
    negativeMargin: {
      base: 'n',
      modifierPrefix: '',
      allModifierPrefix: 'a',
      y: 'v',
      x: 'h',
      t: 't',
      r: 'r',
      b: 'b',
      l: 'l'
    },
    padding: {
      base: 'p',
      modifierPrefix: '',
      allModifierPrefix: 'a',
      y: 'v',
      x: 'h',
      t: 't',
      r: 'r',
      b: 'b',
      l: 'l'
    },
    textAlign: {
      left: 'tl',
      center: 'tc',
      right: 'tr',
      justify: 'tj'
    },
    textColors: {
      base: '',
      modifierPrefix: '',
      inherit: 'color-inherit'
    },
    fonts: {
      base: '',
      modifierPrefix: ''
    },
    leading: {
      base: 'lh',
      modifierPrefix: '-'
    },
    textSizes: {
      base: 'f',
      modifierPrefix: ''
    },
    textStyle: {
      italic: 'i',
      roman: 'fs-normal',
      uppercase: 'ttu',
      lowercase: 'ttl',
      capitalize: 'ttc',
      normalCase: 'ttn',
      underline: 'underline',
      lineThrough: 'strike',
      noUnderline: 'no-underline',
      antialiased: 'antialiased',
      subpixelAntialiased: 'subpixel-antialiased'
    },
    textTracking: {
      base: 'tracked',
      modifierPrefix: '-'
    },
    fontWeights: {
      base: 'fw',
      modifierPrefix: '',
      normal: 'normal',
      bold: 'b'
    },
    textWrap: {
      whitespaceNormal: 'ws-normal',
      whitespaceNoWrap: 'nowrap',
      whitespacePre: 'pre',
      whitespacePreLine: 'pre-line',
      whitespacePreWrap: 'pre-wrap',
      breakWords: 'break-words',
      breakNormal: 'break-normal',
      truncate: 'truncate'
    },
    debug: {
      debug: 'debug',
      debugWhite: 'debug-white',
      debugBlack: 'debug-black',
      debugGrid: 'debug-grid'
    },
    userSelect: {
      selectNone: 'select-none',
      selectText: 'select-text'
    },
    verticalAlign: {
      alignBaseline: 'v-base',
      alignTop: 'v-top',
      alignMiddle: 'v-mid',
      alignBottom: 'v-btm',
      alignTextTop: 'v-top-text',
      alignTextBottom: 'v-btm-text',
      alignSub: 'v-sub',
      alignInherit: 'v-inherit',
      alignSuper: 'v-super'
    },
    visibility: {
      visible: 'visible',
      invisible: 'invisible',
      clip: 'clip'
    },
    zIndex: {
      base: 'z',
      modifierPrefix: '-'
    },
    outline: {
      base: 'outline',
      transparent: 'outline-transparent',
      zero: 'outline-0'
    },
    typography: {
      measure: 'measure',
      measureWide: 'measure-wide',
      measureNarrow: 'measure-narrow',
      indent: 'indent',
      smallCaps: 'small-caps'
    },
    interactive: {
      dim: 'dim',
      hideChild: 'hide-child',
      underline: 'underline-hover',
      grow: 'grow',
      growLarge: 'grow-large',
      shadow: 'shadow-hover',
      bg: 'bg-animate',
      glow: 'glow',
      hoverInherit: 'hover-inherit',
      hoverBgInherit: 'hover-bg-inherit'
    },
    reset: {
      link: 'link',
      list: 'list',
      input: 'input-reset',
      button: 'button-reset'
    },
    stripes: {
      base: 'stripe',
      modifierPrefix: '--',
      withModifier: 'striped',
      light: '-light',
      dark: '-dark'
    }
  }
}
