import { Role } from './roles.enum';

export type Payload = {
    email: string;
    id: string;
    role: Role;
    displayName: string;
    avatar: string;
    status: number;
};
