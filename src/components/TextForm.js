import React, {useState} from 'react';
import './Navbar.css';



export default function TextForm(props) {


    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase", "primary");
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase", "primary");
    }

    const clearText = () => {
        let newText = "";
        setText(newText);
        props.showAlert("Text cleared", "warning");
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

        props.showAlert("Listening to text", "primary");
        
    }

    const removeExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));

        props.showAlert("Extra spaces removed!", "primary");
    }

    const handleCopy = () => {
        var text = document.getElementById("myBox");
        text.select();
        text.setSelectionRange(0,9999);
        navigator.clipboard.writeText(text.value);
        document.getSelection().removeAllRanges();
        props.showAlert("Copied to clipboard!", "success");
    }

    const countWords = (text) => {
        text = text.trim();
        let words = text.split(/\s+/);
        return text === ""? 0: words.length;
        
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
                <h1 className='mb-2'>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#595959':'white',color: props.mode==='dark'?'white':'black'}} id="myBox" rows="8"></textarea>
                </div>
                <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={handleUpClick}>Convert to uppercase</button>
                <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={handleLoClick}>Convert to lowercase</button>
                <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={clearText}>Clear Text</button>
                <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={textToSpeech}>Listen</button>
                <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={removeExtraSpaces}>Remove extra spaces</button>
                <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={handleCopy}>Copy Text</button>
            </div>
            <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
                <h2>Your text summary</h2>
                <p>{countWords(text)} words and {text.length} characters</p>
                <p>{0.008 *countWords(text)} minutes read</p>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Nothing to preview"}</p>
            </div>
        </>
  )
}
