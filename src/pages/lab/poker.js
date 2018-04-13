const PokerPage = () => (
  <main className="">
    {/* <h1>Poker</h1> */}

    <Helmet>
      <title itemProp="name">Poker</title>
      {/* Hide page from search engines */}
      <meta name="robots" content="noindex" />
    </Helmet>

    <Range />
    <Tools />
  </main>
)

export default PokerPage

/* 
 *
 * General
 * 
 */

import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'

/* 
 *
 * Range
 * 
 */

class Range extends Component {
  state = {
    position: `initial`,
    opponent: {
      position: null,
      action: null // or `RFI`, `3BET`
    }
  }

  componentDidMount = () => document.addEventListener('keydown', this.handleEsc, false)

  updateHeroPosition = position => {
    // If the user clicks a position that has already been selected, cancel it
    if (this.state.position !== `initial`) {
      this.setState({
        position: `initial`,
        opponent: {
          position: null,
          action: null
        }
      })
      // If the user clicks on the big blind, automatically trigger the RFI action
    } else if (position === `bigBlind`) {
      this.setState({
        position: position,
        opponent: {
          position: null,
          action: `RFI`
        }
      })
    } else {
      // If the user clicks a position when none is selected, update it
      this.setState({
        position: position,
        opponent: {
          position: null,
          action: null
        }
      })
    }
  }

  updateOpponentAction = action => {
    // If the user clicks an action that has already been selected, cancel it
    if (this.state.opponent.action) {
      this.setState({
        opponent: {
          position: null,
          action: null
        }
      })
      // If the user clicks RFI from the hijack, automatically trigger the LJ opponent
    } else if (action === `RFI` && this.state.position === `hijack`) {
      this.setState({
        opponent: {
          position: `lojack`,
          action: action
        }
      })
      // If the user clicks 3-bet from the small blind, automatically trigger the BB opponent
    } else if (action === `3BET` && this.state.position === `smallBlind`) {
      this.setState({
        opponent: {
          position: `bigBlind`,
          action: action
        }
      })
      // If the user clicks an action when none is selected, update it
    } else {
      this.setState({
        opponent: {
          position: null,
          action: action
        }
      })
    }
  }

  updateOpponentPosition = position => {
    // If the user clicks an opponent's position that has already been selected, cancel it
    if (this.state.opponent.position) {
      this.setState({
        opponent: {
          position: null,
          action: this.state.opponent.action
        }
      })
      // If the user clicks an opponent's position when none is selected, update it
    } else {
      this.setState({
        opponent: {
          position: position,
          action: this.state.opponent.action
        }
      })
    }
  }

  resetRange = () => {
    this.setState({
      position: `initial`,
      opponent: {
        position: null,
        action: null
      }
    })
  }

  handleEsc = event => (event.keyCode === 27 ? this.resetRange() : null)

  render() {
    const { position, opponent } = this.state

    /*
     *
     * 1. Update range based on the situation
     * 
     */

    let currentActions

    if (position && opponent.action && opponent.position) {
      currentActions = actions[position][`VERSUS_${opponent.action}`][opponent.position]
    } else if (position !== `bigBlind`) {
      currentActions = actions[position][`RFI`]
    }
    // console.log(`currentActions`, currentActions)

    // 1. Copy newMatrix and set all actions to fold by default
    const newMatrix = matrix.map(row => {
      return row.map(hand => {
        hand.action = `fold`
        return hand
      })
    })

    // 2. For each action in the currentAction array...
    if (currentActions) {
      Object.keys(currentActions).map(action => {
        // 3. Loop through each hand with that action...
        currentActions[action].map(actionHand => {
          // 4. Then loop through each newMatrix row (until the hand has been found)
          newMatrix.some(row => {
            let found = false

            // 5. Then loop through each hand in the row (until the hand has been found)
            row.some(matrixHand => {
              // 6. When the hand is found...
              if (matrixHand.value === actionHand) {
                // console.log(`It's a match! Setting ${matrixHand.value}'s action to ${action}.`)

                // 7. Update the hand's action...
                matrixHand.action = action

                // 8. And break the row.some() loop...
                found = true
                return true
              }

              // 9. Finally, break the newMatrix.some() loop (move to the next actionHand)
              if (found) return true
            })
          })
        })
      })
    }

    /*
     *
     * 2. Update advice based on the situation
     * 
     */

    return (
      <Fragment>
        <Filters
          position={position}
          opponent={opponent}
          updateHeroPosition={this.updateHeroPosition}
          updateOpponentAction={this.updateOpponentAction}
          updateOpponentPosition={this.updateOpponentPosition}
          resetRange={this.resetRange}
        />
        <Matrix position={position} opponent={opponent} />
        {/* <Advice position={position} opponent={opponent} /> */}
      </Fragment>
    )
  }
}

/* 
 *
 * Filters
 * 
 */

// TODO: create multilevel filters (our position, facing RFI/3BET, opponent's position)
const Filters = ({
  position,
  opponent,
  updateHeroPosition,
  updateOpponentAction,
  updateOpponentPosition,
  resetRange
}) => {
  let allPositions, heroPositions, allActions, opponentActions, opponentPositions

  // Get all possible hero positions from the actions map
  if (position) {
    allPositions = Object.keys(actions)
    heroPositions = allPositions.filter(position => position.indexOf(`initial`) === -1)
  }

  // Get all possible opponent actions from the actions map
  if (position && position !== `initial`) {
    allActions = Object.keys(actions[position])
    opponentActions = allActions.filter(action => action.indexOf(`VERSUS_`) !== -1)
  }

  // Get all possible opponent positions from the actions map
  if (opponent.action) {
    opponentPositions = Object.keys(actions[position][`VERSUS_${opponent.action}`])
  }

  return (
    <div
      className="flex justify-between mt2 pt1"
      // style={{ maxWidth: `34.3rem` }}
    >
      <div>
        {heroPositions && (
          <Fragment>
            {heroPositions.map(heroPosition => {
              return (
                <Filter
                  key={shortid.generate()}
                  onClick={() => updateHeroPosition(heroPosition)}
                  className={`poker-link mh1 ${
                    position === `initial`
                      ? ``
                      : position === heroPosition ? `bg-green black shadow-md` : `dn`
                  }`}
                >
                  {heroPosition === `lojack`
                    ? `LJ`
                    : heroPosition === `hijack`
                      ? `HJ`
                      : heroPosition === `cutoff`
                        ? `CO`
                        : heroPosition === `button`
                          ? `BTN`
                          : heroPosition === `smallBlind`
                            ? `SB`
                            : heroPosition === `bigBlind` ? `BB` : ``}
                </Filter>
              )
            })}
          </Fragment>
        )}

        {opponentActions && (
          <Fragment>
            <span>facing a</span>
            {opponentActions.map(action => {
              return (
                <Filter
                  key={shortid.generate()}
                  onClick={() => updateOpponentAction(action.replace(/VERSUS_/g, ''))}
                  className={`poker-link mh1 ${
                    opponent.action
                      ? opponent.action === action.replace(/VERSUS_/g, '')
                        ? `bg-green black shadow-md`
                        : `dn`
                      : ``
                  }`}
                >
                  {action.replace(/VERSUS_/g, '')}
                </Filter>
              )
            })}
          </Fragment>
        )}

        {opponentActions &&
          opponentPositions && (
            <Fragment>
              <span>from the</span>
              {opponentPositions.map(position => {
                return (
                  <Filter
                    key={shortid.generate()}
                    onClick={() => updateOpponentPosition(position)}
                    className={`poker-link mh1 ${
                      opponent.position
                        ? opponent.position === position ? `bg-green black shadow-md` : `dn`
                        : ``
                    }`}
                  >
                    {position === `lojack`
                      ? `LJ`
                      : position === `hijack`
                        ? `HJ`
                        : position === `cutoff`
                          ? `CO`
                          : position === `button`
                            ? `BTN`
                            : position === `smallBlind`
                              ? `SB`
                              : position === `bigBlind` ? `BB` : ``}
                  </Filter>
                )
              })}
            </Fragment>
          )}
      </div>
      {position !== `initial` && (
        <button onClick={resetRange} className="poker-link mh1">
          Reset
        </button>
      )}
    </div>
  )
}

const Filter = ({ className, children, ...props }) => (
  <button {...props} className={`poker-link ${className ? className : ``}`}>
    {children}
  </button>
)

/* 
 *
 * Matrix
 * 
 */

import shortid from 'shortid'

// TODO: generate table by looping over data (array? array of arrays (one per row)? other structure more suitable to a matrix?)
// TODO: update bg-color of each cell depending on the filter values
const Matrix = () => (
  <article className="mh1">
    <table
      summary="Matrix showing all possible Texas Hold'em hole card combinations and the actions that should be taken with each hand based on the situation."
      // className="w7"
    >
      <tbody>
        {matrix.map(row => {
          return <Row key={shortid.generate()} row={row} />
        })}
      </tbody>
    </table>
  </article>
)

/* 
 *
 * Row
 * 
 */

const Row = ({ row }) => (
  <tr
    style={{
      display: `grid`,
      // gridGap: `.1rem`,
      gridTemplateColumns: `repeat(13, minmax(min-content, 2.8rem))`
    }}
  >
    {row.map(hand => {
      return (
        <td
          key={shortid.generate()}
          data-action={hand.action}
          style={{ border: `white solid .001rem` }}
          // style={{ margin: `.1rem` }}
        >
          <div className="aspect-ratio aspect-ratio--1x1">
            <div className="flex justify-center items-center aspect-ratio--object">
              {hand.value}
            </div>
          </div>
        </td>
      )
    })}
  </tr>
)

/* 
 *
 * Hands
 * 
 */

const ranks = [`A`, `K`, `Q`, `J`, `T`, `9`, `8`, `7`, `6`, `5`, `4`, `3`, `2`]
let matrix = []

// Generate hand range matrix
for (let i = 0; i < ranks.length; i++) {
  const row = ranks.map((rank, index) => {
    // Create default hand value and action
    let hand = { value: null, action: `raise` }

    // Update all hand values in the matrix
    if (index < i) hand.value = `${rank}${ranks[i]}o`
    else if (index === i) hand.value = `${rank}${rank}`
    else hand.value = `${ranks[i]}${rank}s`

    return hand
  })

  // Add the completed row to the matrix
  matrix.push(row)
}

/* 
 *
 * Actions
 * 
 */

import prange from 'prange'

const actions = {
  initial: {
    RFI: {
      fold: prange(`A2+, K2+, Q2+, J2+, T2+, 92+, 82+, 72+, 62+, 52+, 42+, 32+, 22`)
    }
  },
  lojack: {
    RFI: {
      raise: prange(`22+, A2s+, AJo+, K9s+, KQo, Q9s+, J9s+, T9s-65s`),
      raiseOrFold: prange(`ATo, K8s, KJo, QJo, T8s-97s, 54s`)
    },
    VERSUS_3BET: {
      hijack: {
        raise: prange(`QQ+, AK, A5s-A2s`),
        raiseOrCall: prange(`JJ`),
        raiseOrFold: prange(`A9s-A8s, AJo`),
        call: prange(`TT-66, AQs-ATs, AQo, KQs-KJs, QJs-98s`),
        callOrFold: prange(`KTs, QTs`)
      },
      cutoff: {
        raise: prange(`QQ+, AK, A5s-A2s`),
        raiseOrCall: prange(`JJ`),
        raiseOrFold: prange(`A9s-A8s, AJo`),
        call: prange(`TT-66, AQs-ATs, AQo, KQs-KJs, QJs-98s`),
        callOrFold: prange(`KTs, QTs`)
      },
      button: {
        raise: prange(`QQ+, AK, A5s-A2s`),
        raiseOrCall: prange(`JJ`),
        raiseOrFold: prange(`A9s-A6s, AJo`),
        call: prange(`TT-55, AQs-ATs, AQo, KQs-KTs, QJs-QTs, JTs-87s`)
      },
      smallBlind: {
        raise: prange(`QQ+, AK, A5s-A2s`),
        raiseOrCall: prange(`JJ`),
        raiseOrFold: prange(`A9s-A6s`),
        call: prange(`TT-55, AQs-ATs, AQo, KQs-KTs, QJs-QTs, JTs-87s`),
        callOrFold: prange(`44, AJo, KQo, J9s, 76s`)
      },
      bigBlind: {
        raise: prange(`QQ+, AK, A5s-A2s`),
        raiseOrCall: prange(`JJ`),
        raiseOrFold: prange(`A9s-A6s`),
        call: prange(`TT-55, AQs-ATs, AQo, KQs-KJs, QJs-87s`),
        callOrFold: prange(`44, KTs, QTs, 76s`)
      }
    }
  },
  hijack: {
    VERSUS_RFI: {
      lojack: {
        raise: prange(`QQ+, AK`),
        raiseOrCall: prange(`JJ-TT, AQ, AJs, KQs`),
        raiseOrFold: prange(`A5s-A4s, AJo, 76s-65s`),
        call: prange(`99-55, ATs, KJs, QJs-87s`),
        callOrFold: prange(`KTs, QTs`)
      }
    },
    RFI: {
      raise: prange(`22+, A2s+, ATo+, K8s+, KJo+, Q9s+, QJo, J9s+, T8s-97s, T9s-54s`),
      raiseOrFold: prange(`K7s-K6s, KTo, Q8s, QTo, J8s, JTo, 86s-64s`)
    },
    VERSUS_3BET: {
      cutoff: {
        raise: prange(`QQ+, AK, A5s-A2s`),
        raiseOrCall: prange(`JJ`),
        raiseOrFold: prange(`A9s-A6s, 76s`),
        call: prange(`TT-55, AQs-ATs, AQo, KQs-KTs, QJs-QTs, JTs-87s`),
        callOrFold: prange(`AJo, K9s, KQo, Q9s, J9s`)
      },
      button: {
        raise: prange(`QQ+, AK, A5s-A2s`),
        raiseOrCall: prange(`JJ`),
        raiseOrFold: prange(`A9s-A6s, 76s-54s`),
        call: prange(`TT-55, AQs-ATs, AQo, KQs-KTs, QJs-QTs, JTs-87s`),
        callOrFold: prange(`44, AJo, K9s, KQo, Q9s, J9s`)
      },
      smallBlind: {
        raise: prange(`QQ+, AK, A5s-A2s`),
        raiseOrCall: prange(`JJ`),
        raiseOrFold: prange(`A9s-A6s`),
        call: prange(`TT-55, AQs-ATs, AQo, KQs-KTs, QJs-QTs, JTs-87s`),
        callOrFold: prange(`44, AJo, K9s, KQo, Q9s, J9s, 76s`)
      },
      bigBlind: {
        raise: prange(`QQ+, AK, A5s-A2s`),
        raiseOrCall: prange(`JJ`),
        raiseOrFold: prange(`A9s-A6s`),
        call: prange(`TT-55, AQs-ATs, AQo, KQs-KTs, QJs-QTs, JTs-87s`),
        callOrFold: prange(`44, 76s`)
      }
    }
  },
  cutoff: {
    VERSUS_RFI: {
      lojack: {
        raise: prange(`QQ+, AK, A5s`),
        raiseOrCall: prange(`JJ-TT, AQ, AJs, KQs, 76s`),
        raiseOrFold: prange(`A4s-A2s, 65s-54s`),
        call: prange(`99-55, ATs, KJs-KTs, QJs-QTs, JTs-87s`),
        callOrFold: prange(`44`)
      },
      hijack: {
        raise: prange(`QQ+, AK, A5s-A2s, 76s`),
        raiseOrCall: prange(`JJ-TT, AQ, AJs, KQs`),
        raiseOrFold: prange(`A9s-A6s, AJo, K9s, KQo, Q9s, J9s, 65s-54s`),
        call: prange(`99-55, ATs, KJs-KTs, QJs-QTs, JTs-87s`),
        callOrFold: prange(`44`)
      }
    },
    RFI: {
      raise: prange(`22+, A2s+, ATo+, K6s+, KTo+, Q8s+, QTo+, J8s+, JTo, T8s-64s, T9s-54s`),
      raiseOrFold: prange(
        `A9o-A8o, A5o, K5s-K2s, K9o, Q7s-Q4s, Q9o, J7s-J6s, J9o, T6s-84s,  T7s-63s, 53s, 43s-32s, T9o-98o`
      )
    },
    VERSUS_3BET: {
      button: {
        raise: prange(`JJ+, AK, A8s-A6s, A4s-A2s`),
        raiseOrCall: prange(`TT`),
        raiseOrFold: prange(`ATo, 86s-75s, 54s`),
        call: prange(`99-44, AQs-A9s, A5s, AQo-AJo, KQs-K9s, KQo, QJs-Q9s, J9s-T8s, JTs-76s`),
        raiseCallOrFold: prange(`97s, 65s`)
      },
      smallBlind: {
        raise: prange(`JJ+, AK, A8s-A6s, A4s-A2s`),
        raiseOrCall: prange(`TT`),
        raiseOrFold: prange(`ATo, 86s-75s, 54s`),
        call: prange(`99-44, AQs-A9s, A5s, AQo-AJo, KQs-K9s, KQo, QJs-Q9s, J9s-T8s, JTs-76s`),
        raiseCallOrFold: prange(`97s, 65s`)
      },
      bigBlind: {
        raise: prange(`JJ+, AK, A4s-A2s`),
        raiseOrCall: prange(`TT`),
        raiseOrFold: prange(`65-54s`),
        call: prange(`99-44, AQs-A9s, A5s, AQo, KQs-KTs, KQo, QJs-QTs, JTs-76s`),
        callOrFold: prange(`AJo, K9s, KQo, Q9s, J9s`),
        raiseCallOrFold: prange(`A8s-A6s`)
      }
    }
  },
  button: {
    VERSUS_RFI: {
      lojack: {
        raise: prange(`QQ+, AK, A5s-A2s, 65s-54s`),
        raiseOrCall: prange(`JJ-TT, AQ, AJs, KQs`),
        raiseOrFold: prange(`A8s-A6s`),
        call: prange(`99-22, ATs-A9s, KJs-KTs, QJs-QTs, JTs-76s`),
        callOrFold: prange(`KQo, J9s`),
        raiseCallOrFold: prange(`AJo`)
      },
      hijack: {
        raise: prange(`QQ+, AK, A5s-A2s, 65s-54s`),
        raiseOrCall: prange(`JJ-TT, AQ, AJs, KQs`),
        raiseOrFold: prange(`A8s-A6s, ATo, 86s-75s`),
        call: prange(`99-22, ATs-A9s, AJo, KJs-K9s, KQo, QJs-Q9s, JTs-J9s, T9s-87s`),
        raiseCallOrFold: prange(`T8s-97s, 76s`)
      },
      cutoff: {
        raise: prange(`TT+, AK-AQ, AJs, A7s-A6s, A3s-A2s, KQs, 86s-75s, 65s-54s`),
        raiseOrCall: prange(`KJs, QJs-JTs`),
        raiseOrFold: prange(`K8s, Q8s, J8s, 64s, 43s`),
        call: prange(`99-22, ATs-A8s, A5s-A4s, AJo, KTs-K9s, KQo, QTs-Q9s, J9s-97s, T9s-76s`),
        callOrFold: prange(`KJo, QJo`),
        raiseCallOrFold: prange(`ATo`)
      }
    },
    RFI: {
      raise: prange(
        `22+, A2+, K2s+, K9o+, Q4s+, Q9o+, J6s+, J9o+, T6s-84s, T7s-63s, T8s-53s, T9s-32s, T9o-98o`
      ),
      raiseOrFold: prange(
        `K8o-K3o, Q3s-Q2s, Q8o-Q5o, J5s-J2s, J8o-J7o, T5s-T2s, T8o-T6o, 94s-92s, 97o-96o, 83s-82s, 87o-86o, 73s-72s, 76o-75o, 62s, 65o, 52s, 54o, 42s`
      )
    },
    VERSUS_3BET: {
      smallBlind: {
        raise: prange(`TT+, AK, A7s-A6s, A3s-A2s, 86s-75s, 54s`),
        raiseOrCall: prange(`AQs`),
        raiseOrFold: prange(`K8s-K7s, Q8s, J8s-T7s, 64s`),
        call: prange(
          `99-22, AJs-A8s, A5s-A4s, AQo-AJo, KQs-K9s, KQo, QJs-Q9s, J9s-97s, JTs-65s`
        ),
        callOrFold: prange(`ATo, KJo, QJo`)
      },
      bigBlind: {
        raise: prange(`TT+, AK, A7s-A6s, A3s-A2s, 86s-75s, 54s`),
        raiseOrFold: prange(`ATo, 86s-64s`),
        call: prange(
          `99-22, AQs-A8s, A5s-A4s, AQo-AJo, KQs-K9s, KQo, QJs-Q9s, J9s-97s, JTs-65s`
        )
      }
    }
  },
  smallBlind: {
    VERSUS_RFI: {
      lojack: {
        raise: prange(`QQ+, AK`),
        raiseOrCall: prange(`JJ-TT, AQs-AJs, KQs`),
        raiseOrFold: prange(`A5s-A4s, 87s-76s`),
        call: prange(`99-55, ATs, AQo, KJs-KTs, QJs-QTs, JTs-98s`)
      },
      hijack: {
        raise: prange(`JJ+, AK, AQs, A5s-A4s`),
        raiseOrCall: prange(`TT, AJs, KQs`),
        raiseOrFold: prange(`A3s, 76s-54s`),
        call: prange(`99-55, ATs, AQo, KJs-KTs, QJs-QTs, JTs-87s`),
        callOrFold: prange(`44`)
      },
      cutoff: {
        raise: prange(`55+, A2s+, AQo+, KTs+, QTs+, JTs-76s`),
        raiseOrFold: prange(`44-22, AJo, K9s, KQo, Q9s, J9s-T8s, 65s-54s`)
      },
      button: {
        raise: prange(`22+, A2s+, AJo+, K9s+, KQo, Q9s+, J9s-T8s, JTs-65s`),
        raiseOrFold: prange(`ATo, KJo, QJo, 97s-86s, 54s`)
      }
    },
    RFI: {
      raise: prange(
        `22+, A2+, K2s+, K9o+, Q4s+, Q9o+, J6s+, J9o+, T6s-84s, T7s-63s, T8s-53s, T9s-32s, T9o-98o`
      ),
      raiseOrFold: prange(
        `K8o-K2o, Q3s-Q2s, Q8o-Q2o, J5s-J2s, J8o-J5o, T5s-T2s, T8o-T5o, 94s-92s, 97o-95o, 83s-82s, 87o-85o, 73s-72s, 76o-75o, 62s, 65o, 52s, 54o, 42s, 43o`
      )
    },
    VERSUS_3BET: {
      bigBlind: {
        raise: prange(`TT+, AK, A7s-A6s, A3s-A2s, 86s-75s`),
        raiseOrCall: prange(`AQs`),
        raiseOrFold: prange(`ATo, 86s-64s, 54s-43s`),
        call: prange(
          `99-22, AJs-A8s, A5s-A4s, AQo-AJo, KQs-K9s, KQo, QJs-Q9s, J9s-97s, JTs-65s`
        ),
        raiseCallOrFold: prange(`ATo, K8s, KJo, Q8s, QJo, J8s`)
      }
    }
  },
  bigBlind: {
    VERSUS_RFI: {
      lojack: {
        raise: prange(`JJ+, AK, 65s-43s`),
        raiseOrCall: prange(`TT, AQs-AJs, KQs`),
        call: prange(
          `99-22, ATs-A2s, AQo-ATo, KJs-K2s, KQo-KTo, QJs-Q4s, QJo-QTo, JTs-J5s, JTo, T9s-T5s, 98s-95s, 87s-85s, 76s`
        ),
        raiseCallOrFold: prange(`74s, 75s-53s`)
      },
      hijack: {
        raise: prange(`JJ+, AK, AQs, 64s-53s, 76s-43s`),
        raiseOrCall: prange(`TT, AJs, AQo, KQs, 75s-74s`),
        raiseOrFold: prange(`63s, 32s`),
        call: prange(
          `99-22, ATs-A2s, AJo-ATo, KJs-K2s, KQo-KTo, QJs-Q2s, QJo-QTo, JTs-J4s, JTo, T9s-T5s, 98s-95s, 87s-85s`
        )
      },
      cutoff: {
        raise: prange(`TT+, AQ+, AJs, KQs, 74s, 75s-53s, 76s-43s`),
        raiseOrCall: prange(`ATs, AJo, KJs, KQo, QJs-T9s, 84s, 32s`),
        raiseOrFold: prange(`73s-62s, 63s-52s, 42s`),
        call: prange(
          `99-22, A9s-A2s, ATo-A8o, A5o-A4o, KTs-K2s, KJo-K9o, QTs-Q2s, QJo-Q9o, J9s-J4s, JTo-J9o, T8s-T4s, 98s-94s, 87s-85s, T9o-98o`
        )
      },
      button: {
        raise: prange(`TT+, AQ+, AJs, KQs, 74s-63s, 75s-53s, 76s-32s`),
        raiseOrCall: prange(`99, ATs, AJo, KJs-KTs, KQo, QJs-QTs, JTs-87s`),
        raiseOrFold: prange(`73s-62s, 52s, 42s, 75o-64o, 65o-54o`),
        call: prange(
          `88-22, A9s-A2s, ATo-A2o, K9s-K2s, KJo-K7o, Q9s-Q2s, QJo-Q8o, J9s-J3s, JTo-J8o, T8s-T4s, T9o-T8o, 97s-94s, 86s-84s, 98o-76o`
        ),
        callOrFold: prange(
          `K6o-K4o, Q7o-Q6o, J2s, J7o-J6o, T3s-T2s, T7o-T6o, 93s-92s, 97o-96o, 83s-82s, 86o, 72s`
        )
      },
      smallBlind: {
        raise: prange(`TT+, AQ+, AJs-ATs, KQs-KJs, QJs-87s, 75o-64o, 76o-54o`),
        raiseOrCall: prange(`99, AJo, KTs, KQo, QTs-T8s, 76s-54s`),
        raiseOrFold: prange(`74o-63o, 53o, 43o`),
        call: prange(
          `88-22, A9s-A2s, ATo-A2o, K9s-K2s, KJo-K4o, Q9s-Q2s, QJo-Q5o, J8s-J2s, JTo-J7o, T7s-T2s, T9o-T7o, 97s-92s, 98o-97o, 86s-82s, 87o-86o, 75s-72s, 64s-62s, 53s-52s, 43s-42s, 32s`
        ),
        callOrFold: prange(`K3o-K2o, Q4o-Q2o, J6o-J5o, T6o-T5o, 96o-95o, 85o`)
      }
    }
  }
}

/* 
 *
 * Tools
 * 
 */

const Tools = () => (
  <Fragment>
    <ImpliedOdds />
    {/* <PotOdds /> */}

    {/* <FoldEquity />
    <SPR /> */}
  </Fragment>
)

// TODO: update this to calculate equity/outs needed to call based on bet size (pot odds), multiple of bet needed to win by the end of the hand (implied odds), and SPR, etc.

class PotOdds extends Component {
  state = {
    // outs: 8,
    betSize: 1
  }

  // increaseOuts = () => this.setState({ outs: this.state.outs + 1 })
  // decreaseOuts = () => this.setState({ outs: this.state.outs - 1 })

  changeBetSize = event => this.setState({ betSize: Number(event.target.value) })

  render() {
    const { betSize } = this.state

    // See "Poker Math That Matters", p. 60
    const equityRequiredToCall = Math.floor(betSize / (betSize + betSize + 1) * 100)

    return (
      <article className="flex items-baseline pl1 pv1">
        <p className="fw7 pr1">Pot Odds:</p>
        <p className="pr1">Facing a</p>
        <select
          onChange={this.changeBetSize}
          defaultValue={1}
          name="bet-size"
          className="bg-green"
        >
          <option value={2}>2x pot</option>
          <option value={1}>1x pot</option>
          <option value={3 / 4}>3/4 pot</option>
          <option value={2 / 3}>2/3 pot</option>
          <option value={1 / 2}>1/2 pot</option>
          <option value={1 / 3}>1/3 pot</option>
          <option value={1 / 4}>1/4 pot</option>
        </select>
        <p className="pl1">
          bet, I need <span className="f4 fw7">{equityRequiredToCall}%</span> equity to call.
        </p>

        {/* <h3>Outs:</h3>
        <div>
          <p className="f2 fw7">{outs}</p>
          <div>
            <button
              onClick={this.decreaseOuts}
              className="mr1 bg-black br1 pa1 tc f4 lh-solid ttu tracked white"
            >
              &mdash;
            </button>
            <button
              onClick={this.increaseOuts}
              className="bg-black br1 pa1 tc f4 lh-solid ttu tracked white"
            >
              +
            </button>
          </div>
        </div> */}
      </article>
    )
  }
}

class ImpliedOdds extends Component {
  state = { equity: 0.1 }

  changeEquity = event => this.setState({ equity: Number(event.target.value) })

  render() {
    const { equity } = this.state

    // See "Poker Math That Matters", p. 68
    const multipleOfBetsNeededToCall = Math.round((1 / equity - 1) * 10) / 10

    return (
      <article className="flex items-baseline pl1 pv2">
        {/* <p className="fw7 pr1">Implied Odds:</p> */}
        <p className="pr1">To call with</p>
        <select
          onChange={this.changeEquity}
          defaultValue={0.1}
          name="equity"
          className="bg-green shadow"
        >
          <option value={0.35}>35%</option>
          <option value={0.3}>30%</option>
          <option value={0.25}>25%</option>
          <option value={0.2}>20%</option>
          <option value={0.18}>18%</option>
          <option value={0.16}>16%</option>
          <option value={0.12}>12%</option>
          <option value={0.1}>10%</option>
          <option value={0.06}>6%</option>
          <option value={0.04}>4%</option>
        </select>
        <p className="pl1">
          equity, I need to win <span className="f4 fw7">{multipleOfBetsNeededToCall}x</span>{' '}
          the bet by the river.
        </p>
      </article>
    )
  }
}

/* 
 *
 * Advice
 * 
 */

// TODO: filter through advice in the render function of Range?
// TODO: in addition to advice (bet size, etc.) and tools (calc pot odds, spr, etc.), also display a combo breakdown of my preflop range?
const Advice = ({ position, opponent }) => (
  <Fragment>
    <h2>Bet size</h2>
    <p>Details...</p>
  </Fragment>
)
