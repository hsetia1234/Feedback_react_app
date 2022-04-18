
import { QuestionBox } from './QuestionBox';
import { Component } from 'react';
import axios from 'axios';
import React, { useState } from "react";
import update from 'react-addons-update';



class App extends Component {

  constructor() {
    super();
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.export_csv = this.export_csv.bind(this);

    this.state = {
      questionBank: [],
      username: '',
      email: '',
      responses: [],
      existResponse: []

    };
  }



  componentDidMount() {
    axios.get('http://localhost:5000/questions')
      .then(response => {
        if (response.data.length > 0) {

          response.data.map(({ surveyname, questiontext, scaletype, varname,
            options }) => {
            const initres = {
              'questionId': varname,
              'answer': "Not Asked",
            }
            this.setState({
              responses: this.state.responses.concat([initres])
            })

          })

          if (response.data.length > 10) {

            // Shuffle array
            const shuffled = response.data.sort(() => 0.5 - Math.random());

            // Get sub-array of first n elements after shuffled
            let selected = shuffled.slice(0, 10);
            this.setState({
              questionBank: selected
            })
          } else {
            this.setState({
              questionBank: response.data

            })
          }
          this.state.questionBank.map(({ surveyname, questiontext, scaletype, varname,
            options })=>{
            let index = this.state.responses.findIndex((res) => res.questionId === varname);
            this.state.responses[index]={
              'questionId': varname,
              'answer': "Neutral",
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }


  handleData = (item) => {
    const index = this.state.responses.findIndex((res) => res.questionId === item.questionId);
    console.log(index);
    if (index != -1) {
      let responses = [...this.state.responses];
      responses[index] = item;
      this.setState({ responses }, function () {
        this._handleSubmit();
      });
    } else {
      this.setState((state) =>
        update(state, { responses: { $push: [item] } }), function () {
          this._handleSubmit();
        });

    }

  }

  _handleSubmit() {
    console.log(this.state.responses);
  }

  handleOnSubmit = () => {
    var v=document.getElementById('master_form');
    v.className += " was-validated"

    if (this.state.username === '' || this.state.email === '') {
      return
    }
    const userInfo = {
      'username': this.state.username,
      'email': this.state.email
    }
    const finalresponse = {
      ...userInfo,
      userresponse: this.state.responses
    }
    console.log(finalresponse);
    axios.post('http://localhost:5000/responses/add', finalresponse)
      .then(res => console.log(res.data));


    alert("Thanks for submitting response!!!");
  }

async export_csv(){
    await axios.get('http://localhost:5000/responses')
      .then(response => {
        if(response.data.length>0){
          this.setState({
            
            existResponse: response.data
          });
        }
      }).catch((error) => {
        
        console.log(error);
      });

      if(this.state.existResponse.length===0){
        alert("No response found!!!");
        return
      }
      
    let fileName = 'response';
    let delimiter = ',';
    const arrayHeader = []
    arrayHeader.push("username");
    arrayHeader.push("email");
    arrayHeader.push("submitted At")
    this.state.existResponse[0].userresponse.map((e) => {
      console.log(e)
      arrayHeader.push(e.questionId)
    })

    let header = arrayHeader.join(delimiter) + '\n';
    let csv = header;


    this.state.existResponse.forEach((ele) => {
      let arrayData = []
      arrayData.push(ele.username)
      arrayData.push(ele.email)
      arrayData.push(ele.createdAt)

      ele.userresponse.forEach((e) => {

        arrayData.push(e.answer)

      })
      csv += arrayData.join(delimiter) + '\n';
    })

    console.log(csv);
    let csvData = new Blob([csv], { type: 'text/csv' });
    let csvUrl = URL.createObjectURL(csvData);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  render() {
    return (<div className="container">

      <div className="p-3 mb-2 bg-secondary text-white">
        <h2>We value your feedback</h2>
        <p >Please, Complete the following feedback form</p>
      </div>

      <form class="row g-3 needs-validation" id="master_form" novalidate >
        <div class="col-md-4">
          <label for="validationCustom01" class="form-label">Full Name</label>
          <input type="text" class="form-control" id="validationCustom01" placeholder='Enter Full Name' onChange={this.onChangeUsername} required />
          <div class="invalid-feedback">
            Please provide a name!
          </div>
        </div>
        <div class="col-md-4">
          <label for="validationCustom02" class="form-label">Age</label>
          <input type="number" class="form-control" id="validationCustom02" placeholder='Enter Age' required />
          <div class="invalid-feedback">
            Please provide a age!
          </div>
        </div>

        <div class="col-md-4">
          <label for="validationCustom03" class="form-label">Email</label>
          <input type="text" class="form-control" id="validationCustom01" placeholder='Enter Email' onChange={this.onChangeEmail} required />
          <div class="invalid-feedback">
            Please provide email id!
          </div>
        </div>


        <table className="table table-striped" style={{ marginTop: 30 }}>
          <thead className="table-dark">
            <tr>
              <th scope="col" width="300" height="50">Questions</th>
              <th scope="col" width="120" height="50" className="text-center">Strongly Disagree</th>
              <th scope="col" width="120" height="50" className="text-center">Disagree</th>
              <th scope="col" width="120" height="50" className="text-center">Slightly Disagree</th>
              <th scope="col" width="120" height="50" className="text-center">Netural</th>
              <th scope="col" width="120" height="50" className="text-center">Agree</th>
              <th scope="col" width="120" height="50" className="text-center">Strongly Agree</th>
            </tr>
          </thead>
          <tbody>


            {
              this.state.questionBank.length > 0 &&
              this.state.questionBank.map(({ surveyname, questiontext, scaletype, varname,
                options }) => <QuestionBox question=
                  {questiontext} options={options} questionId={varname}
                  handleData={this.handleData}
                //selected={answer => this.computeAnswer(answer, correct)}
                />)}
          </tbody></table>


          <div class="text-end my-2">
            <button type="submit" class="btn btn-dark" onClick={this.handleOnSubmit}>Submit form</button>
          </div>
       
      </form>
      <div class="text-end my-2">
        <button type="text" class="btn btn-dark" onClick={this.export_csv} >Export To CSV</button>
      </div>
    </div>);
  }

}
export default App;
