// Genera los inputs según el tamaño seleccionado
function generarInputs() {
  const size = parseInt(document.getElementById("sizeSelect").value);
  const cont = document.getElementById("inputsContainer");
  cont.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const fila = document.createElement("div");
    for (let j = 0; j < size; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.id = "m" + i + j;
      input.placeholder = "a" + (i + 1) + (j + 1);
      fila.appendChild(input);
    }
    cont.appendChild(fila);
  }
  document.getElementById("resultado").innerText = "";
}

// Calcula la inversa usando Gauss-Jordan
function calcularInversa() {
  const size = parseInt(document.getElementById("sizeSelect").value);
  let matriz = [];

  // Construir matriz aumentada [A | I]
  for (let i = 0; i < size; i++) {
    let fila = [];
    for (let j = 0; j < size; j++) {
      fila.push(parseFloat(document.getElementById("m" + i + j).value));
    }
    for (let j = 0; j < size; j++) {
      fila.push(i === j ? 1 : 0);
    }
    matriz.push(fila);
  }

  // Gauss-Jordan
  for (let i = 0; i < size; i++) {
    // Pivoteo parcial
    let maxRow = i;
    for (let k = i + 1; k < size; k++) {
      if (Math.abs(matriz[k][i]) > Math.abs(matriz[maxRow][i])) {
        maxRow = k;
      }
    }
    [matriz[i], matriz[maxRow]] = [matriz[maxRow], matriz[i]];

    if (matriz[i][i] === 0) {
      document.getElementById("resultado").innerText = "La matriz no es invertible.";
      return;
    }

    // Normalizar fila
    let pivote = matriz[i][i];
    for (let j = 0; j < 2 * size; j++) {
      matriz[i][j] /= pivote;
    }

    // Hacer ceros en otras filas
    for (let k = 0; k < size; k++) {
      if (k !== i) {
        let factor = matriz[k][i];
        for (let j = 0; j < 2 * size; j++) {
          matriz[k][j] -= factor * matriz[i][j];
        }
      }
    }
  }

  // Extracción de la parte derecha (matriz inversa)
  let inversa = [];
  for (let i = 0; i < size; i++) {
    let fila = [];
    for (let j = 0; j < size; j++) {
      fila.push(Math.round(matriz[i][j + size]));
    }
    inversa.push(fila);
  }

  // Mostrar resultado
  let texto = "Matriz inversa:\n";
  inversa.forEach(fila => {
    texto += fila.join("  ") + "\n";
  });
  document.getElementById("resultado").innerText = texto;
}

// Inicial (2x2 por defecto)
generarInputs();
