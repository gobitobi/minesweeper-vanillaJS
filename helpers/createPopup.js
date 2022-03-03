export const createPopup = (didPlayerWin) => {

    const popup = document.createElement('div')
    popup.classList.add('popup')

    const overlay = document.createElement('div')
    overlay.classList.add('overlay')

    const closePopupBtn = document.createElement('button')
    closePopupBtn.classList.add('close-popup-btn')

    const outcomeMssg = document.createElement('h2')
    outcomeMssg.classList.add('mssg')

    const playAgainMssg = document.createElement('h3')
    playAgainMssg.classList.add('play-again-mssg')
    playAgainMssg.innerText = 'Click to play again.'

    const mssgs = document.createElement('div')
    mssgs.classList.add('messages')
    mssgs.appendChild(outcomeMssg)
    mssgs.appendChild(playAgainMssg)



    if (didPlayerWin) {
        mssgs.classList.add('win')
        outcomeMssg.innerText = 'You Win!'
    } else {
        mssgs.classList.add('lose')
        outcomeMssg.innerText = 'You Lose...'
    }


    popup.appendChild(closePopupBtn)
    popup.appendChild(mssgs)
    popup.appendChild(overlay)

    return popup
}


// .overlay {
//     opacity: 0;
//     position: fixed;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     background-color: rgba(0, 0, 0, .5);
//     pointer-events: none;
// }

// .popup {
//     width: 30vw;
//     height: 20vh;
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%) scale(0);
//     display: flex;
//     justify-content: center;
//     align-items: center;