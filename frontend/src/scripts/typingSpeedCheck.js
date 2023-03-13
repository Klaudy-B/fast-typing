const calculateSpeedAtComplet = (characters, time, error, record, setNewRecord)=>{
    const speed = characters/time;
    document
    .querySelector('div.completion-message')
    .innerHTML =
    `<span class=${error?"error" : "correct"}>Completed</span><br />
    <b>Errors: </b>${error? '<span class="error">'+String(error)+'</span>' : '<span class="correct">0</span>'}<br />
    <b>Average speed: </b><span class="${error? 'error': 'correct'}">${speed}</span>${speed>1?' characters':' character'} by second
    ${(error&&(speed>record))? '<br /><span class="error">Record not registered, because "Errors is not equal to 0"</span>': ''}`;
    
    if(speed>record&&!error){
        setNewRecord(speed);
    }
}

const calculateSpeedAtTimeup = (time)=>{
    const speed = (document.querySelectorAll('span.correct').length + document.querySelectorAll('span.incorrect').length)/time;
    document
    .querySelector('div.completion-message')
    .innerHTML =
    `Time's up!<br />
    <b>Errors: </b>:<span class="error">${document.querySelectorAll('span.incorrect').length}</span><br />
    <b>Average speed: </b><span class="error">${speed}</span>${speed>1?' characters':' character'} by second`;
}

const evaluate = function (e, preInput, setBlock, seconds, record, setNewRecord){
    try{
        let complet = true;
        let error = 0;
        const words = document.querySelectorAll('div.text-displayer>span');
        const input = e.target.value.split('');
        if(!(Math.abs(preInput.current.length-input.length)===1)){
            throw Error('Please type one character at a time. Copy pasting is considered as cheating');
        }
        preInput.current = input;
        if(input.length< words.length){
            complet = false;
        }
        words.forEach((span, index)=>{
            if(!input[index]){
                span.classList.remove('correct');
                span.classList.remove('incorrect');
            }else{
                if(input[index]===span.innerText){
                    span.classList.remove('incorrect');
                    span.classList.add('correct');
                }else{
                    span.classList.remove('correct');
                    span.classList.add('incorrect');
                    error++;
                }
            }
        })
        if(complet&& !error){
            calculateSpeedAtComplet(input.length, seconds-Number(document.querySelector('div.timer').innerText), error, record, setNewRecord);
            setBlock(true);
        }
        if(complet&&error){
            calculateSpeedAtComplet(input.length, seconds-Number(document.querySelector('div.timer').innerText), error, record, setNewRecord);
            setBlock(true)
        }
    }catch(err){
        if(err.message==='Please type one character at a time. Copy pasting is considered as cheating'){
            e.target.disabled = true
            document.querySelector('div.cheat').innerText = err.message;
            setBlock(true)
        }
    }
    
}
export { evaluate, calculateSpeedAtComplet, calculateSpeedAtTimeup };