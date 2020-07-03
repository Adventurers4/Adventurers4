import React from 'react';
// import SingleNote from "./SingleNote.js";
import axios from "axios";
import './App.css';
// Receive items data through props

class SingleNote extends React.Component {
    constructor(props) {
        super(props);
      this.state={
          id:this.props.id
        // id:'',
        // notes:this.props.id
          }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit() {
        // e.preventDefault()
        var noteDelete = {
            id:this.state.id
        }; 
        // var note = {this.state
        //     id: this.state.id
        // };
       
        axios.post('http://localhost:5000/delNotes', noteDelete)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ id: 0})
    }
       
    // handleRemove = (e) => {
    //     const id = this.state.id;
    //     const url = 'http://localhost:5000/delNotes';
    //     // const id = document.querySelectorAll("li").props['data-id'];
    //     e.preventDefault();
    //     axios.post(url , id)
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }
    // handleNoteDelete = (note) => {
    //     var noteId = note.id;
    //     var newNotes = this.state.notes.filter(function (note) {
    //         return note.id !== noteId;
    //     });
    //     this.setState({ notes: newNotes });
    // };
    // onUpdate(){

    // }
    render() {
        return (
            <div >
                
                <form className="divNote">
                    <div className="date">{this.props.date}</div><br/>
                <div className="list">{this.props.text}</div>
                
                {/* <div className="list">{this.props.id}</div> */}
                    <button  onClick={this.onSubmit} >Delete</button>
                    {/* <button onClick={this.onUpdate} >Update</button> */}
                    {/* <button onClick={this.handleNoteDelete(17)} >Delete</button> */}
                </form>
                <br/>
            </div>
        );
    };
}
export default SingleNote;
//onClick={this.onSubmit(this.props.id)}