import calcularAceleracion from './Aceleracion.js';

// Simulación del tiro parabólico no lineal usando el método de Verlet
export default function Verlet(posicion, velocidad, datosFisicos) {
	const aceleracion = calcularAceleracion(posicion, velocidad, datosFisicos);

	// Método de Verlet para actualizar la posición
	posicion.x +=
		velocidad.x * datosFisicos.dt + 0.5 * aceleracion.x * datosFisicos.dt ** 2;
	posicion.y +=
		velocidad.y * datosFisicos.dt + 0.5 * aceleracion.y * datosFisicos.dt ** 2;

	// Actualizar la velocidad usando el método de Verlet
	velocidad.x += 0.5 * aceleracion.x * datosFisicos.dt;
	velocidad.y += 0.5 * aceleracion.y * datosFisicos.dt;

	// Calcular la nueva aceleración en la posición actualizada
	const nuevaAceleracion = calcularAceleracion(
		posicion,
		velocidad,
		datosFisicos,
	);

	// Actualizar la velocidad restante usando la nueva aceleración
	velocidad.x += 0.5 * nuevaAceleracion.x * datosFisicos.dt;
	velocidad.y += 0.5 * nuevaAceleracion.y * datosFisicos.dt;
}
