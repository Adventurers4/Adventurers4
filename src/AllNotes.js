import React from 'react';
import SingleNote from "./SingleNote.js";
import axios from "axios";

// Receive items data through props

class AllNotes extends React.Component {
    constructor() {
        super();
        this.state = {
            notes: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/selectNotes')
            .then(res => {
                console.log(res.data.data)
                //  this.state.notes = res.data;
                this.setState({ notes: res.data.data});
            })
    }
      //arr[i].text
/*[
RowDataPacket {
id: 2,
text: 'note1',
date: 2020-06-29T21:00:00.000Z,
idu: 1
},
RowDataPacket {
id: 3,
text: 'hey',
date: 2020-06-30T21:00:00.000Z,
idu: 1
}
] */
render() {
    return (
        <div >
            {/* /* Map through items and pass each item to singlenote component*/ }
            {this.state.notes.map(function (ele) {
                return (
                    /* Pass useful attributes to SingleNote */
                    <SingleNote text={ele.text} date={ele.date} id={ele.id} />
                )
            })}
            {/* <button onClick={} >Delete</button> */}
        </div>
    );
};
}
export default AllNotes;