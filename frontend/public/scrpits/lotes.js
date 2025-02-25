document.getElementById("bdetalles").addEventListener('click', function() {
    document.getElementById('detalles_inicio').style.display = 'block';
});

document.getElementById('cerrarBtn').addEventListener('click', function() {
    document.getElementById('detalles_inicio').style.display = 'none';
});

async function obtenerLotes() {
    try {
        const response = await fetch('http://localhost:3000/fechasLotes');
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        const detallesInicioDiv = document.getElementById('detalles_inicio');

        detallesInicioDiv.innerHTML = '<span class="cerrar" id="cerrarBtn">&times;</span>';
        data.forEach(lote => {
            const loteElement = document.createElement('div');
            loteElement.className = 'articulo';
            loteElement.innerHTML = `
                <span class="span_f">${lote.nombre_lote}</span>
                <div class="icons">
                    <i class="refresh-icon">🔄</i>
                    <i class="delete-icon" data-id="${lote.id}">🗑️</i>
                </div>
                <br>
            `;
            detallesInicioDiv.appendChild(loteElement);
        });

        // Añadir eventos de clic a los íconos de eliminación
        document.querySelectorAll('.delete-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                eliminarLote(id);
            });
        });

        // Añadir evento de clic al icono de refresco para abrir la nueva ventana superpuesta
        document.querySelectorAll('.refresh-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                document.getElementById('nueva_ventana').style.display = 'block';
                document.getElementById('detalles_inicio').style.display = 'none'; // Cerrar "detalles_inicio"
            });
        });

        // Reasignar el evento al botón cerrar después de actualizar el contenido
        document.getElementById('cerrarBtn').addEventListener('click', function() {
            document.getElementById('detalles_inicio').style.display = 'none';
        });

        // Añadir evento de clic al botón de cerrar de la nueva ventana
        document.getElementById('cerrarNuevaVentana').addEventListener('click', function() {
            document.getElementById('nueva_ventana').style.display = 'none';
        });
    } catch (error) {
        document.getElementById('detalles_inicio').innerText = 'Error al cargar los lotes';
        console.error('Error:', error);
    }
}

async function eliminarLote(id) {
    if (!id) {
        alert('ID no válido');
        return;
    }
    try {
        const response = await fetch(`http://localhost:3000/fechasLotes/${id}`, {
            method: 'DELETE'
        });
        const result = await response.text();
        alert(result);
        obtenerLotes(); // Recargar los lotes después de eliminar
    } catch (error) {
        alert('Error al eliminar el lote');
        console.error('Error:', error);
    }
}

obtenerLotes();


// Función para obtener y mostrar los lotes
function obtenerLotes() {
fetch('http://localhost:3000/lotesa')
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la solicitud');
    }
    return response.json();
})
.then(data => {
    const tableBody = document.getElementById('lotes-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    data.forEach(lote => {
        const fechaSiembra = new Date(lote.fecha_siembra);
        const fechaFormateada = fechaSiembra.toISOString().split('T')[0]; // Convierte a yyyy-MM-dd
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lote.id}</td>
            <td><input type="text" value="${lote.nombre_lote}" data-id="${lote.id}" data-campo="nombre_lote"></td>
            <td><input type="number" value="${lote.area_lote}" data-id="${lote.id}" data-campo="area_lote"></td>
            <td><input type="text" value="${lote.tipo_cultivo}" data-id="${lote.id}" data-campo="tipo_cultivo"></td>
            <td><input type="text" value="${lote.variedad}" data-id="${lote.id}" data-campo="variedad"></td>
            <td><input type="number" value="${lote.densidad_siembra}" data-id="${lote.id}" data-campo="densidad_siembra"></td>
            <td><input type="date" value="${fechaFormateada}" data-id="${lote.id}" data-campo="fecha_siembra"></td>
            <td><button onclick="actualizarLote(${lote.id})">Actualizar</button></td>
        `;
        tableBody.appendChild(row);
    });
})
.catch(error => console.error('Error al obtener los lotes:', error));
}


// Función para actualizar un lote
function actualizarLote(id) {
const inputs = document.querySelectorAll(`input[data-id="${id}"]`);
const datosActualizados = {};
inputs.forEach(input => {
    datosActualizados[input.getAttribute('data-campo')] = input.value;
});
fetch(`http://localhost:3000/actualizar-lote/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosActualizados)
})
    .then(response => response.text())
    .then(data => {
        alert(data);
        obtenerLotes();  // Volver a obtener los lotes para reflejar los cambios
    })
    .catch(error => console.error('Error al actualizar el lote:', error));
}

// Obtener los lotes cuando la página se carga
window.onload = obtenerLotes;
