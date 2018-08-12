const CardsPage = () => (
  <Fragment>
    <main className="avenir" style={{ minHeight: `calc(100vh - 36px)` }}>
      <LabHero
        title="Cards"
        description="Learn anything using flashcards and spaced repetition."
      />

      <CardsApp />
    </main>

    <Footer />
  </Fragment>
)

/*
 *
 * Cards App
 *
 */

class CardsApp extends Component {
  state = { listMode: true, editMode: false, studyMode: false }

  startStudySession = () =>
    this.setState({ listMode: false, editMode: false, studyMode: true })

  editDeck = () =>
    this.setState({ listMode: false, editMode: true, studyMode: false })

  cancelDeckEdits = () => {
    console.log(`Edits cancelled`)
    this.setState({ listMode: true, editMode: false, studyMode: false })
  }

  saveDeckEdits = () => {
    console.log(`Edits saved`)
    this.setState({ listMode: true, editMode: false, studyMode: false })
  }

  render() {
    const { listMode, editMode, studyMode } = this.state

    return (
      <Fragment>
        <section className="container pv5">
          {listMode ? (
            <Fragment>
              <p className="tc">listMode: {listMode ? `true` : `false`}</p>
              <p className="tc">editMode: {editMode ? `true` : `false`}</p>
              <p className="pb3 tc">studyMode: {studyMode ? `true` : `false`}</p>

              <DeckInListMode
                startStudySession={this.startStudySession}
                editDeck={this.editDeck}
              />
              <BackToLab />
            </Fragment>
          ) : editMode ? (
            <Fragment>
              <p className="tc">listMode: {listMode ? `true` : `false`}</p>
              <p className="tc">editMode: {editMode ? `true` : `false`}</p>
              <p className="pb3 tc">studyMode: {studyMode ? `true` : `false`}</p>

              <DeckInEditMode
                cancelEdits={this.cancelDeckEdits}
                saveEdits={this.saveDeckEdits}
              />
            </Fragment>
          ) : studyMode ? (
            <DeckInStudyMode />
          ) : null}
        </section>
      </Fragment>
    )
  }
}

/*
 *
 * List Mode: Deck
 *
 */

class DeckInListMode extends Component {
  state = {
    deck: [{ question: `1 + 1`, answer: `2` }, { question: `2 + 2`, answer: `4` }]
  }

  render() {
    const { startStudySession, editDeck } = this.props
    const { deck } = this.state

    return (
      <Fragment>
        <h2 className="pb3 tc f4">Deck in List View</h2>

        <div className="flex flex-wrap nl3">
          <button
            className="btn-green ml3 mb4"
            style={{ width: `calc(50% - 1rem)` }}
            onClick={startStudySession}
          >
            Study deck
          </button>

          <button
            className="btn-green ml3 mb4"
            style={{ width: `calc(50% - 1rem)` }}
            onClick={editDeck}
          >
            Edit deck
          </button>
        </div>

        <ul className="nt4 pb5">
          {deck.map((card, i) => (
            <CardInListMode key={i} card={card} />
          ))}
        </ul>
      </Fragment>
    )
  }
}

/*
 *
 * List Mode: Card
 *
 */

const CardInListMode = ({ card }) => (
  <li className="mt4 flex flex-wrap shadow-lg pv2 ph3">
    <div className="w-100">
      <h3 className="mb2 f5">Question</h3>
      <p>{card.question}</p>
    </div>

    <div className="mt3">
      <h3 className="mb2 f5">Answer</h3>
      <p>{card.answer}</p>
    </div>
  </li>
)

/*
 *
 * Edit Mode: Deck
 *
 */

class DeckInEditMode extends Component {
  state = {
    deck: [{ question: `1 + 1`, answer: `2` }, { question: `2 + 2`, answer: `4` }]
  }

  updateCard = () => console.log(`editing`)

  render() {
    const { cancelEdits, saveEdits } = this.props
    const { deck } = this.state

    return (
      <Fragment>
        <h2 className="pb3 tc f4">Deck in Edit View</h2>

        <div className="flex flex-wrap nl3">
          <button
            className="btn-green ml3 mb4"
            style={{ width: `calc(50% - 1rem)` }}
            onClick={cancelEdits}
          >
            Cancel edits
          </button>

          <button
            className="btn-green ml3 mb4"
            style={{ width: `calc(50% - 1rem)` }}
            onClick={saveEdits}
          >
            Save edits
          </button>
        </div>

        <ul className="nt4 pb5">
          {deck.map((card, i) => (
            <CardInEditMode key={i} card={card} updateCard={this.updateCard} />
          ))}
        </ul>
      </Fragment>
    )
  }
}

/*
 *
 * Edit Mode: Card
 *
 */

const CardInEditMode = ({ card, updateCard }) => (
  <li className="mt4 flex flex-wrap shadow-lg pv2 ph3">
    <div className="w-100">
      <h3 className="mb2 f5">Question</h3>
      <input
        onChange={updateCard}
        value={card.question}
        className="bg-near-white pa2 w-100"
      />
    </div>

    <div className="mt3 w-100">
      <h3 className="mb2 f5">Answer</h3>
      <input
        onChange={updateCard}
        value={card.answer}
        className="bg-near-white pa2 w-100"
      />
    </div>
  </li>
)

/*
 *
 * Study Mode: Deck
 *
 */

class DeckInStudyMode extends Component {
  state = {
    studyDeck: [
      { question: `1 + 1`, answer: `2` },
      { question: `2 + 2`, answer: `4` }
    ],
    cardIndex: 0,
    sideShown: `question`,
    answerSeen: false,
    sessionFinished: false
  }

  flipCard = () => {
    const { sideShown } = this.state
    if (sideShown === `question`) {
      this.setState({ sideShown: `answer`, answerSeen: true })
    } else {
      this.setState({ sideShown: `question` })
    }
  }

  markCardCorrect = () => {
    const { cardIndex } = this.state
    console.log(`studyDeck[${cardIndex}] was answered correctly`)
    this.checkSessionStatus()
  }

  markCardIncorrect = () => {
    const { cardIndex } = this.state
    console.log(`studyDeck[${cardIndex}] was answered incorrectly`)
    this.checkSessionStatus()
  }

  checkSessionStatus = () => {
    const { studyDeck, cardIndex } = this.state
    // If that was the last card, show the session results
    if (cardIndex === studyDeck.length - 1) this.showResults()
    // Otherwise, move to the next card
    else this.moveToNextCard()
  }

  moveToNextCard = () => {
    const { studyDeck, cardIndex } = this.state

    // Make sure new card index doesn't go past the end of the array
    let newCardIndex
    if (cardIndex === studyDeck.length - 1) newCardIndex = 0
    else newCardIndex = cardIndex + 1

    this.setState({
      cardIndex: newCardIndex,
      sideShown: `question`,
      answerSeen: false
    })
  }

  showResults = () => this.setState({ sessionFinished: true })

  render() {
    const {
      studyDeck,
      cardIndex,
      sideShown,
      answerSeen,
      sessionFinished
    } = this.state

    return (
      <Fragment>
        <h2 className="pt5 pb3 tc f4">Deck in Study View</h2>

        {sessionFinished ? (
          <div className="pb5 tc">
            <h3 className="pb3">All done! 🎉</h3>
            <p>Add results here...</p>
          </div>
        ) : (
          <Fragment>
            <p className="tc">
              Card {cardIndex + 1} / {studyDeck.length}
            </p>
            <p className="tc">cardIndex: {cardIndex}</p>
            <p className="pb3 tc">sideShown: {sideShown}</p>

            {/* Note: The perspective gets more subtle as the number gets higher */}
            <div className="pb4" style={{ perspective: `1000px` }}>
              <CardInStudyMode
                card={studyDeck[cardIndex]}
                sideShown={sideShown}
                flipCard={this.flipCard}
                answerSeen={answerSeen}
              />
            </div>

            {/* Buttons */}
            {answerSeen && (
              <div className="flex pb5">
                <button
                  onClick={this.markCardIncorrect}
                  className="btn-green mr2 w-50"
                >
                  Oops
                </button>

                <button
                  onClick={this.markCardCorrect}
                  className="btn-green ml2 w-50"
                >
                  Got it
                </button>
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

/*
 *
 * Study Mode: Card
 *
 */

const CardInStudyMode = ({ card, sideShown, flipCard, answerSeen }) => (
  <div
    className="relative shadow-lg pv2 ph3"
    style={{
      transform: sideShown === `answer` ? `rotateY(180deg)` : `rotateY(360deg)`,
      transformStyle: `preserve3d`,
      transition: `all .4s ease-in-out`
    }}
  >
    {/* Click handler */}
    <button className="absolute top-0 left-0 z-2 w-100 h-100" onClick={flipCard} />

    {/* Question */}
    <div className="relative z-1 bg-white" style={{ backfaceVisibility: `hidden` }}>
      <h3 className="mb2 f5">Question</h3>
      <p>{card.question}</p>
    </div>

    {/* Answer */}
    <div
      className="absolute top-0 left-0 pv2 ph3 w-100 h-100"
      style={{ transform: `rotateY(180deg)` }}
    >
      <h3 className="mb2 f5">Answer</h3>
      <p>{card.answer}</p>
    </div>
  </div>
)

import React, { Component, Fragment } from 'react'

import LabHero from '../../components/lab/LabHero'
import BackToLab from '../../components/lab/BackToLab'
import Footer from '../../sections/Footer'

export default CardsPage
