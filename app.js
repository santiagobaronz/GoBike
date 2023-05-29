import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import { createHash } from 'crypto';
import { pid } from 'process';

const { Pool } = pkg;
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'GoBike',
	password: '3407',
	port: 5432,
});

function encriptarSHA256(clave) {
	const hash = createHash('sha256');
	hash.update(clave);
	const claveEncriptada = hash.digest('hex');
	return claveEncriptada;
}

app.post('/register', async (req, res) => {
	try {
		const { nombres, apellidos, correo, contrasena,
			nacionalidad, tipoID, numeroID, fechaNacimiento,
			sexo, telefono, eps, plan, titularTarjeta,
			tipoTarjeta, numeroTarjeta, mesTarjeta, yearTarjeta } = req.body;

		const usuarioQuery = 'INSERT INTO usuario ("k_idUsuario", "k_tipoId", n_nombre1, n_nombre2, n_apellido1, n_apellido2, f_nacimiento, n_nacionalidad, i_genero, n_correo, n_contrasena, n_eps, i_rol, n_telefono) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
		const usuarioValues = [numeroID, tipoID, nombres, '', apellidos, '', fechaNacimiento, nacionalidad, sexo, correo, encriptarSHA256(contrasena), eps, 'USER', telefono];
		await pool.query(usuarioQuery, usuarioValues);

		const metodoPagoQuery = 'INSERT INTO "metodoPago" ("n_numeroTarjeta", "n_tipoTarjeta", "n_nombreTarjeta", f_vencimiento, "k_tipoId", "k_idUsuario") VALUES ($1, $2, $3, $4, $5, $6)';
		const metodoPagoValues = [numeroTarjeta, tipoTarjeta, titularTarjeta, `${mesTarjeta}/20${yearTarjeta}`, tipoID, numeroID];
		await pool.query(metodoPagoQuery, metodoPagoValues);

		const planQuery = 'SELECT * FROM "planServicio" WHERE "k_idPlan" = $1';
		const planValues = [plan];
		const resultado = await pool.query(planQuery, planValues);
		const { k_idPlan, v_valorBase } = resultado.rows[0];

		const cuentaQuery = 'INSERT INTO cuenta ("v_saldoInicial", "v_saldoFinal", i_estado, "k_idUsuario", "k_tipoId", "k_idPlan", "v_saldoPendiente") VALUES ($1, $2, $3, $4, $5, $6, $7)';
		const cuentaValues = [v_valorBase, v_valorBase, 'ACTIV', numeroID, tipoID, k_idPlan, 0];
		await pool.query(cuentaQuery, cuentaValues);

		res.send('Registrado');
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

app.post('/login', async (req, res) => {
	try {
		const { correo, contrasena } = req.body;

		const loginQuery = 'SELECT * FROM usuario WHERE n_correo = $1 AND n_contrasena = $2';
		const loginValues = [correo, encriptarSHA256(contrasena)];
		const result = await pool.query(loginQuery, loginValues);
		if (result.rowCount === 0) {
			res.send(false)
		} else {
			res.send(result.rows[0])
		}
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

app.post('/getUser', async (req, res) => {
	try {
		const { userID } = req.body;

		const query = `
		SELECT usuario.*, cuenta.*, "planServicio".*
		FROM usuario
		JOIN cuenta ON usuario."k_idUsuario" = cuenta."k_idUsuario"
		JOIN "planServicio" ON cuenta."k_idPlan" = "planServicio"."k_idPlan"
		WHERE usuario."k_idUsuario" = $1
	  `;
		const values = [userID];

		const result = await pool.query(query, values);

		if (result.rowCount === 0) {
			res.send(false);
		} else {
			res.send(result.rows[0]);
		}
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

app.post('/getEstacionesConBicicletas', async (req, res) => {
	try {
		const query = 'SELECT * FROM estacion WHERE "q_numeroBicicletas" > 0'
		const result = await pool.query(query);

		if (result.rowCount === 0) {
			res.send(false);
		} else {
			res.send(result.rows);
		}
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});


app.listen(port, () => {
	console.log(`Servidor iniciado en el puerto ${port}`);
});