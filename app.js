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

function separarCadenas(cadena) {
	var palabras = cadena.split(' ');
	var primeraParte = palabras[0];
	var segundaParte = palabras.slice(1).join(' ');

	return {
		primeraParte: primeraParte,
		segundaParte: segundaParte
	};
}


class DAO {

	static async verificarCorreo(info) {
		const { correoParaRevisar } = info;

		const correoQuery = 'SELECT EXISTS (SELECT 1 FROM usuario WHERE n_correo = $1) AS existe_correo;';
		const correoValues = [correoParaRevisar];
		const resultado = await pool.query(correoQuery, correoValues);
		return resultado.rows[0].existe_correo;
	}


	static async verificarDocumento(info){

		const { documentoParaRevisar } = info;

		const documentoQuery = 'SELECT EXISTS (SELECT 1 FROM usuario WHERE "k_idUsuario" = $1) AS existe_documento;';
		const documentoValues = [documentoParaRevisar];
		const resultado = await pool.query(documentoQuery, documentoValues);
		return resultado.rows[0].existe_documento;
	}

	static async registrarUsuario(info) {
		try {
			const { nombres, apellidos, correo, contrasena,
				nacionalidad, tipoID, numeroID, fechaNacimiento,
				sexo, telefono, eps, plan, titularTarjeta,
				tipoTarjeta, numeroTarjeta, mesTarjeta, yearTarjeta } = info;

			const { primeraParte: primerNombre, segundaParte: segundoNombre } = separarCadenas(nombres);
			const { primeraParte: primerApellido, segundaParte: segundoApellido } = separarCadenas(apellidos);

			const usuarioQuery = 'INSERT INTO usuario ("k_idUsuario", "k_tipoId", n_nombre1, n_nombre2, n_apellido1, n_apellido2, f_nacimiento, n_nacionalidad, i_genero, n_correo, n_contrasena, n_eps, i_rol, n_telefono) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)';
			const usuarioValues = [numeroID, tipoID, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, nacionalidad, sexo, correo, encriptarSHA256(contrasena), eps, 'USER', telefono];
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

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async loguearUsuario(info) {
		try {
			const { correo, contrasena } = info;

			const loginQuery = 'SELECT * FROM usuario WHERE n_correo = $1 AND n_contrasena = $2';
			const loginValues = [correo, encriptarSHA256(contrasena)];
			const result = await pool.query(loginQuery, loginValues);
			if (result.rowCount === 0) {
				return false;
			} else {
				return (result.rows[0])
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async obtenerUsuario(info) {
		try {
			const { userID } = info;

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
				return false;
			} else {
				return (result.rows[0]);
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async getEstacionesConBicicletas() {
		try {
			const query = 'SELECT * FROM estacion WHERE "q_numeroBicicletas" > 0'
			const result = await pool.query(query);

			if (result.rowCount === 0) {
				return false;
			} else {
				return (result.rows);
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async getInfoEstaciones(info) {
		const { estacionID } = info;

		try {
			const query = 'SELECT * FROM estacion WHERE "k_idEstacion" = $1'
			const queryValues = [estacionID]
			const result = await pool.query(query, queryValues);

			if (result.rowCount === 0) {
				return false;
			} else {
				return (result.rows);
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async getEstacionesLibres() {
		try {
			const query = 'SELECT * FROM estacion WHERE "q_numeroBicicletas" < 5'
			const result = await pool.query(query);

			if (result.rowCount === 0) {
				return false;
			} else {
				return (result.rows);
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async getHistorial(info) {
		const { k_codigo } = info;

		try {
			const query = `SELECT v.*, e1."n_nombreEstacion" AS estacion_bloqueo_nombre, e1."n_direccion" AS estacion_bloqueo_direccion, e2."n_nombreEstacion" AS estacion_desbloqueo_nombre, e2."n_direccion" AS estacion_desbloqueo_direccion
			FROM "viaje" v
			LEFT JOIN "estacion" e1 ON v."n_idEstacionBloqueo" = e1."k_idEstacion"
			LEFT JOIN "estacion" e2 ON v."n_idEstacionDesbloqueo" = e2."k_idEstacion"
			WHERE v."k_codigo" = $1;`
			const queryValues = [k_codigo]
			const result = await pool.query(query, queryValues);

			if (result.rowCount === 0) {
				return false;
			} else {
				return (result.rows);
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async iniciarViaje(info) {
		try {
			const { i_estado, k_codigo, k_idEstacion, k_idLocalidad, k_idPlan, k_idUsuario,
				k_tipoId, n_apellido1, n_direccion, n_nombre1, n_nombreEstacion,
				n_planServicio, o_tiempoViaje, q_numeroBicicletas,
				q_numeroViajes, v_saldoFinal, v_saldoInicial, v_saldoPendiente,
				v_valorBase } = info.dataToSend;

			

			const codigoViaje = generarCodigo();
			const fechaActual = obtenerFechaActual();
			const horaActual = obtenerTiempoActual();

			let valorSacada;
			let valorMinuto;

			console.log('Inicio viaje:' + codigoViaje)

			const serieBicicletaQuery = 'SELECT "k_serieBicicleta" FROM "estacionBicicleta" WHERE "k_idEstacion" = $1 ORDER BY RANDOM() LIMIT 1;';
			const serieBicicletaValues = [k_idEstacion];
			const serieBicicleta = await pool.query(serieBicicletaQuery, serieBicicletaValues);
			const serieBicicletaID = serieBicicleta.rows[0].k_serieBicicleta;

			const tipoBicicletaQuery = 'SELECT "n_tipo" FROM bicicleta WHERE "k_serieBicicleta" = $1;';
			const tipoBicicletaValues = [serieBicicletaID];
			const tipoBicicleta = await pool.query(tipoBicicletaQuery, tipoBicicletaValues);
			const tipoBicicletaValue = tipoBicicleta.rows[0].n_tipo;

			if (tipoBicicletaValue == 'MECANICA') {
				valorSacada = info.dataToSend['v_valorRetiro.mecanico'];
			} else {
				valorSacada = info.dataToSend['v_valorRetiro.electrico'];
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

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static async finalizarViaje(info) {
		try {
			const { i_estado, k_codigo, k_idEstacion, k_idLocalidad, k_idPlan, k_idUsuario,
				k_tipoId, n_apellido1, n_direccion, n_nombre1, n_nombreEstacion,
				n_planServicio, o_tiempoViaje, q_numeroBicicletas,
				q_numeroViajes, v_saldoFinal, v_saldoInicial, v_saldoPendiente,
				v_valorBase } = info.dataToSend;

			let valorTotal;

			const viajeDataQuery = `SELECT * FROM viaje WHERE k_codigo = $1 AND "n_idEstacionBloqueo" IS NULL`;
			const viajeDataValues = [k_codigo];
			const viajeDataResult = (await pool.query(viajeDataQuery, viajeDataValues)).rows[0];
			console.log('Final viaje:' + viajeDataResult.k_idViaje)

			

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
				valorTotal = (info.dataToSend['v_valorRetiro.mecanico']) + ((info.dataToSend['v_valorMinuto.mecanico']) * minutosExtra);
			} else {
				valorTotal = (info.dataToSend['v_valorRetiro.electrico']) + ((info.dataToSend['v_valorMinuto.electrico']) * minutosExtra);
			}

			const viajeQuery = `UPDATE "viaje" SET "f_bloqueo" = $1, "v_total" = $2, "o_horaFin" = $3, "o_duracion" = $4, "q_minutosAdicionales" = $5, "n_idEstacionBloqueo" = $6 WHERE "k_idViaje" = $7;`;
			const viajeValues = [fechaActual, valorTotal, horaActual, diferenciaTiempo, minutosExtra, k_idEstacion, viajeDataResult.k_idViaje];
			await pool.query(viajeQuery, viajeValues);

			const estacionBicicletaQuery = 'INSERT INTO "estacionBicicleta" ("k_idEstacion", "k_serieBicicleta", "i_estado") VALUES ($1, $2, $3);';
			const estacionBicicletaValues = [k_idEstacion, serieBicicletaValue, 'D'];
			await pool.query(estacionBicicletaQuery, estacionBicicletaValues);

			const estacionViajeBicicletaQuery = 'INSERT INTO "estacionViajeBicicleta" ("k_idViaje", "k_idEstacion", "k_serieBicicleta", "i_tipoEvento") VALUES ($1, $2, $3, $4);';
			const estacionViajeBicicletaValues = [viajeDataResult.k_idViaje, k_idEstacion, serieBicicletaValue, 'B'];
			await pool.query(estacionViajeBicicletaQuery, estacionViajeBicicletaValues);

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

}

app.post('/verificarCorreo', async (req, res) => {
	const resultado = await DAO.verificarCorreo(req.body)
	res.send(resultado);
});

app.post('/verificarDocumento', async (req, res) => {
	const resultado = await DAO.verificarDocumento(req.body)
	res.send(resultado);
});


app.post('/register', async (req, res) => {
	const resultado = await DAO.registrarUsuario(req.body)
	res.json(resultado);
});

app.post('/login', async (req, res) => {
	const resultado = await DAO.loguearUsuario(req.body)
	res.json(resultado);
});

app.post('/getUser', async (req, res) => {
	const resultado = await DAO.obtenerUsuario(req.body)
	res.json(resultado);
});

app.post('/getEstacionesConBicicletas', async (req, res) => {
	const resultado = await DAO.getEstacionesConBicicletas()
	res.json(resultado);
});

app.post('/getEstacion', async (req, res) => {
	const resultado = await DAO.getInfoEstaciones(req.body)
	res.json(resultado);
});

app.post('/getEstacionesLibres', async (req, res) => {
	const resultado = await DAO.getEstacionesLibres()
	res.json(resultado);
});

app.post('/historial', async (req, res) => {
	const resultado = await DAO.getHistorial(req.body)
	res.json(resultado);
});

app.post('/iniciarViaje', async (req, res) => {
	const resultado = await DAO.iniciarViaje(req.body)
	res.json(resultado);
});

app.post('/finalizarViaje', async (req, res) => {
	const resultado = await DAO.finalizarViaje(req.body)
	res.json(resultado);
});


app.listen(port, () => {
	console.log(`Servidor iniciado en el puerto ${port}`);
});