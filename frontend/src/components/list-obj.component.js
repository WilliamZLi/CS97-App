import React, { Component } from "react";
import Image from 'react-bootstrap/Image'
import axios from 'axios';
axios.defaults.withCredentials = true

export default class ListObj extends Component {
  constructor(props) {
    super(props)
    this.state = {
      array: null,
      image: null
    }
  }
  
  componentDidMount() {
    axios.post('http://localhost:5000/objs/get-obj')
    .then(arr => {
      console.log('log arr', arr)
      this.setState({ array: arr.data })
      console.log('log data', arr.data)
      var clone = []
      for (var i = 0; i < arr.data.length; i++) {
        var thumb = arr.data[i].photo;
        clone.push(thumb)
      }
      this.setState({ image: clone })
      console.log('done data')
      console.log(this.state.image)
    })
    .catch(err => {
      console.log(err)
      alert(err)
    })
  }


  render() {
    if (this.state.image === null) {
      return (<div className="text-center">
        <p>Loading</p>
      </div>)
    }
    else if (this.state.image.length === 0) {
      return (<div className="text-center">
        <p>No Images Found</p>
      </div>)
    }
    else if (this.state.image.length === 1) {
      console.log(this.state.image)
      return (<div className="text-center">
        <Image src={`data:image/jpeg;base64,${this.state.image[0]}`} style={{ maxWidth: 600, maxHeight: 600 }} alt="alt" />
      </div>)
    }
    else {
      console.log(this.state.image)
      return (<div className="text-center">
        <Image src={`data:image/jpeg;base64,${this.state.image[0]}`} style={{ maxWidth: 600, maxHeight: 600 }} alt="alt" />
        <Image src={`data:image/jpeg;base64,${this.state.image[1]}`} style={{ maxWidth: 600, maxHeight: 600 }} alt="alt" />
      </div>)
    }


  }
}