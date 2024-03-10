import React, {useState} from 'react'



export default function TextForm(props) {

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
    }

    const clearText = () => {
        let newText = "";
        setText(newText);
    }

    const handleOnChange = (event) => {
        //console.log("OnChange");
        setText(event.target.value);
    }

    const[text, setText] = useState(""); 
    //setText("Write text here");
    return (
        <>
            <div className='container'>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-success mx-2" onClick={handleUpClick}>Convert to uppercase</button>
                <button className="btn btn-success mx-2" onClick={handleLoClick}>Convert to lowercase</button>
                <button className="btn btn-success mx-2" onClick={clearText}>Clear Text</button>
            </div>
            <div className="container my-3">
                <h2>Your text summary</h2>
                <p>{text.split(" ").length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").length} minutes read</p>
                <h2>Preview</h2>
                <p>{text}</p>
            </div>
        </>
  )
}
