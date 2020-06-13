import React from 'react'
import TodoItem from './TodoItem'
/*
#todo>div{margin: 10px;border:1px solid black;padding: 10px;}
#todo>div.completed{text-decoration: line-through;opacity: 0.5;}

*/
class Todo extends React.Component {
    state = {
        elements: [
            { id: 123, isCompleted: true, title: "XDvb" },
            { id: 124, isCompleted: false, title: "pffDn" },
            { id: 125, isCompleted: false, title: "sfdfXsdfi" },
            { id: 126, isCompleted: false, title: "vXfdD" },
            { id: 127, isCompleted: false, title: "nXiDn" },
        ],
        inputValue: ''
    }
    markCompleted(id) {
        const index = this.state.elements.findIndex(v => v.id == id);
        const newElements = this.state.elements;
        newElements[index].isCompleted = true;
        this.setState({ elements: newElements })
    }
    addItem() {
        const item = {
            id: Math.random(),
            title: this.state.inputValue
        };
        const newElements = [item, ...this.state.elements];
        this.setState({ elements: newElements })
        this.setState({ inputValue: '' })
    }
    inputHandler(e) {
        const val = e.target.value;
        this.setState({ inputValue: val })
    }
    render() {
        const elements = this.state.elements.map((v, i) => <TodoItem key={i} element={v} markClicked={this.markCompleted.bind(this)} />)
        const elements = this.state.elements.map((v, i) =>
        <div className={v.isCompleted ? "completed" : ""} >
            <h2>{v.title}</h2>
            <button onClick={markHandler} disabled={!!v.isCompleted}>Zakończone</button>
        </div>
        );
        return (
            <div id="todo">
                <input type="text" value={this.state.inputValue} onChange={this.inputHandler.bind(this)}></input><br />
                <button onClick={this.addItem.bind(this)}>Dodaj</button>
                {elements}
            </div>
        )
    }
}

export default Todo