import calcularAceleracion from './Aceleracion.js';
export default function rungeKutta(posicion, velocidad, datosFisicos) {
	const k1 = calcularAceleracion(posicion, velocidad, datosFisicos);

	const k2 = calcularAceleracion(
		{
			x: posicion.x + 0.5 * velocidad.x * datosFisicos.dt,
			y: posicion.y + 0.5 * velocidad.y * datosFisicos.dt,
		},
		{
			x: velocidad.x + 0.5 * k1.x * datosFisicos.dt,
			y: velocidad.y + 0.5 * k1.y * datosFisicos.dt,
		},
		datosFisicos,
	);

	const k3 = calcularAceleracion(
		{
			x: posicion.x + 0.5 * velocidad.x * datosFisicos.dt,
			y: posicion.y + 0.5 * velocidad.y * datosFisicos.dt,
		},
		{
			x: velocidad.x + 0.5 * k2.x * datosFisicos.dt,
			y: velocidad.y + 0.5 * k2.y * datosFisicos.dt,
		},
		datosFisicos,
	);

	const k4 = calcularAceleracion(
		{
			x: posicion.x + velocidad.x * datosFisicos.dt,
			y: posicion.y + velocidad.y * datosFisicos.dt,
		},
		{
			x: velocidad.x + k3.x * datosFisicos.dt,
			y: velocidad.y + k3.y * datosFisicos.dt,
		},
		datosFisicos,
	);

	posicion.x =
		posicion.x +
		(1 / 6) *
			(k1.x + 2 * k2.x + 2 * k3.x + k4.x) *
			datosFisicos.dt *
			datosFisicos.dt +
		velocidad.x * datosFisicos.dt;
	posicion.y =
		posicion.y +
		(1 / 6) *
			(k1.y + 2 * k2.y + 2 * k3.y + k4.y) *
			datosFisicos.dt *
			datosFisicos.dt +
		velocidad.y * datosFisicos.dt;

	velocidad.x =
		velocidad.x +
		(1 / 6) * (k1.x + 2 * k2.x + 2 * k3.x + k4.x) * datosFisicos.dt;
	velocidad.y =
		velocidad.y +
		(1 / 6) * (k1.y + 2 * k2.y + 2 * k3.y + k4.y) * datosFisicos.dt;

	/*
    const nuevaPosicion = {
        x:
            posicion.x +
            (1 / 6) * (k1.x + 2 * k2.x + 2 * k3.x + k4.x) * datosFisicos.dt * datosFisicos.dt +
            velocidad.x * datosFisicos.dt,
        y:
            posicion.y +
            (1 / 6) * (k1.y + 2 * k2.y + 2 * k3.y + k4.y) * datosFisicos.dt * datosFisicos.dt +
            velocidad.y * datosFisicos.dt,
    };
    const nuevaVelocidad = {
        x: velocidad.x + (1 / 6) * (k1.x + 2 * k2.x + 2 * k3.x + k4.x) * datosFisicos.dt,
        y: velocidad.y + (1 / 6) * (k1.y + 2 * k2.y + 2 * k3.y + k4.y) * datosFisicos.dt,
    };
    */
	//return { posicion: nuevaPosicion, velocidad: nuevaVelocidad };
}
