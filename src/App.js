import React, { Component } from 'react';
import './App.css';
import logo from './img/logo.svg';
import Scoring   from './Components/Scoring';
import Keyboard from './Components/Keyboard';
import CurrentWord from './Components/CurrentWord';
// import PropTypes from 'prop-types';


const ALPHABET = "ABCDEFGHIJKLNMOPQRSTUVWXYZ";

class App extends Component {
// STATE:
// //////
  constructor(props) {
    super();
    this.state = {
      alphabet: ALPHABET.toLowerCase().split(''),       
      allWords: [
        "FUCK", "GOOD", "CODING", "EXTRA", "DANCING", "JAVASCRIPT", "FRAMEWORKS", "LICORNE", "ENGLISH"
      ],  
      currentWord: null,      
      usedLetter: [], 
      point:0, 
      nbrEssai: 9,
      nbrEssaiMax: 9


    };
  }


// FUNCTIONS: 
// //////////
// nouvelle partie initialiser score et random mot
  componentDidMount = () => {
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) { // touche return
        this.initGame()
      }
    })
    this.initGame()
  } 
  randomWord = () => {
    const randomIndex = Math.floor(Math.random() * this.state.allWords.length);   

    return this.state.allWords[randomIndex].toLowerCase()
  }

  initGame = () => {
    this.setState({
      currentWord: this.randomWord(),
      usedLetter: [],
      nbrEssai: 9,
      point:0
    })
  }  


// event onclick  
  clickLetter = (letter) => {

    if (this.state.usedLetter.indexOf(letter) === -1) {
      // for prevent multiple click on same letter)
      const usedLetter = [letter, ...this.state.usedLetter];

      //calcul nbrEssai
      let nbrEssai = this.state.nbrEssai
      if (this.state.currentWord.indexOf(letter) === -1) {
        nbrEssai = this.state.nbrEssai - 1;
      }

      //calcul point state
      let point = 1
      for (let i = 0; i < this.state.currentWord.length; i++) {
        if (usedLetter.indexOf(this.state.currentWord[i]) === -1) {
          point = 0;
        }
      }

      //calcul lost state this.state.nbrEssaiMax
      if (nbrEssai <= 0 && point === 0) {
        point = -1
        nbrEssai = nbrEssai;
        setTimeout(() => {
          this.initGame();
        },3000)
      }
      if (nbrEssai > 0 && point === 1) {
        point = 1
      }

      //update state
      this.setState({ usedLetter, nbrEssai, point })
    }

  }

  

  render() {
    return (

      <div id="jeu">
        
    
        <h1>Le Jeu du Pendu</h1>
      

        {
          (this.state.currentWord !== null) &&

          <CurrentWord
            currentWord={this.state.currentWord}
            usedLetter={this.state.usedLetter}
            point={this.state.point}
          />
        }

        <img src={logo} className="App-logo" alt="logo" /> 

        <button className="start" onClick={() => this.initGame()}>NEW</button>

        { 
        this.state.point === 0  ?
        <Scoring
          point={this.state.point}
          nbrEssai={this.state.nbrEssai}
            /> :
            (this.state.point === 1 ?
              <p className={'fin'}>💜 GAGNÉ !!</p> :
              <p className={'fin'}>💔 PERDU !</p>)
        }

        <Keyboard
          alphabet={this.state.alphabet}
          action={this.clickLetter}
          usedLetter={this.state.usedLetter}
        />

        
      </div>

    );
  }

}

export default App;
