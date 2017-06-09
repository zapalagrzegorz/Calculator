// @ts-check 
// do the type check with jsDoc 
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // elementy
    let calcPanel = document.querySelector('.calcPanel');
    let screenTop = document.querySelector('.screen__top');
    let screenBottom = document.querySelector('.screen__bottom');
    let equalButton = document.querySelector('.calcBtnEq');


    const calcEngine = {
        // queue - FIFO
        queueOutputCalc: [],
        // stack - FILO
        stackOperatorsCalc: [],
        tokens: [],
        precedenceOperatorCalc: {

            // pierwiastek i potęgowanie są tu - odmiennie - lewostronne; oba są wyłącznie drugiego stopnia
            '√': 4,
            '^': 4,
            '*': 3,
            '/': 3,
            '+': 2,
            '-': 2
        },
        /**
        * @method
        * See: https://en.wikipedia.org/wiki/Shunting-yard_algorithm
        * Memory of calculator performing parsing methods
        * Sets result of top screen expression in bottom screen
        */
        parseExpression: function () {

            // tokenizacja
            this.tokens.length = 0;
            this.queueOutputCalc.length = 0;
            this.stackOperatorsCalc.length = 0;
            this.tokens = screenTop.textContent.trim().split(/\s+/g);

            // obsługa pierwiastka, podmien elementy typu sqrt(9) na 9, √ oraz ^2 na ^
            this.tokens.forEach((element, index) => {
                if (/sqrt\(\d+\)/.exec(element)) {
                    let num = /\d+/.exec(element)[0];
                    this.tokens.splice(index, 1, num, '√');
                } else if (/\^2/.exec(element)) {
                    this.tokens.splice(index, 1, '^');
                }
            });

            // ułożenie kolejności - tytułowy 'shunting'
            this.tokens.forEach((element) => {

                // operatory na stos
                if (isNaN(element)) {

                    // jeśli są już operatory na stosie
                    // operatory o równym i niższym pierwszeństwie przenieś do kolejki wynikowej
                    if (this.stackOperatorsCalc.length) {
                        while (this.precedenceOperatorCalc[element] <= this.precedenceOperatorCalc[this.stackOperatorsCalc[0]]) {
                            this.queueOutputCalc.push(this.stackOperatorsCalc.shift());
                            if (this.stackOperatorsCalc.length === 0) {
                                break;
                            }
                        }
                        this.stackOperatorsCalc.unshift(element);
                        // pierwszy operator
                    } else {
                        this.stackOperatorsCalc.unshift(element);
                    }

                    // liczby wrzuć do kolejki
                } else {
                    this.queueOutputCalc.push(element);
                }
            }, this);

            // przełóż operatory do wynikowej kolejki
            while (this.stackOperatorsCalc.length) {
                this.queueOutputCalc.push(this.stackOperatorsCalc.shift());
            }

            // READ ELEMENTS
            //  redukuj elementy aż zostanie jeden
            let i = 0;

            while (this.queueOutputCalc.length !== 1) {
                let token = this.queueOutputCalc[i];
                if (isNaN(token)) {
                    let result = 0;
                    let firstNum = Number(this.queueOutputCalc[i - 2]);
                    let secNum = Number(this.queueOutputCalc[i - 1]);

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
                        this.queueOutputCalc.splice(i - 2, 3, result);
                        i -= 2;
                        break;
                    case '√':
                    case '^':
                        this.queueOutputCalc.splice(i - 1, 2, result);
                        i -= 1;
                        break;
                    }
                }
                i++;
            }

            // odczytanie
            screenBottom.textContent = String(this.queueOutputCalc[0]);
            screenTop.textContent = '';
        }
    };

    // METODY

    //  użyc delegacji eventów, aby div okalający decydował, jakie zdarzenie nastąpiło, dzięki bąbelkowaniu

    /**
    * Obsługa ekranu kalkulatora
    * @callback
    * @param {boolean} isOper
    * @param {event} eventObject 
    */
    function setScreen (event) {
        //  pierwszy if zrobić na switch, bo będzie jeszcze =, C jak kasuj dane

        if (event.target.textContent === 'C') {
            screenTop.textContent = '0';
            screenBottom.textContent = '0';
            return;
        }

        // not a digit
        if (!/[0-9]/.test(event.target.textContent)) {
            let lastChar = screenTop.textContent.charAt(screenTop.textContent.length - 1);
            let islastNum = /\d+$/.test(screenTop.textContent);
            let islastSqrt = /sqrt\(\d+\)\s*$/.test(screenTop.textContent);

            switch (event.target.textContent) {
            case '+':
            case '-':
            case '*':
            case '/':

                    // ostatni jest operator i nie jest potęgowaniem
                if (!islastNum && !islastSqrt && lastChar !== '^') {
                    screenTop.textContent = screenTop.textContent.replace(/.?$/, event.target.textContent);
                    screenBottom.textContent = event.target.textContent;

                        // ostatnia jest liczba lub potęgowanie
                } else {
                    screenTop.textContent += ' ' + event.target.textContent;
                    screenBottom.textContent = event.target.textContent;
                    event.preventDefault();
                }
                break;
            case '^':
                    // ostatni jest operator 
                if (!islastNum) {
                    screenTop.textContent = screenTop.textContent.replace(lastChar, event.target.textContent + '2');
                    screenBottom.textContent = event.target.textContent + '2';

                        // ostatnia jest liczba 
                } else {
                    screenTop.textContent += ' ' + event.target.textContent + '2';
                    screenBottom.textContent = event.target.textContent + '2';
                    event.preventDefault();
                }
                break;
            case '√':
                    // obsługa pierwiastka - pierwiastkujemy po wpisaniu liczby
                if (islastSqrt) {
                        // nie ma pierwiastka z pierwiastka
                    return;
                } else if (islastNum) {
                        // właściwe pierwiastkowaniel; wiodąca spacja, bo nie ma już zamiany pierwiastka na inny operator
                    screenTop.textContent = screenTop.textContent.replace(/(\d+)$/, 'sqrt(' + '$1' + ') ');
                    return;
                } else {
                        // zamiana operatora i cyfry na pierwiastek; 
                    screenTop.textContent = screenTop.textContent.replace(/(\d+)\W+$/, 'sqrt(' + '$1' + ') ');
                }
                break;
            }
            // wybrano cyfrę
        } else {
            let islastNum = /\d+$/.test(screenTop.textContent);
            let islastSqrt = /sqrt\(\d+\)\s*$/.test(screenTop.textContent);

            if (screenTop.textContent.charAt(0) === '0') {
                screenTop.textContent = event.target.textContent;
                screenBottom.textContent = event.target.textContent;

                // jeśli ostatnio było pierwiastkowanie zamień operację na liczbę
            } else if (islastSqrt) {
                screenTop.textContent = screenTop.textContent.replace(/sqrt\(\d+\)\s*$/, event.target.textContent);
                screenBottom.textContent = event.target.textContent;

                // ostatnim symbolem jest operator
            } else if (!islastNum) {
                screenTop.textContent += (' ' + event.target.textContent);
                screenBottom.textContent = event.target.textContent;

                // podana cyfra nie jest 'bezpieczna'
            } else if (!Number.isSafeInteger(Number(screenBottom.textContent))) {
                screenBottom.textContent = 'Error';
                screenTop.textContent = '0';

                // ostania była cyfra i wybrano cyfrę
            } else {
                screenTop.textContent += event.target.textContent;
                screenBottom.textContent += event.target.textContent;
            }
        }
    }

    // EVENTS

    // wykorzystanie bąbelkowania zdarzenia
    calcPanel.addEventListener('click', setScreen, false);

    // .bind - pierwszy argument określa wyraźnie obiekt kontektu this dla funkcji/metody, kolejne określają argumentu
    equalButton.addEventListener('click', calcEngine.parseExpression.bind(calcEngine));

});
