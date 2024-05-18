const form = document.getElementById("form");
const state = document.getElementById("status");

form.addEventListener("submit", startFeeding);

function startFeeding(event) {
  event.preventDefault();

  const n = parseInt(document.getElementById("n").value); // количество котиков
  const b = parseInt(document.getElementById("b").value); // потребность в корме
  const m = parseInt(document.getElementById("m").value); // вместительность миски
  const t = parseInt(document.getElementById("t").value); // время на поедание корма
  const r = parseInt(document.getElementById("r").value); // пополнение миски
  state.innerHTML = "";
  if (b > m) {
    state.innerHTML += `<p>Ошибка: потребность котика в корме не может быть больше вместимости миски.</p>`;
    return;
  }

  let totalTime = 0;
  let currentFood = m;
  let currentHunger = b;
  i = 1;

  while (i <= n) {
    if (currentFood == 0) {
        state.innerHTML += `<p>${totalTime.toFixed(2)} сек: Бабушка наполняет миску</p>`;
      totalTime += r;
      currentFood = m;
    }
    state.innerHTML += `<p>${totalTime.toFixed(2)} сек: Котик под номером ${i} подошел к миске</p>`;
    if (currentFood >= currentHunger) {
      currentFood -= currentHunger;
      currentHunger = 0;
      totalTime += ((m - currentFood) / b) * t;
    } else {
      currentHunger -= currentFood;
      currentFood = 0;
      totalTime += ((b - currentHunger) / b) * t;
    }
    state.innerHTML += `<p>${totalTime.toFixed(2)} сек: Котик под номером ${i} отошел от миски</p>`;
    if (currentHunger == 0) {
      currentHunger = b;
      i++;
    }
  }

  state.innerHTML += `<p>Все котики накормлены. Всего затрачено времени: ${totalTime.toFixed(2)} сек</p>`;

  this.reset();
}
