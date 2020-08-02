import {Model, DATA_TYPES} from "https://deno.land/x/denodb/mod.ts"
import nanoid from "https://deno.land/x/nanoid/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"

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
}
