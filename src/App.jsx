// eslint-disable-next-line no-unused-vars
import { useState, useEffect, useRef } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import rungeKutta from './utils/RungeKutta.js';
import euler from './utils/Euler.js';
import verlet from './utils/Verlet.js';
import DatosFisicos from './components/DatosFisicos.jsx';
import Grafica from './components/Grafica.jsx';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Estadisticos from './components/Estadisticos.jsx';
const TiroParabolicoSimulador = () => {
	const [datos, setDatos] = useState({
		segundos: [],
		posicionesXRungeKutta: [],
		posicionesYRungeKutta: [],
		posicionesXEuler: [],
		posicionesYEuler: [],
		posicionesXVerlet: [],
		posicionesYVerlet: [],

		velocidadesXRungeKutta: [],
		velocidadesYRungeKutta: [],
		velocidadesXEuler: [],
		velocidadesYEuler: [],
		velocidadesXVerlet: [],
		velocidadesYVerlet: [],
	});

	const [datosFisicos, setDatosFisicos] = useState({
		posicionInicial: { x: 0, y: 0 },
		anguloLanzamientoRadianes: (Math.PI / 180) * 45,
		velocidadInicial: {
			x: 10 * Math.cos(0.7854),
			y: 10 * Math.sin(0.7854),
		},
		masa: 1,
		densidadDeAire: 1.2,
		gravedad: { x: 0, y: -9.8 },
		fuerzaViento: { x: 0, y: 0 },
		coeficienteArrastre: 0.47,
		area: Math.PI * Math.pow(0.1 / 2, 2),
		dt: 0.01,
		numPasosMaximo: 1000,
	});

	function simularProyectil() {
		const metodos = ['rungeKutta', 'euler', 'verlet'];
		const posicionInicial = {
			rungeKutta: { ...datosFisicos.posicionInicial },
			euler: { ...datosFisicos.posicionInicial },
			verlet: { ...datosFisicos.posicionInicial },
		};
		const velocidadInicial = {
			rungeKutta: { ...datosFisicos.velocidadInicial },
			euler: { ...datosFisicos.velocidadInicial },
			verlet: { ...datosFisicos.velocidadInicial },
		};
		const posicionesX = {
			rungeKutta: [0],
			euler: [0],
			verlet: [0],
		};
		const posicionesY = {
			rungeKutta: [0],
			euler: [0],
			verlet: [0],
		};
		const velocidadesX = {
			rungeKutta: [0],
			euler: [0],
			verlet: [0],
		};
		const velocidadesY = {
			rungeKutta: [0],
			euler: [0],
			verlet: [0],
		};
		const flags = {
			rungeKutta: true,
			euler: true,
			verlet: true,
		};
		const segundos = [];

		for (let i = 0; i < datosFisicos.numPasosMaximo; i++) {
			metodos.forEach((metodo) => {
				if (flags[metodo]) {
					const posicion = posicionInicial[metodo];
					const velocidad = velocidadInicial[metodo];
					const velocidadesXMetodo = velocidadesX[metodo];
					const velocidadesYMetodo = velocidadesY[metodo];
					const posicionesXMetodo = posicionesX[metodo];
					const posicionesYMetodo = posicionesY[metodo];

					switch (metodo) {
						case 'rungeKutta':
							rungeKutta(posicion, velocidad, datosFisicos);
							break;
						case 'euler':
							euler(posicion, velocidad, datosFisicos);
							break;
						case 'verlet':
							verlet(posicion, velocidad, datosFisicos);
							break;
					}

					posicionesXMetodo.push(posicion.x);
					posicionesYMetodo.push(posicion.y);
					velocidadesXMetodo.push(velocidad.x);
					velocidadesYMetodo.push(velocidad.y);

					if (posicion.y <= 0 && posicion.x > 0) {
						flags[metodo] = false;
					}
				}
			});

			segundos.push(i);
			// Detener la simulación cuando todos los métodos lleguen al suelo
			if (!Object.values(flags).some((flag) => flag)) break;
		}

		const datos = {
			segundos,
			posicionesXRungeKutta: posicionesX.rungeKutta,
			posicionesYRungeKutta: posicionesY.rungeKutta,
			posicionesXEuler: posicionesX.euler,
			posicionesYEuler: posicionesY.euler,
			posicionesXVerlet: posicionesX.verlet,
			posicionesYVerlet: posicionesY.verlet,

			velocidadesXRungeKutta: velocidadesX.rungeKutta,
			velocidadesYRungeKutta: velocidadesY.rungeKutta,
			velocidadesXEuler: velocidadesX.euler,
			velocidadesYEuler: velocidadesY.euler,
			velocidadesXVerlet: velocidadesX.verlet,
			velocidadesYVerlet: velocidadesY.verlet,
		};

		return datos;
	}

	//console.log(simularProyectil());

	const handleDatosFisicosChange = (nuevosDatos) => {
		setDatosFisicos(nuevosDatos);
	};
	const handleSimularClick = () => {
		setDatos(simularProyectil());
	};

	return (
		<>
			<Grid columns={2}>
				<Grid.Column width={4}>
					<DatosFisicos onChange={handleDatosFisicosChange} />
					<Button content='Simular' positive onClick={handleSimularClick} />
					<Estadisticos estadisticos={datos} />
				</Grid.Column>

				<Grid.Column width={12}>
					<Grafica graficos={datos} />
				</Grid.Column>
			</Grid>
		</>
	);
};
export default TiroParabolicoSimulador;
