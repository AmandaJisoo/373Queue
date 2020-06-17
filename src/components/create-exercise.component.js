import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-awesome-modal';
import { Emojione } from 'react-emoji-render';
import './popup.css';
export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      comment: '',
      duration: 0,
      date: new Date(),
      visible: false
    }
  }

  componentDidMount() {
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      comment: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      console.log("ok");
      window.location = '/';
    }, 3000);

    const exercise = {
      username: this.state.username,
      comment: this.state.comment,
      duration: this.state.duration,
      date: this.state.date
    }
    this.setState({
      username: ''
    })

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));


    this.openModal();
  }
  openModal() {
      this.setState({
          visible : true
      });
     setTimeout(() => {
        this.closeModal();
      }, 2000);
  }

  closeModal() {
      this.setState({
          visible : false
      });
  }
  //      </Modal>
  // //<Modal visible={this.state.visible} width="40%" height="40%" effect="fadeInUp" onClickAway={() => this.closeModal()}>    </Modal>
  render() {
    return (
    <div className="container">
      <section>
        <h1>React-Modal Examples</h1>
        <Modal visible={this.state.visible} width="50%" height="50%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
           <div className="pop-up">
              <p>Your request has been successfully submitted ❤<br></br>
                Redirecting to queue
              </p> 
            </div>
        </Modal>
      </section>
      <h3>CSE 373 Queue Sign Up </h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.comment}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Estimated Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}