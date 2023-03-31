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
}
  
// Lida com o envio do formulário e calcula o valor da função polinomial com base nos coeficientes inseridos
function handleSubmit(event) {
    event.preventDefault();
    const degree = document.getElementById("degree").value;
    const coefficients = [];
    const coefficientInputs = document.getElementsByName("coefficients[]");
    for (let i = 0; i <= degree; i++) {
        coefficients.push(parseFloat(coefficientInputs[i].value));
    }
    const x = parseFloat(prompt("Digite o valor de x:"));
    let result = 0;
    for (let i = 0; i <= degree; i++) {
        result += coefficients[i] * Math.pow(x, i);
    }
    alert(`O valor da função polinomial é ${result}.`);
}
  
// Adiciona um ouvinte de eventos para o formulário
const polynomialForm = document.getElementById("polynomial-form");
polynomialForm.addEventListener("submit", handleSubmit);

// Adiciona um ouvinte de eventos para o grau do polinômiox
const degreeInput = document.getElementById("degree");
degreeInput.addEventListener("input", addCoefficientInputs);

// Adiciona campos de entrada de coeficientes ao carregar a página
addCoefficientInputs();