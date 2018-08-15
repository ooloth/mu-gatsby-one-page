class CardsPage extends Component {
  state = {
    firebaseReady: false,
    isSignedIn: false,
    currentScreen: `home`,
    activeDeck: null
  }

  componentDidMount = () => {
    if (!firebase.apps.length) {
      this.initFirebase()
    } else {
      this.setState({ firebaseReady: true })
    }
  }

  initFirebase = () => {
    const { data } = this.props

    // Init Firebase app using config stored in environment variables
    firebase.initializeApp(data.site.siteMetadata.firebaseConfig)
    firebase.firestore().settings({ timestampsInSnapshots: true })

    // Save database references
    this.cardsRef = firebase.firestore().collection('cards')
    this.decksRef = firebase.firestore().collection('decks')
    this.collectionsRef = firebase.firestore().collection('collections')
    this.usersRef = firebase.firestore().collection('users')

    this.setState({ firebaseReady: true })

    // How to read data
    this.cardsRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`)
      })
    })
  }

  updateAuthState = isSignedIn => {
    this.setState({ isSignedIn })
    this.currentUser = firebase.auth().currentUser
  }

  addNewCard = () => {
    // How to write data
    this.cardsRef
      .add({
        question: '1 + 1',
        answer: '2'
      })
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(error => {
        console.error('Error adding document: ', error)
      })
  }

  viewDeckDetails = deckId => {
    this.setState({
      currentScreen: `deck`,
      activeDeck: decks.find(deck => deck.id === deckId)
    })
  }

  backToHome = () => this.setState({ currentScreen: `home` })

  render() {
    const { firebaseReady, isSignedIn, currentScreen, activeDeck } = this.state

    return (
      <Base>
        {/* <PageMetadata page={data.metadata.siteMetadata.cardsPage} /> */}

        <main className="avenir" style={{ minHeight: `calc(100vh - 36px)` }}>
          <LabHero
            title="Cards"
            description="Learn anything using flashcards and spaced repetition."
          />

          {firebaseReady && (
            <>
              <SignInScreen
                firebase={firebase}
                updateAuthState={this.updateAuthState}
              />

              {isSignedIn && (
                <>
                  {currentScreen === `home` ? (
                    <HomeScreen viewDeckDetails={this.viewDeckDetails} />
                  ) : currentScreen === `deck` ? (
                    <DeckScreen deck={activeDeck} backToHome={this.backToHome} />
                  ) : null}
                </>
              )}
            </>
          )}
        </main>

        <Footer />
      </Base>
    )
  }
}

/*
 *
 * Home Screen
 *
 */

class HomeScreen extends Component {
  render() {
    const { viewDeckDetails } = this.props

    return (
      <section className="container pv5">
        <h2 className="pb3 tc f4">Decks</h2>
        <DeckList viewDeckDetails={viewDeckDetails} />
        <BackToLab />
      </section>
    )
  }
}

/*
 *
 * Home > Deck List
 *
 */

class DeckList extends Component {
  render() {
    const { viewDeckDetails } = this.props

    return (
      <ul className="pb5">
        {decks.map((deck, i) => (
          <DeckInDeckList key={i} deck={deck} viewDeckDetails={viewDeckDetails} />
        ))}
      </ul>
    )
  }
}

const decks = [
  {
    id: `deck1`,
    title: `Deck 1`,
    author: `ooloth`,
    cards: [
      { id: `card1`, question: `1 + 1`, answer: `2` },
      { id: `card2`, question: `2 + 2`, answer: `4` }
    ]
  },
  {
    id: `deck2`,
    title: `Deck 2`,
    author: `ooloth`,
    cards: [
      { id: `card1`, question: `1 + 1`, answer: `2` },
      { id: `card2`, question: `2 + 2`, answer: `4` }
    ]
  }
]

/*
 *
 * Home > Deck List > DeckInDeckList
 *
 */

const DeckInDeckList = ({ deck, viewDeckDetails }) => (
  <li className="relative mt4 bg-green shadow-lg pv2 ph3">
    {/* Click handler */}
    <button
      onClick={() => viewDeckDetails(deck.id)}
      className="absolute top-0 left-0 z-2 w-100 h-100"
    />

    <div className="flex f6 fw6 black-70">
      <p>{deck.cards.length} cards&nbsp;&nbsp;|&nbsp;&nbsp;</p>
      <p>{deck.author}</p>
    </div>
    <p className="mt1 f3 fw9">{deck.title}</p>
  </li>
)

/*
 *
 * Deck Screen
 *
 */

class DeckScreen extends Component {
  state = {
    listMode: true,
    editMode: false,
    studyMode: false
  }

  startStudySession = () =>
    this.setState({ listMode: false, editMode: false, studyMode: true })

  editDeck = () =>
    this.setState({ listMode: false, editMode: true, studyMode: false })

  cancelDeckEdits = () => {
    console.log(`Edits cancelled`)
    // TODO: save a snapshot of the deck when entering edit mode and restore that version?
    this.setState({ listMode: true, editMode: false, studyMode: false })
  }

  saveDeckEdits = () => {
    console.log(`Edits saved`)
    // TODO: save updates to Firestore (already autosaved while typing?)
    this.setState({ listMode: true, editMode: false, studyMode: false })
  }

  render() {
    const { deck, backToHome } = this.props
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
                deck={deck}
                startStudySession={this.startStudySession}
                editDeck={this.editDeck}
                backToHome={backToHome}
              />
            </Fragment>
          ) : editMode ? (
            <Fragment>
              <p className="tc">listMode: {listMode ? `true` : `false`}</p>
              <p className="tc">editMode: {editMode ? `true` : `false`}</p>
              <p className="pb3 tc">studyMode: {studyMode ? `true` : `false`}</p>

              <DeckInEditMode
                deck={deck}
                cancelEdits={this.cancelDeckEdits}
                saveEdits={this.saveDeckEdits}
              />
            </Fragment>
          ) : studyMode ? (
            <DeckInStudyMode deck={deck} />
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
  // state = {
  //   deck: [
  //     { id: `card1`, question: `1 + 1`, answer: `2` },
  //     { id: `card2`, question: `2 + 2`, answer: `4` }
  //   ]
  // }

  render() {
    const { startStudySession, editDeck, backToHome } = this.props
    const { deck } = this.props

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
          {deck.cards.map((card, i) => (
            <CardInListMode key={i} card={card} />
          ))}
        </ul>

        <button onClick={backToHome} className="link">
          Back to Home
        </button>
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
    deck: this.props.deck
  }

  // TODO: Update the top-level version instead of the local version? Easier when just going straight to/from Firestore? Need to global state solution like Context or Unstated?
  updateQuestion = (card, e) => {
    const { deck } = this.state
    const currentCardId = card.id

    // console.log(`find the card`, [...deck.cards])

    const updatedDeck = ([...deck.cards].find(
      card => card.id === currentCardId
    ).question = e.target.value)

    this.setState({ ...updatedDeck })
  }

  updateAnswer = (card, e) => {
    const { deck } = this.state
    const currentCardId = card.id

    const updatedDeck = ([...deck].find(card => card.id === currentCardId).answer =
      e.target.value)

    this.setState({ ...updatedDeck })
  }

  render() {
    const { cancelEdits, saveEdits } = this.props
    const { deck } = this.state

    console.table(deck.cards)

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
          {deck.cards.map((card, i) => (
            <CardInEditMode
              key={i}
              card={card}
              updateQuestion={this.updateQuestion}
              updateAnswer={this.updateAnswer}
            />
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

const CardInEditMode = ({ card, updateQuestion, updateAnswer }) => (
  <li className="mt4 flex flex-wrap shadow-lg pv2 ph3">
    <div className="w-100">
      <h3 className="mb2 f5">Question</h3>
      <input
        onChange={e => updateQuestion(card, e)}
        id={card.id}
        value={card.question}
        className="bg-near-white pa2 w-100"
      />
    </div>

    <div className="mt3 w-100">
      <h3 className="mb2 f5">Answer</h3>
      <input
        onChange={updateAnswer}
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
    studyDeck: this.props.deck,
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
    console.log(`studyDeck.cards[${cardIndex}] was answered correctly`)
    this.checkSessionStatus()
  }

  markCardIncorrect = () => {
    const { cardIndex } = this.state
    console.log(`studyDeck.cards[${cardIndex}] was answered incorrectly`)
    this.checkSessionStatus()
  }

  checkSessionStatus = () => {
    const { studyDeck, cardIndex } = this.state
    // If that was the last card, show the session results
    if (cardIndex === studyDeck.cards.length - 1) this.showResults()
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
              Card {cardIndex + 1} / {studyDeck.cards.length}
            </p>
            <p className="tc">cardIndex: {cardIndex}</p>
            <p className="pb3 tc">sideShown: {sideShown}</p>

            {/* Note: The perspective gets more subtle as the number gets higher */}
            <div className="pb4" style={{ perspective: `1000px` }}>
              <CardInStudyMode
                card={studyDeck.cards[cardIndex]}
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

/* 
 *
 * Queries
 * 
 */

export const query = graphql`
  query {
    site {
      siteMetadata {
        firebaseConfig {
          apiKey
          authDomain
          databaseURL
          projectId
          storageBucket
          messagingSenderId
        }
      }
    }
  }
`

import React, { Component, Fragment } from 'react'
import { graphql } from 'gatsby'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import Base from '../../components/Base'
// import PageMetadata from '../../components/PageMetadata'

import LabHero from '../../components/lab/LabHero'
import SignInScreen from '../../components/cards/SignIn'
import BackToLab from '../../components/lab/BackToLab'
import Footer from '../../sections/Footer'

export default CardsPage
