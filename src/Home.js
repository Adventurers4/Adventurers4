import React from 'react';
import './App.css';
import Logo from "./image.png";
class Home extends React.Component {
    render() {
        return (
            <div className="para">
                <img src={Logo} />
                <p> Where do you put your thoughts, your ideas, or the name of a movie someone recommended? Whether inspiration strikes when you're at home or on the go, our note app offers an easy,  convenient way to store all this information in one place. Note-taking apps are the online equivalent of notebooks, and because they're digital, they can do more for you than paper ever could. Most can store your notes </p>
            </div>
        )
    }
}
export default Home;