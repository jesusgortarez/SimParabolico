import { useState } from 'react';
import { Button, Segment, Label, Input } from 'semantic-ui-react';
// eslint-disable-next-line react/prop-types
const DatosFisicos = ({ onChange }) => {
	/* Parámetros físicos */

	// Condiciones iniciales
	const [posicionInicial, setPosicionInicial] = useState({ x: 0, y: 0 }); // Posición inicial en m
	// Ángulo de lanzamiento en radianes
	const [gradosInicial, setGradosInicial] = useState(45);
	let anguloLanzamientoRadianes = (Math.PI / 180) * gradosInicial;

	const [velocidadInicialMagnitud, setVelocidadInicialMagnitud] = useState({
		x: 10,
		y: 10,
	}); // m/s

	let velocidadInicial = {
		// Velocidad inicial
		x: velocidadInicialMagnitud.x * Math.cos(anguloLanzamientoRadianes),
		y: velocidadInicialMagnitud.y * Math.sin(anguloLanzamientoRadianes),
	};

	// Componentes fisicos
	const [masa, setMasa] = useState(1); // Masa del proyectil en kg
	const [densidadDeAire, setDensidadDeAire] = useState(1.2); // Densidad del aire a 15°C en kg/m³
	const [gravedad, setGravedad] = useState({ x: 0, y: -9.8 }); // Gravedad
	const [fuerzaViento, setFuerzaViento] = useState({ x: 0, y: 0 }); // m/s Considerando que el viento actúa solo en el eje x

	const [coeficienteArrastre, setCoeficienteArrastre] = useState(0.47); // Coeficiente de resistencia del aire para una esfera

	const [diametro, setDiametro] = useState(0.1); // Diámetro de la esfera en metros
	let area = Math.PI * Math.pow(diametro / 2, 2);
	//const [area, setArea] = useState( Math.PI * Math.pow(diametro / 2, 2)); // Área de sección transversal en m²

	// Paso de tiempo y número total de pasos
	const [dt, setDT] = useState(0.01); // Paso de tiempo
	const [numPasosMaximo, setNumPasosMaximo] = useState(1000); // Número total de pasos

	const handleInputChange = () => {
		const nuevosDatos = {
			posicionInicial,
			anguloLanzamientoRadianes,
			velocidadInicial,
			masa,
			densidadDeAire,
			gravedad,
			fuerzaViento,
			coeficienteArrastre,
			area,
			dt,
			numPasosMaximo,
		};
		onChange(nuevosDatos);
	};

	return (
		<Segment style={{ fontSize: 'smaller' }}>
			{/* Botón para guardar nuevos datos */}
			<Button content='Guardar Cambios' positive onClick={handleInputChange} />
			{/* Parámetros físicos iniciales*/}
			{/*}
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={posicionInicial.x}
				onChange={(e) =>
					setPosicionInicial({
						...posicionInicial,
						x: parseFloat(e.target.value) ,
					})
				}
			>
				<Label basic>Posición Inicial (x):</Label>
				<input />
				<Label basic>m</Label>
			</Input>
			{*/}
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={posicionInicial.y}
				onChange={(e) =>
					setPosicionInicial({
						...posicionInicial,
						y: parseFloat(e.target.value),
					})
				}
			>
				<Label basic>Posición Inicial (y):</Label>
				<input min='0' />
				<Label basic>m</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={velocidadInicialMagnitud.x}
				onChange={(e) =>
					setVelocidadInicialMagnitud({
						...velocidadInicialMagnitud,
						x: parseFloat(e.target.value),
					})
				}
			>
				<Label basic>Velocidad Inicial (x):</Label>
				<input min={0.00001} />
				<Label basic>m/s</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={velocidadInicialMagnitud.y}
				onChange={(e) =>
					setVelocidadInicialMagnitud({
						...velocidadInicialMagnitud,
						y: parseFloat(e.target.value),
					})
				}
			>
				<Label basic>Velocidad Inicial (y):</Label>
				<input min='0.00001' />
				<Label basic>m/s</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={gradosInicial}
				onChange={(e) => setGradosInicial(parseFloat(e.target.value))}
			>
				<Label basic>Ángulo de inicial:</Label>
				<input min='1' max='89' />
				<Label basic>grados</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={masa}
				onChange={(e) => setMasa(parseFloat(e.target.value))}
			>
				<Label basic>Masa:</Label>
				<input min='0.00001' max='1000' />
				<Label basic>kg</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={densidadDeAire}
				onChange={(e) => setDensidadDeAire(parseFloat(e.target.value))}
			>
				<Label basic>Densidad del Aire:</Label>
				<input min='0' />
				<Label basic>kg/m³</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={gravedad.y}
				onChange={(e) => setGravedad({ x: 0, y: parseFloat(e.target.value) })}
			>
				<Label basic>Gravedad (y)</Label>
				<input />
				<Label basic>m/s²</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={fuerzaViento.x}
				onChange={(e) =>
					setFuerzaViento({
						...fuerzaViento,
						x: parseFloat(e.target.value),
					})
				}
			>
				<Label basic>Velocidad del Viento:</Label>
				<input />
				<Label basic>m/s</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={coeficienteArrastre}
				onChange={(e) => setCoeficienteArrastre(parseFloat(e.target.value))}
			>
				<Label basic>Coeficiente de Arrastre:</Label>
				<input min='0.00001' max='1' />
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={diametro}
				onChange={(e) => setDiametro(parseFloat(e.target.value))}
			>
				<Label basic>Diámetro de la Esfera:</Label>
				<input min='0.00001' />
				<Label basic>m</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={dt}
				onChange={(e) => setDT(parseFloat(e.target.value))}
			>
				<Label basic>Paso de Tiempo:</Label>
				<input min='0.0001' />
				<Label basic>s</Label>
			</Input>
			<Input
				fluid
				labelPosition='right'
				type='number'
				value={numPasosMaximo}
				onChange={(e) => setNumPasosMaximo(parseInt(e.target.value))}
			>
				<Label basic>Maximo de pasos:</Label>
				<input min='1' />
			</Input>
		</Segment>
	);
};

export default DatosFisicos;
