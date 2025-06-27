const input = document.getElementById("tempInput");
const select = document.getElementById("unitSelect");
const resultDiv = document.getElementById("result");
const historyList = document.getElementById("historyList");
const tempImage = document.getElementById("tempImage");

// Live conversion
input.addEventListener("input", convertTemperature);
select.addEventListener("change", convertTemperature);

function convertTemperature() {
  const temp = parseFloat(input.value);
  const unit = select.value;

  if (isNaN(temp)) {
    resultDiv.textContent = "Please enter a valid number.";
    tempImage.src = "images/normal.png";
    return;
  }

  let celsius, fahrenheit, kelvin;

  if (unit === "celsius") {
    celsius = temp;
    fahrenheit = (temp * 9) / 5 + 32;
    kelvin = temp + 273.15;
  } else if (unit === "fahrenheit") {
    celsius = ((temp - 32) * 5) / 9;
    fahrenheit = temp;
    kelvin = celsius + 273.15;
  } else if (unit === "kelvin") {
    celsius = temp - 273.15;
    fahrenheit = (celsius * 9) / 5 + 32;
    kelvin = temp;
  }

  resultDiv.innerHTML = `
    <p><strong>Celsius:</strong> ${celsius.toFixed(2)} °C</p>
    <p><strong>Fahrenheit:</strong> ${fahrenheit.toFixed(2)} °F</p>
    <p><strong>Kelvin:</strong> ${kelvin.toFixed(2)} K</p>
  `;

  addToHistory(temp, unit, celsius, fahrenheit, kelvin);
  updateImage(celsius);
}

function addToHistory(inputTemp, inputUnit, c, f, k) {
  const li = document.createElement("li");
  li.textContent = `${inputTemp}°${symbol(inputUnit)} → ${c.toFixed(2)}°C, ${f.toFixed(2)}°F, ${k.toFixed(2)}K`;
  historyList.prepend(li);
}

function symbol(unit) {
  switch (unit) {
    case "celsius": return "C";
    case "fahrenheit": return "F";
    case "kelvin": return "K";
  }
}
function clearFields() {
  document.getElementById("tempInput").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("tempImage").src = "images/normal.png";
}
function clearHistory() {
  document.getElementById("historyList").innerHTML = "";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

// 🔥 Dynamic image change
function updateImage(celsius) {
  if (celsius > 35) {
    tempImage.src = "images/hot.png";
  } else if (celsius < 10) {
    tempImage.src = "images/cold.png";
  } else {
    tempImage.src = "images/normal.png";
  }
}
