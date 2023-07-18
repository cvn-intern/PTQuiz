declare global {
    namespace App {
        interface Error {
            status: number
            message: string
        }
        interface Locals {
            user : {
                name : string,
                id : number
            }
        }
        interface PageData {
            user: {
                email: string,
                displayName: string,
                accessToken: string,
                refreshToken: string,
            }
            title: string
        }
    }
}

export { };
