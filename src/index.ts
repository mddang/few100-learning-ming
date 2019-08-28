
import './styles.css';
// import { add as addFromScott} from './math';
import * as fromMath from './math';

const number1 = document.getElementById('number1') as HTMLInputElement;
const number2 = document.getElementById('number2') as HTMLInputElement;
const add = document.getElementById('add') as HTMLInputElement;
const answer = document.getElementById('answer') as HTMLSpanElement;

// console.log({ number1, number2, add });
add.addEventListener('click', function () {
    console.log('that tickles', this);

    const n1 = number1.valueAsNumber;
    const n2 = number2.valueAsNumber;
    const result = fromMath.add(n1, n2);

    answer.innerText = result.toString();
    number1.value = '';
    number2.value = '';
    number1.focus();
});

