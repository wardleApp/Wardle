import React from 'react';
import axios from 'axios';

class Refer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    let requestBody = {
      userInfo : this.props.userInfo,
      email : this.state.email
    }

    console.log("this.props.userInfo", requestBody.userInfo)
    console.log('An invitation was sent to: ' + requestBody.email);

    axios.post('/invite', requestBody)
      .then( console.log("referral sent"));

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}

export default Refer;
