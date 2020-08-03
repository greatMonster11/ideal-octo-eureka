import {Model, DATA_TYPES} from "https://deno.land/x/denodb/mod.ts"
import nanoid from "https://deno.land/x/nanoid/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"
import {makeJwt, setExpiration, Jose, Payload} from "https://deno.land/x/djwt/mod.ts"
import {JwtConfig} from "../../middlewares/jwt.ts"

export interface IUser {
    id?: string
    firstName: string
    lastName: string
    password: string
}

export class User extends Model {
    static table = "users"
    static timestamp = true

    static fields = {
        id: {
            primaryKey: true,
            type: DATA_TYPES.STRING
        },
        firstName: {
            type: DATA_TYPES.STRING
        },
        lastName: {
            type: DATA_TYPES.STRING
        },
        password: {
            type: DATA_TYPES.STRING
        },
    }

    // Id will generate a nanoid by default
    static defaults = {
        id: nanoid()
    }

    static async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(8)
        return bcrypt.hash(password, salt)
    }

    static generateJwt(id: string) {
        // Create the payload with the expiration date (token have an expiry date)
        // and the id of current user
        const payload: Payload = {
            id,
            exp: setExpiration(new Date().getTime() + JwtConfig.expirationTime)
        }
        const header: Jose = {
            alg: JwtConfig.alg as Jose["alg"],
            typ: JwtConfig.type
        }

        // return the generated token
        return makeJwt({header, payload, key: JwtConfig.secretKey})
    }
}
