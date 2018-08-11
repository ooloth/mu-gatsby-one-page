const MovesPage = () => (
  <Fragment>
    <main className="avenir" style={{ minHeight: `calc(100vh - 36px)` }}>
      <LabHero title="Moves" description="Memorize your chess opening repertoire." />

      <MovesApp />
    </main>

    <Footer />
  </Fragment>
)

class MovesApp extends Component {
  state = { loggedIn: true, user: `ooloth` }

  render() {
    const { loggedIn, user } = this.state

    return (
      <section className="container pv5">
        {loggedIn ? <RepList /> : <button>Log in</button>}
        <RepDetails />
        <Board />
        <BackToLab />
      </section>
    )
  }
}

/*
 *
 * Rep List
 *
 */

// TODO: eventually, use a unique key that will allow sorting (e.g. dateCreated )
const RepList = () => (
  <Fragment>
    {/* <h2 className="pb3 f2 fw9">Repertoires</h2> */}
    <ul className="nt3 pb5">
      {repertoires.map((repertoire, i) => (
        <RepListItem key={i} repertoire={repertoire} />
      ))}
    </ul>
  </Fragment>
)

const RepListItem = ({ repertoire }) => (
  <li className="mt3 shadow-lg pa3 bg-green animate hover:bg-white">
    <div className="flex f6 fw7 black-60">
      <p>11 moves&nbsp;&nbsp;|&nbsp;&nbsp;</p>
      <p>{repertoire.author}</p>
    </div>
    <p className="mt1 f3 fw9">{repertoire.title}</p>
  </li>
)

const repertoires = [{ title: `Test repertoire`, author: `ooloth` }]

const RepDetails = ({ repertoire }) => <section>Repertoire details</section>

class Board extends Component {
  componentDidMount = () => {
    // Make sure jQuery is loaded
    if (!loadjs.isDefined('jquery')) {
      loadjs(
        `https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js`,
        `jquery`
      )
    }

    // Load the board
    // See all options here: http://chessboardjs.com/examples#1001
    loadjs.ready(`jquery`, () => {
      var ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R'

      var boardConfig = {
        pieceTheme: '../../chesspieces/wikipedia/{piece}.png',
        position: ruyLopez
      }
      var board = ChessBoard('board', boardConfig)
    })
  }

  render() {
    return <figure id="board" />
  }
}

import React, { Component, Fragment } from 'react'
import ChessBoard from 'chessboardjs'
import '../../components/moves/chessboardjs-0.3.0/css/chessboard-0.3.0.css'
import loadjs from 'loadjs'

import LabHero from '../../components/lab/LabHero'
import BackToLab from '../../components/lab/BackToLab'
import Footer from '../../sections/Footer'

export default MovesPage
