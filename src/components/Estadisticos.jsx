/* eslint-disable react/prop-types */
import { useState } from 'react';
import estadisticas from '../utils/Estadisticas.js';
import { Button, Segment, Portal, Table } from 'semantic-ui-react';

const Estadisticos = (props) => {
	const [state, setState] = useState(false);
	const {
		posicionesXRungeKutta,
		posicionesYRungeKutta,
		posicionesXEuler,
		posicionesYEuler,
		posicionesXVerlet,
		posicionesYVerlet,
	} = props.estadisticos;

	const RungeKutta = estadisticas(
		'todas',
		posicionesXRungeKutta,
		posicionesYRungeKutta,
	);

	const Verlet = estadisticas('todas', posicionesXVerlet, posicionesYVerlet);
	const Euler = estadisticas('todas', posicionesXEuler, posicionesYEuler);

	const handleClose = () => setState(false);
	const handleOpen = () => setState(true);

	return (
		<>
			<Button
				content='Abrir Estadisticos'
				disabled={state}
				positive
				onClick={handleOpen}
			/>
			<Portal onClose={handleClose} open={state}>
				<Segment
					style={{
						left: '0%',
						position: 'fixed',
						top: '0%',
						zIndex: 1000,
					}}
				>
					<Table celled>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell></Table.HeaderCell>
								<Table.HeaderCell>Media X</Table.HeaderCell>
								<Table.HeaderCell>Media Y</Table.HeaderCell>
								<Table.HeaderCell>Varianza X</Table.HeaderCell>
								<Table.HeaderCell>Varianza Y</Table.HeaderCell>
								<Table.HeaderCell>Desviación Estándar X</Table.HeaderCell>
								<Table.HeaderCell>Desviación Estándar Y</Table.HeaderCell>
								<Table.HeaderCell>Margen de Error X</Table.HeaderCell>
								<Table.HeaderCell>Margen de Error Y</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row>
								<Table.Cell>Runge Kutta</Table.Cell>
								<Table.Cell>{RungeKutta.media.x}</Table.Cell>
								<Table.Cell>{RungeKutta.media.y}</Table.Cell>
								<Table.Cell>{RungeKutta.varianza.x}</Table.Cell>
								<Table.Cell>{RungeKutta.varianza.y}</Table.Cell>
								<Table.Cell>{RungeKutta.desviacionEstandar.x}</Table.Cell>
								<Table.Cell>{RungeKutta.desviacionEstandar.y}</Table.Cell>
								<Table.Cell>{RungeKutta.margenError.x}</Table.Cell>
								<Table.Cell>{RungeKutta.margenError.y}</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Euler</Table.Cell>
								<Table.Cell>{Euler.media.x}</Table.Cell>
								<Table.Cell>{Euler.media.y}</Table.Cell>
								<Table.Cell>{Euler.varianza.x}</Table.Cell>
								<Table.Cell>{Euler.varianza.y}</Table.Cell>
								<Table.Cell>{Euler.desviacionEstandar.x}</Table.Cell>
								<Table.Cell>{Euler.desviacionEstandar.y}</Table.Cell>
								<Table.Cell>{Euler.margenError.x}</Table.Cell>
								<Table.Cell>{Euler.margenError.y}</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Verlet</Table.Cell>
								<Table.Cell>{Verlet.media.x}</Table.Cell>
								<Table.Cell>{Verlet.media.y}</Table.Cell>
								<Table.Cell>{Verlet.varianza.x}</Table.Cell>
								<Table.Cell>{Verlet.varianza.y}</Table.Cell>
								<Table.Cell>{Verlet.desviacionEstandar.x}</Table.Cell>
								<Table.Cell>{Verlet.desviacionEstandar.y}</Table.Cell>
								<Table.Cell>{Verlet.margenError.x}</Table.Cell>
								<Table.Cell>{Verlet.margenError.y}</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

					<Button content='Cerrar' negative onClick={handleClose} />
				</Segment>
			</Portal>
		</>
	);
};

export default Estadisticos;
