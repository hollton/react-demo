import React, { Component } from "react";
import { html2ImageStream } from "html2-image-stream";

class Canvas extends Component {
  componentDidMount(){
    this.async1().then(data=>{
      console.log(data)
      return this.async2()
    }, err=>{
      console.log(err)
      return this.async2()
    }).then(data=>{
      console.log('data:'+data)
    }, err=>{
      console.log('err:'+err)
    }).catch(err=>{
      console.log('catch:'+err)
    })
  }
  async1(){
    return Promise.reject('async1 error')
  }
  async2(){
    return Promise.resolve('async2')
  }
  async3(){
    return Promise.resolve('async3')
  }
  cc() {
    html2ImageStream(".report-download-item", function(e) {
      console.log(e.data[0]);
    });
  }
  render() {
    return (

      <div
      className="slp-l-bordermain slp-mod-seniorexam__main my-slp-ui-statistics"
        data-reactid=".0.2.2.0.1"
      >
        <div
        className="report-download-item"
          data-reactid=".0.2.2.0.1.0.$content.0.$course.0.0"
        >
          <div className="" data-reactid=".0.2.2.0.1.0.$content.0.$course.0.0.0">
            <div
              data-reactid=".0.2.2.0.1.0.$content.0.$course.0.0.0.2"
            >
              <button
                type="button"
                className="ant-btn ant-btn-ghost"
                data-reactid=".0.2.2.0.1.0.$content.0.$course.0.0.0.2.0" onClick={this.cc}
              >
                <span data-reactid=".0.2.2.0.1.0.$content.0.$course.0.0.0.2.0.1:$/=10">
                  下 载
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Canvas;
