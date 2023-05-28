import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import { createHash } from 'crypto';

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
	console.log(claveEncriptada)
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

		res.send('Datos de registro insertados correctamente');
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});


app.listen(port, () => {
	console.log(`Servidor iniciado en el puerto ${port}`);
});