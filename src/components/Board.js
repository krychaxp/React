import React from 'react'
/*

#board{text-align: center;padding: 20px;border: 1px solid black;display: flex;justify-content: center;align-items: center;flex-direction: column;margin: 20px;}
#board span{width: 30px;display: inline-block;}
#board>.board-box{display: flex;flex-flow: row wrap;width: 150px;}
#board>.board-box>button{box-sizing: border-box;border: 1px solid black;border-radius: 0;background-color: #ddd;width: 50px;height: 50px;}
*/
class Board extends React.Component {
    getTime=()=>new Date().toLocaleString().split(",")[1].trim()
    state = {
        squares: Array(9).fill(null),
        nowTurn: "O",
        canPlay: true,
        time:new Date().toLocaleString().split(",")[1].trim()
    }
    checkWinner = () => {
        const { squares } = this.state;
        let next=true;
        [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]].forEach(v=> {
            const [a, b, c] = v;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setTimeout(() => { window.alert(`winner is ${squares[a]}`); this.playAgain() }, 100)
                console.log("in");
                this.setState({ canPlay: false })
                next=false;
                return;
            }
        })
        if(squares.every(v=>v) && next){
            setTimeout(() => { window.alert("Draw");this.playAgain() }, 100)
            this.setState({ canPlay: false })
            return;
        }
    }
    playAgain = () => {
        if (window.confirm("Play again?")) {
            const newSquares = this.state.squares.fill(null);
            this.setState({ squares: newSquares, canPlay: true, nowTurn: "O" })
        }
    }
    handleClick = (i) => {
        const { squares, nowTurn, canPlay } = this.state
        if (!canPlay) { this.playAgain(); return }
        if (squares[i]) { return }
        squares[i] = nowTurn;
        this.setState({ squares: squares, nowTurn: nowTurn === "O" ? "X" : "O" });
        this.checkWinner();
    }
    renderSquares = (i) =><button key={i} onClick={()=>this.handleClick(i)}>{this.state.squares[i]}</button>
    render() {
        const { squares, nowTurn } = this.state
        const renderSquares = squares.map((v, i) => this.renderSquares(i))
        setInterval(()=>{this.setState({time:this.getTime()})},1000)
        return (
            <div id="board">
                <img src="/img/avatar-mini.png" width="200" alt="logo"/>
                <h2>Aktualny czas: {this.state.time}.</h2>
                <h1>Now is turn: <span>{nowTurn}</span></h1>
                <div className="board-box">{renderSquares}</div>
            </div>
        )
    }
}
export default Board