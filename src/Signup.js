
import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Login from './Login.js';
import './App.css';
class Signup extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            email: ""
        }
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeUserName(e) {
        this.setState({ name: e.target.value })
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        axios.post('http://localhost:5000/register', user)
            .then((res) => {
                console.log(res.data)
                this.setState({ redirect: true })
            }).catch((error) => {
                console.log(error)
            });
        this.setState({ name: '', email: '', password: '' })
    }
    render() {
        const { redirect } = this.state;

        if (redirect) {

            return <Redirect to='/Login' exact component={Login} />;
        }
        return (
            <div>
                <form onSubmit={this.onSubmit} className="center">
                    <div id="signup" className="center1">
                        <i class="fa fa-user icon"></i>
                        <input type="text" id="name" placeholder=" Username" value={this.state.name} onChange={this.onChangeUserName} />
                        <br></br> <br></br>  <i class="fa fa-envelope icon"></i><input type="email" id="email" placeholder=" Email" value={this.state.email} onChange={this.onChangeUserEmail} />
                        <br></br> <br></br> <i class="fa fa-key icon"></i><input type="password" id="password" placeholder=" Password" value={this.state.password} onChange={this.onChangeUserPassword} />
                        <br></br> <br></br><button id="send">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default Signup;


