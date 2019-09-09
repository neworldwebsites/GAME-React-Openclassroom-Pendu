import React, { Component } from 'react';


class Keyboard extends Component{

	componentDidMount() {
		window.addEventListener("keyup", (e) => {
			
			if (this.props.alphabet.indexOf(e.key) !== -1) {
				this.props.action(e.key);
			}
		})
	}

	render() {
		return (
			<div id="keyboard">
				{
				// array 26 letters, 2eme param map>index
				this.props.alphabet.map(
					(letter, key) => {
						return <button
							key={'keyboard=> ' + key}
							onClick={() =>
								this.props.action(letter, key)}
							className={this.props.usedLetter.indexOf(letter) !== -1 ? "used" : ""}
						>
							{letter.toUpperCase()}
						</button>
				})

				}
			</div>
		)
	}


}



export default Keyboard;