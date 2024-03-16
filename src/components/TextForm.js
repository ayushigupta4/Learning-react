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

    const textToSpeech = () => {
        //Split text into chunks
        const chunkSize = 200;
        const chunks = text.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];

        //speak each chunk
        chunks.forEach(chunk => {
            let speech = new SpeechSynthesisUtterance();
            speech.text = chunk;
            window.speechSynthesis.speak(speech);
        });
        
    }

    const removeExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
    }

    const handleOnChange = (event) => {
        //console.log("OnChange");
        setText(event.target.value);
    }

    const[text, setText] = useState(""); 
    //setText("Write text here");
    return (
        <>
            <div className='container' style={{color: props.mode==='dark'?'white':'black'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'grey':'white',color: props.mode==='dark'?'white':'black'}} id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-success mx-2" onClick={handleUpClick}>Convert to uppercase</button>
                <button className="btn btn-success mx-2" onClick={handleLoClick}>Convert to lowercase</button>
                <button className="btn btn-success mx-2" onClick={clearText}>Clear Text</button>
                <button className="btn btn-success mx-2" onClick={textToSpeech}>Listen</button>
                <button className="btn btn-success mx-2" onClick={removeExtraSpaces}>Remove extra spaces</button>
            </div>
            <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
                <h2>Your text summary</h2>
                <p>{text.split(" ").length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").length} minutes read</p>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Enter something in textbox to preview"}</p>
            </div>
        </>
  )
}
