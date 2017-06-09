
function calculateExpression (expression) {
    let queueOutputCalc = [];
    let stackOperatorsCalc = [];
    let tokens = [];
    let precedenceOperatorCalc = {
        '√': 4,
        '^': 4,
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2
    };
    tokens.length = 0;
    queueOutputCalc.length = 0;
    stackOperatorsCalc.length = 0;
    tokens = expression.trim().split(/\s+/g);

            // obsługa pierwiastka, podmien elementy typu sqrt(9) na 9, √ oraz ^2 na ^
    tokens.forEach((element, index) => {
        if (/sqrt\(\d+\)/.exec(element)) {
            let num = /\d+/.exec(element)[0];
            tokens.splice(index, 1, num, '√');
        } else if (/\^2/.exec(element)) {
            tokens.splice(index, 1, '^');
        }
    });

    tokens.forEach((element) => {

        if (isNaN(element)) {
            if (stackOperatorsCalc.length) {
                while (precedenceOperatorCalc[element] <= precedenceOperatorCalc[stackOperatorsCalc[0]]) {
                    queueOutputCalc.push(stackOperatorsCalc.shift());
                    if (stackOperatorsCalc.length === 0) {
                        break;
                    }
                }
                stackOperatorsCalc.unshift(element);
            } else {
                stackOperatorsCalc.unshift(element);
            }
        } else {
            queueOutputCalc.push(element);
        }
    });

    while (stackOperatorsCalc.length) {
        queueOutputCalc.push(stackOperatorsCalc.shift());
    }

// READ ELEMENTS
    let i = 0;

    while (queueOutputCalc.length !== 1) {
        let token = queueOutputCalc[i];
        if (isNaN(token)) {
            let result = 0;
            let firstNum = Number(queueOutputCalc[i - 2]);
            let secNum = Number(queueOutputCalc[i - 1]);

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
    return queueOutputCalc[0];
    // odczytanie
    // screenBottom.textContent = String(queueOutputCalc[0]);
    // screenTop.textContent = '';
}

QUnit.test('calculation test', function (assert) {
    assert.equal(calculateExpression('2 + 3'), 5);
    assert.equal(calculateExpression('2 + 3 * 4'), 14);
    assert.equal(calculateExpression('10 / 2 * 3'), 15);
    assert.equal(calculateExpression('6 + sqrt(9) * 3'), 15);
    assert.equal(calculateExpression('1000 - 1 * 2 + 3 / 4 - 5 ^2 * sqrt(9)'), '923.75');
    assert.equal(calculateExpression ('8 + 2 /'), '4');
});