import calcularAceleracion from './Aceleracion.js';

export default function Euler(posicion, velocidad, datosFisicos) {
	const aceleracion = calcularAceleracion(posicion, velocidad, datosFisicos);

	// Actualizar la velocidad y la posición usando el método de Euler
	velocidad.x += aceleracion.x * datosFisicos.dt;
	velocidad.y += aceleracion.y * datosFisicos.dt;
	posicion.x += velocidad.x * datosFisicos.dt;
	posicion.y += velocidad.y * datosFisicos.dt;
}
