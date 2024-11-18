document.addEventListener("DOMContentLoaded", () => {
  const api_key = "7dab1059a6da9c9b1d2302da";
  const url = "https://v6.exchangerate-api.com/v6/" + api_key;

  const currencyOne = document.getElementById("current_one");
  const currencyTwo = document.getElementById("current_two");
  const list_one = document.getElementById("list_one");
  const list_two = document.getElementById("list_two");
  const amount = document.getElementById("amount");
  const calculate = document.getElementById("calculate");
  const result = document.getElementById("result");

  let options = "";

  fetch(url + "/codes")
    .then((res) => res.json())
    .then((data) => {
      const items = data.supported_codes;
      for (let item of items) {
        options += `<option value="${item[0]}">${item[1]}</option>`;
      }
      list_one.innerHTML = options;
      list_two.innerHTML = options;
    })
    .catch((error) => console.error("Döviz kodlarını çekerken hata:", error));

  // Hesaplama
  calculate.addEventListener("click", () => {
    const doviz1 = currencyOne.value; // Kullanıcının seçtiği döviz 1
    const doviz2 = currencyTwo.value; // Kullanıcının seçtiği döviz 2
    const miktar = amount.value;

    fetch(url + "/latest/" + doviz1)
      .then((res) => res.json())
      .then((data) => {
        const sonuc = (data.conversion_rates[doviz2] * miktar).toFixed(2);
        result.innerHTML = `
        <div class="card border-primary">
          <div class="card-body text-center" style="font-size: 30px">
            ${miktar} ${doviz1} = ${sonuc} ${doviz2}
          </div>
        </div>`;
      })
      .catch((error) =>
        console.error("Döviz çevirisi yapılırken hata:", error)
      );
  });
});
