import React, {useState, useEffect} from 'react';
import './Navbar.css';



export default function TextForm(props) {

    const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    fetchVoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchVoices = () => {
    let voices = window.speechSynthesis.getVoices();
    setVoices(voices);
  };

  const handleChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const convertTextToSpeech = () => {
    if (text.trim().length === 0) {
      props.showAlert('Please enter some text.');
      return;
    }

    let utterance = new SpeechSynthesisUtterance();
    let voice = voices.find((v) => v.name === selectedVoice);
    utterance.voice = voice;
    utterance.text = text;

    let chunkSize = 200; // Number of characters per chunk
    let chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.substring(i, i + chunkSize));
    }

    let audioChunks = [];

    chunks.forEach((chunk) => {
      let chunkUtterance = new SpeechSynthesisUtterance(chunk);
      chunkUtterance.voice = voice;
      speechSynthesis.speak(chunkUtterance);

      chunkUtterance.onend = () => {
        audioChunks.push(new SpeechSynthesisUtterance(chunk));
        if (audioChunks.length === chunks.length) {
          let audioBlob = new Blob(
            audioChunks.map((chunk) => new Blob([chunk])),
            { type: 'audio/mpeg' }
          );
          let url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        }
      };
    });
  };

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

    // const textToSpeech = () => {
    //     //Split text into chunks
    //     const chunkSize = 200;
    //     const chunks = text.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];

    //     //speak each chunk
    //     chunks.forEach(chunk => {
    //         let speech = new SpeechSynthesisUtterance();
    //         speech.text = chunk;
    //         window.speechSynthesis.speak(speech);
    //     });

    //     props.showAlert("Listening to text", "primary");
        
    // }

    const removeExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));

        props.showAlert("Extra spaces removed!", "primary");
    }

    const handleCopy = () => {
       
        navigator.clipboard.writeText(text);
        
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
                {/* <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={textToSpeech}>Listen</button> */}
                <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={removeExtraSpaces}>Remove extra spaces</button>
                <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={handleCopy}>Copy Text</button>
            
                <br/>
                <label className='mx-2 my-1' htmlFor="voices">Select Voice:</label>
                <select className='mx-2 my-1' id="voices" onChange={handleChange}>
                    {voices.map((voice, index) => (
                        <option key={index} value={voice.name}>
                        {voice.name} ({voice.lang})
                        </option>
                    ))}
                </select>
        
                <button disabled={text.length===0} className={`btn btn-${props.colorMode} mx-2 my-1`} onClick={convertTextToSpeech}>Convert to Audio</button>
        
                {audioUrl && (
                    <a href={audioUrl} download="speech.mp3">
                        Download Audio
                    </a>
                )}
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
