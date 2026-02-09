import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        //Verificar si existe el header
        if(!authHeader){
            return res.status(401).json({
                message: "Token no proporcionado"
            })
        }

        //Extraer el token
        const token = authHeader.split(" ")[1]

        if(!token){
            return res.status(401).json({
                message: "Token invalido"
            })
        }

        //Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Guardar info del usuario en la request
        req.user = decoded

        //Continuar
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Token invalido o expirado"
        })
    }
}