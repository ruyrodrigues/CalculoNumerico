// Adiciona campos de entrada de coeficientes ao formulário com base no grau inserido pelo usuário
function addCoefficientInputs() {
    const degree = document.getElementById("degree").value;
    const coefficientsDiv = document.getElementById("coefficients");
    coefficientsDiv.innerHTML = "";
    for (let i = degree; i >= 0; i--) {
      const input = document.createElement("input");
      input.type = "number";
      input.name = "coefficients[]";
      input.required = true;
      input.min = "-100";
      input.max = "100";
      const label = document.createElement("label");
      label.innerText = `x^${i} `;
      label.appendChild(input);
      coefficientsDiv.appendChild(label);
    }
    if (document.getElementById("result")) {
        const form = document.getElementById("polynomial-form");
        const resultLabel = document.getElementById("result")
        form.removeChild(resultLabel);
    }
}
  
// Lida com o envio do formulário e calcula o valor da função polinomial com base nos coeficientes inseridos
function handleSubmit(event) {
    event.preventDefault();
    const degree = document.getElementById("degree").value;
    const epsilon = document.getElementById("epsilon").value;
    const coefficientInputs = document.getElementsByName("coefficients[]");
    const coefficients = [];
    for (let i = 0; i <= degree; i++) {
        coefficients.push(parseFloat(coefficientInputs[i].value));
    }
    let result = showResults(degree, epsilon, coefficients);
    createResultLabel(result);
}
  
// Adiciona um Listener de eventos para o formulário
const polynomialForm = document.getElementById("polynomial-form");
polynomialForm.addEventListener("submit", handleSubmit);

// Adiciona um Listener de eventos para o grau do polinômiox
const degreeInput = document.getElementById("degree");
degreeInput.addEventListener("input", addCoefficientInputs);

// Adiciona campos de entrada de coeficientes ao carregar a página
addCoefficientInputs();

function createResultLabel(text) {
    if (document.getElementById("result")) {
        let resultLabel = document.getElementById("result");
        resultLabel.innerHTML = text;
    } else {
        const form = document.getElementById("polynomial-form");
        const resultLabel = document.createElement("label");
        resultLabel.innerHTML = text;
        resultLabel.id = "result";
        form.appendChild(resultLabel);
    }
}

function showResults(degree, epsilon, coefficients) {
    let response = "";
    response = exibirIntervalos(-1000, coefficients, epsilon, response);
    if (response == "") {
        response = "Não foi encontrado nenhum intervalo com raiz nesta equação!";
    }
    return response;
}

function exibirIntervalos(smallInterval, coefficients, precision, responseText) {
    let raiz = 0;
    let aux = 0;
    let aux_x = 0;
  
    while (smallInterval <= 1000) {
      let func2 = 0;

      for (let j = 0; j < coefficients.length; j++) {
        func2 += coefficients[j] * Math.pow(smallInterval, j);
      }

      if (smallInterval > -999 && Math.abs(smallInterval - aux_x) > precision) {
        if ((aux < 0 && func2 > 0) || (aux > 0 && func2 < 0)) {
            responseText += "Intervalo: [" + aux_x + "," + smallInterval + "]";

          let split = (aux_x + smallInterval) / 2;
          let aux_Split = 1;

          while (aux_Split > precision) {
            aux_Split = resolveEquation(split, coefficients);

            if (aux * aux_Split < 0) {
              smallInterval = split;
            } else {
              aux_x = split;
              aux = aux_Split;
            }

            split = (aux_x + smallInterval) / 2;
          }

          raiz = split;
          responseText += " (Raiz: " + raiz + ")<br>";
        }
      }
      aux = func2;
      aux_x = smallInterval;
      smallInterval += 1;
    }

    return responseText;
}

function resolveEquation(x, arrayNum) {
    let result = 0;

    for (let j = 0; j < arrayNum.length; j++) {
        result += arrayNum[j] * Math.pow(x, j);
    }

    return result;
}