// ------- genera inputs según tamaño seleccionado -----
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
  document.getElementById("resultado").innerHTML = "";
}

// -------  convierte número a fracción (si es racional) -----
function toFraction(num, tol = 1e-6, maxDen = 1000) {
  let sign = Math.sign(num);
  num = Math.abs(num);

  // Si es cercano a un entero → devolver entero
  if (Math.abs(num - Math.round(num)) < tol) {
    return (sign < 0 ? "-" : "") + Math.round(num);
  }

  let bestNum = 1, bestDen = 1;
  let errBest = Math.abs(num - bestNum / bestDen);

  for (let den = 1; den <= maxDen; den++) {
    let numTemp = Math.round(num * den);
    let err = Math.abs(num - numTemp / den);
    if (err < errBest) {
      bestNum = numTemp;
      bestDen = den;
      errBest = err;
      if (errBest < tol) break;
    }
  }

  // Si el error es pequeño, devolvemos como fracción
  if (errBest < tol) {
    return (sign < 0 ? "-" : "") + bestNum + "/" + bestDen;
  }
  // si el error no es suficientemente pequeño → decimal con 4 decimales
  return ((sign < 0 ? "-" : "") + num.toFixed(4));
}

// ------- Gauss-Jordan e impresión de inversa ------------
function calcularInversa() {
  const size   = parseInt(document.getElementById("sizeSelect").value);
  let matriz   = [];

  // Crear matriz aumentada [A | I]
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

  // Método Gauss-Jordan
  for (let i = 0; i < size; i++) {
    // pivoteo parcial
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

    // Normalizar
    let piv = matriz[i][i];
    for (let j = 0; j < 2 * size; j++) {
      matriz[i][j] /= piv;
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

  // Obtener parte derecha (inversa)
  let texto = "Matriz inversa:\n";
  for (let i = 0; i < size; i++) {
    let fila = [];
    for (let j = 0; j < size; j++) {
      let val = matriz[i][j + size];
      fila.push(toFraction(val));
    }
    texto += fila.join("   ") + "\n";
  }

  document.getElementById("resultado").innerText = texto;
}

// inicial
generarInputs();
