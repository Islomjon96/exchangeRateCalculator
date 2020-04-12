document.addEventListener('DOMContentLoaded', function () { // Аналог $(document).ready(function(){
    const currencyEl_one = document.getElementById('currency-one');
    const currencyAmount_one = document.getElementById('amount-one');
    const currencyEl_two = document.getElementById('currency-two');
    const currencyAmount_two = document.getElementById('amount-two');

    const swap = document.getElementById('swap');
    const rate = document.getElementById('rate');

    // Функция счета преобразования валюты
    function calculate() {
        const currency_one = currencyEl_one.value;
        const currency_two = currencyEl_two.value;

        fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then(response => response.json()).then(data => {
            rate.innerText = `1 ${currency_one} = ${data.rates[currency_two]}`;

            currencyAmount_two.value = (+currencyAmount_one.value * data.rates[currency_two]).toFixed(2);
        });
    }

    // События при изменении валюты и при изменении количества валют
    currencyEl_one.addEventListener('change', calculate);
    currencyAmount_one.addEventListener('input', calculate);
    currencyEl_two.addEventListener('change', calculate);
    currencyAmount_two.addEventListener('input', calculate);

    // События изменения валют местами
    swap.addEventListener('click', function () {
        [currencyEl_one.value, currencyEl_two.value] = [currencyEl_two.value, currencyEl_one.value];
        calculate();
    })

    calculate();
});