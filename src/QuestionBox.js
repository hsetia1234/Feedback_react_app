import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";



export const QuestionBox = (props) => {
    const [queId, setqueId] = useState(props.questionId);

    return (
        <tr>
            <td>{props.question}</td>

            <td style={{ maxWidth: 4 }} className="text-center"> <input
                className="form-check-input rdio"
                type="radio"
                name={queId}
                value="Strongly Disagree"
                key={props.questionId}
                onChange={(e) => {
                    props.handleData({ questionId: queId, answer: e.target.value });
                }}
                novalidate/></td>

            <td className="text-center"> <input
                className="form-check-input rdio"
                type="radio"
                name={queId}
                value="Disagree"
                key={props.questionId}
                onChange={(e) => {
                    props.handleData({ questionId: queId, answer: e.target.value });
                }}
                 /></td>
            <td className="text-center"> <input
                className="form-check-input rdio"
                type="radio"
                name={queId}
                value="Slightly Disagree"
                key={props.questionId}
                onChange={(e) => {
                    props.handleData({ questionId: queId, answer: e.target.value, });
                }}
                /></td>
            <td className="text-center"> <input
                className="form-check-input rdio"
                type="radio"
                name={queId}
                value="Netural"
                defaultChecked
                key={props.questionId}
                onChange={(e) => {
                    props.handleData({ questionId: queId, answer: e.target.value });
                }}
                /></td>
            <td className="text-center"> <input
                className="form-check-input rdio"
                type="radio"
                name={queId}
                value="Agree"
                key={props.questionId}
                onChange={(e) => {
                    props.handleData({ questionId: queId, answer: e.target.value });
                }}
               /></td>
            <td className="text-center"> <input
                className="form-check-input rdio"
                type="radio"
                name={queId}
                value="Strongly Agree"
                key={props.questionId}
                onChange={(e) => {
                    props.handleData({ questionId: queId, answer: e.target.value });
                }}
                /></td>
        </tr>
    )
}

