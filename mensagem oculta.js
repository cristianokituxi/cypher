const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const cifrar = document.getElementById('cifrar')
const resultado = document.getElementById('resultado');
const classificacao = document.getElementById('classificacao');

const shifMessage = () => {
    var btn = document.getElementById("select").value;
    var btn2 = document.getElementById("select2").value;


    const wordArray = [...inputOriginal.value.toUpperCase()];
    const wordArrays = inputOriginal.value;

    if (btn === "cifra de cesar" && btn2 === "cifrar") {
        printChar(0, wordArray);
    }
    if (btn === "cifra de cesar" && btn2 === "decifrar") {
        printChardesc(0, wordArray);

    }
    if (btn === "base 64" && btn2 === "cifrar") {
        printCharBase(wordArray);

    }
    if (btn === "base 64" && btn2 === "decifrar") {
        printCharBaseDesc(wordArray);

    }

}
const ocultRange = () => {
    var btn = document.getElementById("select").value;
    if (btn === "base 64") {
        var btn = document.getElementById("divClassf").style.visibility = "hidden";
    } else {
        var btn = document.getElementById("divClassf").style.visibility = " visible";

    }


}

const printCharBase = (wordArray) => {
    if (wordArray.length) {
        const spanChar = document.createElement("span");
        resultado.appendChild(spanChar);
        animateChar(spanChar)
            .then(() => {
                const charSinCodificar = inputOriginal.value;
                spanChar.innerHTML = btoa(charSinCodificar);
            });

    }


}

const printCharBaseDesc = (wordArray) => {
    if (wordArray.length) {
        const spanChar = document.createElement("span");
        resultado.appendChild(spanChar);
        animateChar(spanChar)
            .then(() => {
                const charSinCodificar = inputOriginal.value;
                spanChar.innerHTML = atob(charSinCodificar);
            });

    }


}


const printChar = (currentLetterIndex, wordArray) => {
    if (wordArray.length === currentLetterIndex)
        return;
    inputOriginal.value = inputOriginal.value.substring(1)
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animateChar(spanChar)
        .then(() => {
            const charSinCodificar = wordArray[currentLetterIndex];
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ?
                alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(classificacao.value)) % alfabeto.length] :
                charSinCodificar
            printChar(currentLetterIndex + 1, wordArray);
        });
}
const printChardesc = (currentLetterIndex, wordArray) => {
    if (wordArray.length === currentLetterIndex)
        return;
    inputOriginal.value = inputOriginal.value.substring(1)
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animateChar(spanChar)
        .then(() => {
            const charSinCodificar = wordArray[currentLetterIndex];
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ?
                alfabeto[(alfabeto.indexOf(charSinCodificar) - parseInt(classificacao.value) + alfabeto.length) % alfabeto.length] :
                charSinCodificar
            printChardesc(currentLetterIndex + 1, wordArray);
        });
}

const animateChar = spanChar => {
    let mudançaDeletras = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            mudançaDeletras++;
            if (mudançaDeletras === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}

const submit = e => {
    e.preventDefault();
    resultado.innerHTML = '';
    shifMessage()
}

cifrador.onsubmit = submit;
cifrador.onClick = submit;