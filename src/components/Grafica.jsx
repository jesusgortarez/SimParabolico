/* eslint-disable react/prop-types */
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);
const Grafica = (props) => {
	const {
		segundos,
		posicionesXRungeKutta,
		posicionesYRungeKutta,
		posicionesXEuler,
		posicionesYEuler,
		posicionesXVerlet,
		posicionesYVerlet,

		velocidadesXRungeKutta,
		velocidadesYRungeKutta,
		velocidadesXEuler,
		velocidadesYEuler,
		velocidadesXVerlet,
		velocidadesYVerlet,
	} = props.graficos;

	function createDataset(
		label,
		posicionesX,
		posicionesY,
		velocidadX,
		velocidadY,
		borderColor,
		backgroundColor,
	) {
		return {
			label,
			data: posicionesY.map((valor) => valor.toFixed(2)),
			borderColor,
			backgroundColor,
			borderWidth: 3,
			pointRadius: 1,
			dataPosicionX: posicionesX.map((valor) => valor.toFixed(2)),
			dataPosicionY: posicionesY.map((valor) => valor.toFixed(2)),
			dataVelocidadX: velocidadX.map((valor) => valor.toFixed(2)),
			dataVelocidadY: velocidadY.map((valor) => valor.toFixed(2)),
			tension: 0,
		};
	}

	const datos = {
		labels: segundos,
		datasets: [
			createDataset(
				'rungeKutta',
				posicionesXRungeKutta,
				posicionesYRungeKutta,
				velocidadesXRungeKutta,
				velocidadesYRungeKutta,
				'rgb(132, 99, 255)',
				'rgba(132, 99, 255, 0.5)',
			),

			createDataset(
				'Euler',
				posicionesXEuler,
				posicionesYEuler,
				velocidadesXEuler,
				velocidadesYEuler,
				'rgb(99, 255, 132)',
				'rgba(99, 255, 132, 0.5)',
			),
			createDataset(
				'Verlet',
				posicionesXVerlet,
				posicionesYVerlet,
				velocidadesXVerlet,
				velocidadesYVerlet,
				'rgb(255, 99, 132)',
				'rgba(255, 99, 132, 0.5)',
			),
		],
	};
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				title: {
					display: true,
					text: 'Tiempo',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Posición en Y',
				},
			},
			/*
            y2: {
				position: 'right',
				title: {
					display: true,
					text: 'Aceleración',
				},
			},
            */
		},
		plugins: {
			legend: {
				display: true,
				position: 'top',
			},
			title: {
				display: true,
				text: 'Grafica',
			},
			tooltip: {
				mode: 'index',
				intersect: false,
				callbacks: {
					label: (context) => {
						return `Posición X: ${
							context.dataset.dataPosicionX[context.dataIndex]
						} Posición Y: ${
							context.dataset.dataPosicionY[context.dataIndex]
						} Velocidad X: ${
							context.dataset.dataVelocidadX[context.dataIndex]
						} Velocidad Y: ${
							context.dataset.dataVelocidadY[context.dataIndex]
						}`;
					},
				},
			},
		},
	};

	return <Line style={{ minHeight: '300px' }} options={options} data={datos} />;
};

export default Grafica;
