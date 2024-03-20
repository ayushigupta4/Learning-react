import React from 'react' 

export default function About(props) {

    // const [myStyle, setMyStyle] = useState({
    //     color: 'black',
    //     backgroundColor: 'white'
    // });

    // const [btntext, setBtnText] = useState("Dark Mode");

    // const toggleStyle = () => {
    //     if(myStyle.color === 'black') {
    //         setMyStyle({
    //             color: 'white',
    //             backgroundColor: 'black',
    //             border: '1px solid while'
    //         });
    //         setBtnText("Light mode");
    //     }
    //     else {
    //         setMyStyle({
    //             color: 'black',
    //             backgroundColor: 'white'
    //         });
    //         setBtnText("Dark mode");
    //     }
    // }
    let myStyleBody = {
        
        backgroundColor: props.mode==='dark'?'#4b5156':'white',
        color: props.mode==='dark'?'white':'black'
    }
    let myStyleHeading = {
        
        backgroundColor: props.mode==='dark'?'#3c3c3c':'white',
        color: props.mode==='dark'?'white':'black',
        border: '2px solid',
        borderColor: props.mode==='dark'?'white':'black',
    }

  return (
    <div className='container' >
        <h1 className="my-3">About Us</h1>
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button  className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={myStyleHeading}>
                    <strong>Analyze your text</strong>
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body" style={myStyleBody}>
                       Texter gives you a way to analyze your text quickly and efficiently. Be it word count, character count or removing or even listen to your text.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button  className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={myStyleHeading}>
                <strong>Free to use</strong>
                </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body" style={myStyleBody}>
                        Texter is a free character counter tool that provides instant character count & word count statistics for a given text. Texter reports the number of words and characters. Thus it is suitable for writing text with word/character limit.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={myStyleHeading}>
                <strong>Browser Compatible</strong>
                </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body" style={myStyleBody}>
                        This word counter software works in any web browser such as Chrome, Firefox, Internet Explorer, Safari, Opera. It suits to count characters in facebook, blog, books, excel document, pdf document, essays, etc.
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="container my-3">
            <button onClick={toggleStyle} type='button' className='btn btn-success'>{btntext}</button>
        </div> */}
    </div>
  )
}
