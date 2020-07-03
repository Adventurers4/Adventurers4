import React from 'react';
import axios from "axios";
import AllNotes from './AllNotes';
import { Redirect } from 'react-router-dom';
import App from './App.js';
import './App.css';
// import AllNotes  from './AllNotes';
class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            date: ""
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.logout = this.logout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
  
    onChangeText(e) {
        this.setState({ text: e.target.value })
    }
  
    onChangeDate(e) {
        var current_datetime = new Date()
        var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth()+1) + "-" + current_datetime.getDate() + "-" + current_datetime.getHours() + ":" + current_datetime.getMinutes()+":" + current_datetime.getSeconds()
        this.setState({ date: formatted_date})
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            text: this.state.text,
            date: this.state.date
        };
    
        axios.post('http://localhost:5000/Note', user)
            .then((res) => {
                console.log(res.data)

            }).catch((error) => {
                console.log(error)
            });

        this.setState({ text: '', date: '' })

      
    }
    logout(){
       

        axios.post('http://localhost:5000/logout')
            .then((res) => {
                console.log("from logout in")
                console.log(res.data)
                this.setState({ redirect: true })

            }).catch((error) => {
                console.log(error)
            });  
    }
    render() {
       
        const { redirect } = this.state;

        if (redirect) {

            return <Redirect to='/App' exact component={App} />;
        }
        return (
            // <div>
            //     <button onClick={this.logout}>logout</button>
            //     <form onSubmit={this.onSubmit}>

            //     <div>
            //         <textarea className="text"
            //             placeholder="enter"
            //             rows={6} 
            //             value={this.state.text} onChange={this.onChangeText}
            //                 // onChange={this.onChangeDate}
            //             />
            //             <button onClick={this.onChangeDate}>Add</button>
                        
                 
            //     </div>

            //  </form>
            //    <div><AllNotes/></div>
            // </div>
            <div>
                <button onClick={this.logout}>logout</button>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <textarea
                            placeholder="Write your note"
                            rows={6}
                            value={this.state.text} onChange={this.onChangeText}
                        // onChange={this.onChangeDate}
                        />
                        <br></br>
                        <button className="button1" onClick={this.onChangeDate}>Add</button>
                    </div>
                </form>
                <div><AllNotes /></div>
            </div>
        );
    }
};
export default Note