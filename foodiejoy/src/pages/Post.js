import React, { Component } from "react";
import './../css/post.css';
import {Link} from 'react-router-dom';

class Post extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1  className="login-title">Login</h1>
        <form onSubmit={e => { e.preventDefault(); }}>
          <label className="label">email</label>
          <input
            className="input"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.updateField}
          ></input>

          <button className="button" onClick={() => this.handleSubmit()}>Upload Food</button>
        </form>
        <br/>
        <br/>
      </div>
    );
  }
}

export default Post;
