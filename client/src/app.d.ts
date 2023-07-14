// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
        // interface Platform {}
    }
}

export { };
