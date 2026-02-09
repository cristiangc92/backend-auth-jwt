import bcrypt from "bcrypt"
import pool from "../db/index.js"

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validaciones basicas
        if(!email || !password){
            return res.status(400).json({
                messaje: "Email y contraseña son obligatorios"
            })
        }

        //Verificar si el usuario ya existe
        const userExists = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        )
        
        if(userExists.rows.length > 0){
            return res.status(409).json({
                message: "El usuario ya existe"
            })
        }

        //Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        //Guardar usuario
        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        )

        //Respuesta
        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: result.rows[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error registrado usuario"
        })
    }
}