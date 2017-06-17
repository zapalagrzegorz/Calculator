// moduł kalkulatora

// @ts-check 
// do the type check with jsDoc 
'use strict';
const Calculator = (function () {
    
    /*************ELEMENTY I ZMIENNE*** */
    /********************************** */

    let screenTop = document.querySelector('.screen__top');
    let screenBottom = document.querySelector('.screen__bottom');
   
    // queue - FIFO
    let queueOutputCalc = [];
    // stack - FILO
    let stackOperatorsCalc = [];
    let tokens = [];
    let precedenceOperatorCalc = {

        // pierwiastek i potęgowanie są tu - odmiennie - lewostronne; oba są wyłącznie drugiego stopnia
        '√': 4,
        '^': 4,
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2
    };
    

    /*************METODY ************** */
    /********************************** */

    /**
    * @method
    * See: https://en.wikipedia.org/wiki/Shunting-yard_algorithm
    * Memory of calculator performing parsing methods
    * Sets result of top screen expression in bottom screen
    */
    let _parseExpression = function () {

        // tokenizacja
        tokens.length = 0;
        queueOutputCalc.length = 0;
        stackOperatorsCalc.length = 0;
        tokens = screenTop.textContent.trim().split(/\s+/g);

        // obsługa pierwiastka, podmien elementy typu sqrt(9) na 9, √ oraz ^2 na ^
        tokens.forEach((element, index) => {
            if (/sqrt\(\d+\)/.exec(element)) {
                let num = /\d+/.exec(element)[0];
                tokens.splice(index, 1, num, '√');
            } else if (/\^2/.exec(element)) {
                tokens.splice(index, 1, '^');
            }
        });
        // if (this.tokens.length < 3) {
        if (tokens.length === 1) {
            return;
        } else if ((/[+\-*\/]/).test(tokens.slice(-1)[0])) {
            tokens.pop();
        }
        // ułożenie kolejności - tytułowy 'shunting'
        tokens.forEach((element) => {

            // operatory na stos
            if (isNaN(Number(element))) {

                // jeśli są już operatory na stosie
                // operatory o równym i niższym pierwszeństwie przenieś do kolejki wynikowej
                if (stackOperatorsCalc.length) {
                    while (precedenceOperatorCalc[element] <= precedenceOperatorCalc[stackOperatorsCalc[0]]) {
                        queueOutputCalc.push(stackOperatorsCalc.shift());
                        if (stackOperatorsCalc.length === 0) {
                            break;
                        }
                    }
                    stackOperatorsCalc.unshift(element);
                    // pierwszy operator
                } else {
                    stackOperatorsCalc.unshift(element);
                }

                // liczby wrzuć do kolejki
            } else {
                queueOutputCalc.push(element);
            }
        }, this);

        // przełóż operatory do wynikowej kolejki
        while (stackOperatorsCalc.length) {
            queueOutputCalc.push(stackOperatorsCalc.shift());
        }


        // READ ELEMENTS
        //  redukuj elementy aż zostanie jeden
        let i = 0;

        while (queueOutputCalc.length !== 1) {
            const token = queueOutputCalc[i];
            if (isNaN(token)) {
                let result = 0;
                const firstNum = Number(queueOutputCalc[i - 2]);
                const secNum = Number(queueOutputCalc[i - 1]);

                switch (token) {
                case '+':
                    result = firstNum + secNum;
                    break;
                case '-':
                    result = firstNum - secNum;
                    break;
                case '*':
                    result = firstNum * secNum;
                    break;
                case '/':
                    result = firstNum / secNum;
                    break;
                case '√':
                    result = Math.sqrt(secNum);
                    break;
                case '^':
                    result = Math.pow(secNum, 2);
                    break;
                }

                // aktualizacja tablicy
                switch (token) {
                case '+':
                case '-':
                case '*':
                case '/':
                    queueOutputCalc.splice(i - 2, 3, result);
                    i -= 2;
                    break;
                case '√':
                case '^':
                    queueOutputCalc.splice(i - 1, 2, result);
                    i -= 1;
                    break;
                }
            }
            i++;
        }

        // odczytanie
        screenBottom.textContent = String(queueOutputCalc[0]);
        screenTop.textContent = '';
    };

    /**
    * Obsługa ekranu kalkulatora
    * @callback
    * @param {boolean} isOper
    * @param {event} eventObject 
    */
    let _setScreen = function (event) {

        // inicjalne sprawdzenie - inaczej reszta nie ma racji bytu
        // event === 'C' dla zdarzenia key 'C' pressed
        if (event === 'C') {
            screenTop.textContent = '0';
            screenBottom.textContent = '0';
        } else if (event.target !== undefined) {
            // kliknięto panel - przekazywany są wówczas wszystkie przyciski 
            if (event.target.className === 'col-sm-12 calcPanel') {
                return;
            } else if (event.target.textContent === 'C') {
                screenTop.textContent = '0';
                screenBottom.textContent = '0';
                return;
            }
        }
        // dla keyboard events 'pressed key' wyczerpuje w się w wartosci event, a event.target jest undefined
        const input = event.target !== undefined ? event.target.textContent : event;

        let screenTopTextContent = screenTop.textContent;
        const islastNum = /\d+$/.test(screenTopTextContent);
        const islastSqrt = /sqrt\(\d+\)\s*$/.test(screenTopTextContent);

        // not a digit
        if (!/[0-9]/.test(input)) {
            let lastChar = screenTopTextContent.charAt(screenTopTextContent.length - 1);

            switch (input) {
            case '+':
            case '-':
            case '*':
            case '/':

                    // ostatni jest operator i nie jest potęgowaniem/pierwiastkowaniem
                if (!islastNum && !islastSqrt && lastChar !== '^') {
                    screenTop.textContent = screenTopTextContent.replace(/.?$/, input);
                    screenBottom.textContent = input;

                        // ostatnia jest liczba lub potęgowanie
                } else {
                    screenTop.textContent += ' ' + input;
                    screenBottom.textContent = input;
                        // event.preventDefault();
                }
                break;
            case '^':

                    // ostatni jest operator 
                if (!islastNum) {
                    screenTop.textContent = screenTopTextContent.replace(lastChar, input + '2');
                    screenBottom.textContent = input + '2';

                        // ostatnia jest liczba 
                } else {
                    screenTop.textContent += ' ' + input + '2';
                    screenBottom.textContent = input + '2';
                        // event.preventDefault();
                }
                break;
            case '√':

                    // nie ma pierwiastka z pierwiastka
                if (islastSqrt) {
                    return;

                        // właściwe pierwiastkowaniel; wiodąca spacja, bo nie ma już zamiany pierwiastka na inny operator
                } else if (islastNum) {
                    screenTop.textContent = screenTopTextContent.replace(/(\d+)$/, 'sqrt(' + '$1' + ') ');
                    return;
                } else {

                        // zamiana operatora i cyfry na pierwiastek; 
                    screenTop.textContent = screenTopTextContent.replace(/(\d+)\W+$/, 'sqrt(' + '$1' + ') ');
                }
                break;
            }

            // wybrano cyfrę
        } else {
            // obsługa pierw
            if (screenTop.textContent.charAt(0) === '0' && screenTopTextContent.length === 1) {
                screenTop.textContent = input;
                screenBottom.textContent = input;

                // jeśli ostatnio było pierwiastkowanie zamień operację na liczbę
            } else if (islastSqrt) {
                screenTop.textContent = screenTopTextContent.replace(/sqrt\(\d+\)\s*$/, input);
                screenBottom.textContent = input;

                // ostatnim symbolem jest operator
            } else if (!islastNum) {
                screenTop.textContent += (' ' + input);
                screenBottom.textContent = input;

                // podana cyfra nie jest 'bezpieczna'
            } else if (!Number.isSafeInteger(Number(screenBottom.textContent))) {
                screenBottom.textContent = 'Error';
                screenTop.textContent = '0';

                // ostania była cyfra i wybrano cyfrę
            } else {
                screenTop.textContent += input;
                screenBottom.textContent += input;
            }
        }
    };

    /*********** API KALKULATORA  ***/
    /********************************/
    return {
        setScreen : _setScreen,
        parseExpression : _parseExpression
    };
})();