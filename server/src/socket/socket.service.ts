import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocketService {
    constructor(private prisma: PrismaService) {}

    async joinRoom(roomPIN: string, userId: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error('Room does not exist');
        }
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User does not exist');
        }
        const isJoined = await this.prisma.room_participants.findFirst({
            where: {
                roomId: room.id,
                participant: {
                    userId: user.id,
                },
            },
        });
        if (isJoined) {
            return {
                userId,
                displayName: user.displayName,
            };
        }
        const participants = await this.prisma.participants.create({
            data: {
                userId: user.id,
                quizId: room.quizId,
                point: 0,
            },
        });

        await this.prisma.room_participants.create({
            data: {
                roomId: room.id,
                participantId: participants.id,
            },
        });
        return {
            userId,
            displayName: user.displayName,
        };
    }
}
