// Función para calcular la aceleración en un momento dado

export default function calcularAceleracion(posicion, velocidad, datosFisicos) {
	const velocidadAbsoluta = Math.sqrt(velocidad.x ** 2 + velocidad.y ** 2);
	// Fórmula de la fuerza de arrastre (drag force)
	const fuerzaArrastre = {
		x:
			(-0.5 *
				datosFisicos.densidadDeAire *
				datosFisicos.area *
				datosFisicos.coeficienteArrastre *
				velocidad.x *
				velocidadAbsoluta) /
			datosFisicos.masa,
		y:
			(-0.5 *
				datosFisicos.densidadDeAire *
				datosFisicos.area *
				datosFisicos.coeficienteArrastre *
				velocidad.y *
				velocidadAbsoluta) /
			datosFisicos.masa,
	};

	// Fórmula de la fuerza gravitatoria
	const fuerzaGravitatoria = {
		x: datosFisicos.masa * datosFisicos.gravedad.x,
		y: datosFisicos.masa * datosFisicos.gravedad.y,
	};

	// Fórmula de la aceleración, incluyendo la fuerza del viento
	const aceleracion = {
		x:
			(fuerzaArrastre.x + fuerzaGravitatoria.x + datosFisicos.fuerzaViento.x) /
			datosFisicos.masa,
		y:
			(fuerzaArrastre.y + fuerzaGravitatoria.y + datosFisicos.fuerzaViento.y) /
			datosFisicos.masa,
	};

	//console.log(aceleracion);
	return aceleracion;
}
