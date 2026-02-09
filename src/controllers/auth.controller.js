import bcrypt from "bcrypt"
import pool from "../db/index.js"
import jwt from "jsonwebtoken"

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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        //Validaciones
        if(!email || !password){
            return res.status(400).json({
                message: "Email y contraseña son obligatorios"
            })
        }

        //Buscar usuario
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        if(result.rows.length === 0){
            return res.status(401).json({
                message: "Credenciales invalidas"
            })
        }

        const user = result.rows[0]

        //Comparar contraseñas
        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword){
            return res.status(401).json({
                message: "Credenciales invalidas"
            })
        }

        //Generar token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        //Respuesta
        res.json({
            message: "Login exitoso",
            token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error al iniciar sesion"
        })
    }
}