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

function generarCodigo() {
	var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var codigo = '';
	for (var i = 0; i < 5; i++) {
		var indice = Math.floor(Math.random() * letras.length);
		codigo += letras.charAt(indice);
	}
	return codigo;
}

function obtenerFechaActual() {
	var fecha = new Date();
	var year = fecha.getFullYear();
	var month = fecha.getMonth() + 1;
	month = month < 10 ? '0' + month : month;
	var day = fecha.getDate();
	day = day < 10 ? '0' + day : day;
	var fechaActual = year + '-' + month + '-' + day;

	return fechaActual;
}

function obtenerTiempoActual() {
	var tiempo = new Date();
	var hours = tiempo.getHours();
	hours = hours < 10 ? '0' + hours : hours;
	var minutes = tiempo.getMinutes();
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var seconds = tiempo.getSeconds();
	seconds = seconds < 10 ? '0' + seconds : seconds;
	var tiempoActual = hours + ':' + minutes + ':' + seconds;

	return tiempoActual;
}

function calcularDiferenciaDeTiempo(hora1, hora2) {
	var tiempo1 = new Date('2000-01-01 ' + hora1);
	var tiempo2 = new Date('2000-01-01 ' + hora2);
	var diferencia = Math.abs(tiempo1 - tiempo2);
	var horas = Math.floor(diferencia / 3600000);
	horas = horas < 10 ? '0' + horas : horas;
	diferencia %= 3600000;
	var minutos = Math.floor(diferencia / 60000);
	minutos = minutos < 10 ? '0' + minutos : minutos;
	diferencia %= 60000;
	var segundos = Math.floor(diferencia / 1000);
	var diferenciaTiempo = horas + ':' + minutos + ':' + segundos;
	return diferenciaTiempo;
  }

function obtenerMinutosExtra(hora1, hora2) {
	var tiempo1 = new Date('2000-01-01 ' + hora1);
	var tiempo2 = new Date('2000-01-01 ' + hora2);
	
	var diferencia = Math.abs(tiempo1 - tiempo2);
	
	var horas = Math.floor(diferencia / 3600000);
	
	if (horas > 0) {
	  var minutosExtra = Math.floor((diferencia % 3600000) / 60000);
	  return minutosExtra;
	} else {
	  return 0;
	}
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
		const { v_valorBase, k_idPlan } = resultado.rows[0];

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

app.post('/getEstacion', async (req, res) => {

	const { estacionID } = req.body;

	try {
		const query = 'SELECT * FROM estacion WHERE "k_idEstacion" = $1'
		const queryValues = [estacionID]
		const result = await pool.query(query, queryValues);

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

app.post('/getEstacionesLibres', async (req, res) => {

	try {
		const query = 'SELECT * FROM estacion WHERE "q_numeroBicicletas" < 5'
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

app.post('/historial', async (req, res) => {

	const { k_codigo} = req.body;

	try {
		const query = `SELECT v.*, e1."n_nombreEstacion" AS estacion_bloqueo_nombre, e1."n_direccion" AS estacion_bloqueo_direccion, e2."n_nombreEstacion" AS estacion_desbloqueo_nombre, e2."n_direccion" AS estacion_desbloqueo_direccion
		FROM "viaje" v
		LEFT JOIN "estacion" e1 ON v."n_idEstacionBloqueo" = e1."k_idEstacion"
		LEFT JOIN "estacion" e2 ON v."n_idEstacionDesbloqueo" = e2."k_idEstacion"
		WHERE v."k_codigo" = $1;`
		const queryValues = [k_codigo]
		const result = await pool.query(query, queryValues);

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


app.post('/iniciarViaje', async (req, res) => {
	try {
		const { i_estado, k_codigo, k_idEstacion, k_idLocalidad, k_idPlan, k_idUsuario,
			k_tipoId, n_apellido1, n_direccion, n_nombre1, n_nombreEstacion,
			n_planServicio, o_tiempoViaje, q_numeroBicicletas,
			q_numeroViajes, v_saldoFinal, v_saldoInicial, v_saldoPendiente,
			v_valorBase } = req.body.dataToSend;

		const codigoViaje = generarCodigo();
		const fechaActual = obtenerFechaActual();
		const horaActual = obtenerTiempoActual();

		let valorSacada;
		let valorMinuto;

		const serieBicicletaQuery = 'SELECT "k_serieBicicleta" FROM "estacionBicicleta" WHERE "k_idEstacion" = $1 ORDER BY RANDOM() LIMIT 1;';
		const serieBicicletaValues = [k_idEstacion];
		const serieBicicleta = await pool.query(serieBicicletaQuery, serieBicicletaValues);
		const serieBicicletaID = serieBicicleta.rows[0].k_serieBicicleta;

		const tipoBicicletaQuery = 'SELECT "n_tipo" FROM bicicleta WHERE "k_serieBicicleta" = $1;';
		const tipoBicicletaValues = [serieBicicletaID];
		const tipoBicicleta = await pool.query(tipoBicicletaQuery, tipoBicicletaValues);
		const tipoBicicletaValue = tipoBicicleta.rows[0].n_tipo;

		if (tipoBicicletaValue == 'MECANICA') {
			valorSacada = req.body.dataToSend['v_valorRetiro.mecanico'];
		} else {
			valorSacada = req.body.dataToSend['v_valorRetiro.electrico'];
		}

		const viajeQuery = `INSERT INTO "viaje" ("k_idViaje", "f_bloqueo", "f_desbloqueo", "v_total", "o_horaFin", "o_horaInicio", "v_costo",
							"q_minutosAdicionales", "k_codigo", "n_idEstacionBloqueo", "n_idEstacionDesbloqueo") 
							VALUES ($1, NULL, $2, NULL,NULL,$3,$4,NULL,$5,NULL,$6);`;
		const viajeValues = [codigoViaje, fechaActual, horaActual, valorSacada, k_codigo, k_idEstacion];
		await pool.query(viajeQuery, viajeValues);

		const estacionViajeBicicletaQuery = 'INSERT INTO "estacionViajeBicicleta" ("k_idViaje", "k_idEstacion", "k_serieBicicleta", "i_tipoEvento") VALUES ($1, $2, $3, $4);';
		const estacionViajeBicicletaValues = [codigoViaje, k_idEstacion, serieBicicletaID, 'D'];
		await pool.query(estacionViajeBicicletaQuery, estacionViajeBicicletaValues);

		const estacionBicicletaQuery = 'UPDATE "estacionBicicleta" SET "i_estado" = $1 WHERE "k_serieBicicleta" = $2';
		const estacionBicicletaValues = ['E', serieBicicletaID];
		await pool.query(estacionBicicletaQuery, estacionBicicletaValues);

		const estacionQuery = `UPDATE estacion SET "q_numeroBicicletas" = (SELECT COUNT(*) FROM "estacionBicicleta" 
							WHERE "k_idEstacion" = $1 AND "i_estado" = 'D') 
							WHERE "k_idEstacion" = $1`;
		const estacionValues = [k_idEstacion];
		await pool.query(estacionQuery, estacionValues);

		res.send('Viaje iniciado');
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

app.post('/finalizarViaje', async (req, res) => {
	try {
		const { i_estado, k_codigo, k_idEstacion, k_idLocalidad, k_idPlan, k_idUsuario,
			k_tipoId, n_apellido1, n_direccion, n_nombre1, n_nombreEstacion,
			n_planServicio, o_tiempoViaje, q_numeroBicicletas,
			q_numeroViajes, v_saldoFinal, v_saldoInicial, v_saldoPendiente,
			v_valorBase } = req.body.dataToSend;

			let valorTotal;

		const viajeDataQuery = `SELECT * FROM viaje WHERE k_codigo = $1`;
		const viajeDataValues = [k_codigo];
		const viajeDataResult = (await pool.query(viajeDataQuery, viajeDataValues)).rows[0];

		const fechaActual = obtenerFechaActual();
		const horaActual = obtenerTiempoActual();
		const diferenciaTiempo = calcularDiferenciaDeTiempo(viajeDataResult.o_horaInicio, horaActual);
		const minutosExtra = obtenerMinutosExtra(viajeDataResult.o_horaInicio, horaActual);

		const tipoBicicletaQuery = 'SELECT b."n_tipo", b."k_serieBicicleta" FROM bicicleta b JOIN "estacionViajeBicicleta" evb ON b."k_serieBicicleta" = evb."k_serieBicicleta" WHERE evb."k_idViaje" = $1;';
		const tipoBicicletaValues = [viajeDataResult.k_idViaje];
		const tipoBicicleta = await pool.query(tipoBicicletaQuery, tipoBicicletaValues);
		const tipoBicicletaValue = tipoBicicleta.rows[0].n_tipo;
		const serieBicicletaValue = tipoBicicleta.rows[0].k_serieBicicleta;

		if (tipoBicicletaValue == 'MECANICA') {
			valorTotal = (req.body.dataToSend['v_valorRetiro.mecanico']) + ((req.body.dataToSend['v_valorMinuto.mecanico']) * minutosExtra);
		} else {
			valorTotal = (req.body.dataToSend['v_valorRetiro.electrico']) + ((req.body.dataToSend['v_valorMinuto.electrico']) * minutosExtra);
		}

		const viajeQuery = `UPDATE "viaje" SET "f_bloqueo" = $1, "v_total" = $2, "o_horaFin" = $3, "o_duracion" = $4, "q_minutosAdicionales" = $5, "n_idEstacionBloqueo" = $6 WHERE "k_idViaje" = $7;`;
		const viajeValues = [fechaActual,valorTotal,horaActual, diferenciaTiempo, minutosExtra, k_idEstacion, viajeDataResult.k_idViaje];
		await pool.query(viajeQuery, viajeValues);

		const estacionBicicletaQuery = 'INSERT INTO "estacionBicicleta" ("k_idEstacion", "k_serieBicicleta", "i_estado") VALUES ($1, $2, $3);';
		const estacionBicicletaValues = [k_idEstacion, serieBicicletaValue, 'D'];
		await pool.query(estacionBicicletaQuery, estacionBicicletaValues);

		const estacionViajeBicicletaQuery = 'INSERT INTO "estacionViajeBicicleta" ("k_idViaje", "k_idEstacion", "k_serieBicicleta", "i_tipoEvento") VALUES ($1, $2, $3, $4);';
		const estacionViajeBicicletaValues = [viajeDataResult.k_idViaje, k_idEstacion, serieBicicletaValue, 'B'];
		await pool.query(estacionViajeBicicletaQuery, estacionViajeBicicletaValues);

		res.send('Viaje iniciado');
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});


app.listen(port, () => {
	console.log(`Servidor iniciado en el puerto ${port}`);
});