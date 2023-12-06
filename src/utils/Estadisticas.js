export default function estadisticas(medida, arrayX, arrayY) {
	const medidasDisponibles = [
		'media',
		'varianza',
		'desviacionEstandar',
		'margenError',
		'todas',
	];

	if (!medidasDisponibles.includes(medida)) {
		return `La medida '${medida}' no está definida. Por favor, elija entre ${medidasDisponibles.join(
			', ',
		)}`;
	}
	if (medida === 'todas') {
		return {
			media: {
				x: calcularMedia(arrayX),
				y: arrayY ? calcularMedia(arrayY) : null,
			},
			varianza: {
				x: calcularVarianza(arrayX),
				y: arrayY ? calcularVarianza(arrayY) : null,
			},
			desviacionEstandar: {
				x: calcularDesviacionEstandar(arrayX),
				y: arrayY ? calcularDesviacionEstandar(arrayY) : null,
			},
			margenError: {
				x: calcularMargenError(arrayX),
				y: arrayY ? calcularMargenError(arrayY) : null,
			},
		};
	} else {
		const medidas = {
			media: {
				x: calcularMedia(arrayX),
				y: arrayY ? calcularMedia(arrayY) : null,
			},
			varianza: {
				x: calcularVarianza(arrayX),
				y: arrayY ? calcularVarianza(arrayY) : null,
			},
			desviacionEstandar: {
				x: calcularDesviacionEstandar(arrayX),
				y: arrayY ? calcularDesviacionEstandar(arrayY) : null,
			},
			margenError: {
				x: calcularMargenError(arrayX),
				y: arrayY ? calcularMargenError(arrayY) : null,
			},
		};

		return medidas[medida];
	}
}

// Función para calcular la media
function calcularMedia(array) {
	const media = array.reduce((sum, value) => sum + value, 0) / array.length;
	return media;
}

// Función para calcular la varianza
function calcularVarianza(array) {
	const media = calcularMedia(array);
	const varianza =
		array.reduce((sum, value) => sum + (value - media) ** 2, 0) /
		(array.length - 1);
	return varianza;
}

// Función para calcular la desviación estándar
function calcularDesviacionEstandar(array) {
	const desviacionEstandar = Math.sqrt(calcularVarianza(array));

	return desviacionEstandar;
}

// Calcular Margen de error
function calcularMargenError(array) {
	const desviacion = calcularDesviacionEstandar(array);
	const margenError = desviacion / Math.sqrt(array.length);
	return margenError;
}
