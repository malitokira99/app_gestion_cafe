function actualizarGrafico(mes) {
    fetch('http://localhost:3000/datos/' + mes)
        .then(response => response.json())
        .then(data => {
            var ingresos = 0;
            var gastos = 0;
            var areaBarras = document.getElementById('area_barras');
            areaBarras.innerHTML = '';

            var maxIngreso = Math.max(...data.map(item => item.ingresos));
            var maxGasto = Math.max(...data.map(item => item.gastos));
            var maxValor = Math.max(maxIngreso, maxGasto);

            data.forEach(function(item) {
                ingresos += parseFloat(item.ingresos);
                gastos += parseFloat(item.gastos);

                var barraCaramelo = document.createElement('div');
                barraCaramelo.className = 'barra_caramelo barra';
                barraCaramelo.style.height = (item.ingresos / maxValor * 90) + '%';
                barraCaramelo.setAttribute('data-value', parseFloat(item.ingresos).toLocaleString() + ' △ COP');

                var barraCafe = document.createElement('div');
                barraCafe.className = 'barra_cafe barra';
                barraCafe.style.height = (item.gastos / maxValor * 90) + '%';
                barraCafe.setAttribute('data-value', parseFloat(item.gastos).toLocaleString() + ' 🔻 COP');

                var division = document.createElement('div');
                division.className = 'division';
                division.appendChild(barraCaramelo);
                division.appendChild(barraCafe);

                areaBarras.appendChild(division);
            });

            document.getElementById('ingresos').innerText = '+ COP ' + ingresos.toLocaleString();
            document.getElementById('gastos').innerText = '- COP ' + gastos.toLocaleString();
        });
}

document.getElementById('meses').addEventListener('change', function() {
    var mes = this.value;
    actualizarGrafico(mes);
});

// Mostrar datos del mes actual al cargar la interfaz
document.addEventListener('DOMContentLoaded', function() {
    var mesActual = new Date().toLocaleString('es-ES', { month: 'long' }).toLowerCase();
    document.getElementById('meses').value = mesActual;
    actualizarGrafico(mesActual);
});
// abrir y cerrar el cuadro flotante
document.getElementById("bdetalles").addEventListener('click', function() {
    document.getElementById('detalles_inicio').style.display = 'block';
});

document.getElementById('cerrarBtn').addEventListener('click', function() {
    document.getElementById('detalles_inicio').style.display = 'none';
});