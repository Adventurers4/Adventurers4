import React from 'react';
 import Note from './Note.js';
import axios from "axios";
import { Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import './App.css';
class Login extends React.Component {
    constructor(){
    super();
    this.state = {
        email: "",
        password: ""
    }
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
}
    
    onChangeUserEmail(e) {
        this.setState({ email: e.target.value })
    }
  
    onChangeUserPassword(e) {
        this.setState({ password: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('http://localhost:5000/login', user)
            .then((res) => {
                console.log(res.data)
                this.setState({ redirect: true })
                console.log(this.state.redirect)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ email: '', password: ''})
      
    render() {
        const { redirect } = this.state;

        if (redirect===true) {

            return <Redirect to='/Note' exact component={Note} />;
        }


        return (
           
            <div>
                <form onSubmit={this.onSubmit} className="center">
                    <div id="login" className="center1">
                        <i class="fa fa-envelope icon"></i>
                        <input type="email" id="email" placeholder=" Email" value={this.state.email} onChange={this.onChangeUserEmail} />
                        <br></br> <br></br>
                        <i class="fa fa-key icon"></i>
                        <input type="password" id="password" placeholder=" Password" value={this.state.password} onChange={this.onChangeUserPassword} />
                        <br></br> <br></br>
                        <button id="send">Send</button>
                    </div>
                </form>
            </div>


        )
    }
}
export default Login;