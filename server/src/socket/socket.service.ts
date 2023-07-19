import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SocketService {
    constructor(private prisma: PrismaService) {}

    async joinRoom(roomPIN: string, userId: string, socketId: string) {
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
                isFinished: false,
            },
        });
        if (isJoined) {
            throw new Error('User already joined');
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
                socketId: socketId,
                roomId: room.id,
                participantId: participants.id,
            },
        });
        return {
            id: user.id,
            displayName: user.displayName,
        };
    }

    async leaveRoom(roomPIN: string, userId: string, socketId: string) {
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
        const foundUser = await this.prisma.room_participants.findFirst({
            where: {
                socketId: socketId,
                roomId: room.id,
                participant: {
                    userId: user.id,
                },
                isFinished: false,
            },
        });
        if (!foundUser) {
            throw new Error('User has not joined');
        }
        await this.prisma.room_participants.delete({
            where: {
                id: foundUser.id,
            },
        });
        await this.prisma.participants.delete({
            where: {
                id: foundUser.participantId,
            },
        });
        return {
            id: user.id,
            displayName: user.displayName,
        };
    }

    async getRoomParticipants(roomPIN: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error('Room does not exist');
        }
        const roomParticipants = await this.prisma.room_participants.findMany({
            where: {
                roomId: room.id,
            },
            select: {
                participant: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                displayName: true,
                                avatar: true,
                            },
                        },
                    },
                },
                roomId: true,
            },
        });
        return roomParticipants.map((roomParticipant) => {
            return {
                id: roomParticipant.participant.user.id,
                displayName: roomParticipant.participant.user.displayName,
                avatar: roomParticipant.participant.user.avatar,
            };
        });
    }

    async leaveRoomImmediately(socketId: string) {
        const foundUser = await this.prisma.room_participants.findFirst({
            where: {
                socketId: socketId,
                isFinished: false,
            },
            select: {
                id: true,
                room: {
                    select: {
                        PIN: true,
                    },
                },
                participantId: true,
            },
        });
        if (!foundUser) {
            return null;
        }
        await this.prisma.room_participants.delete({
            where: {
                id: foundUser.id,
            },
        });
        await this.prisma.participants.delete({
            where: {
                id: foundUser.participantId,
            },
        });
        return foundUser.room.PIN;
    }

    async endRoom(roomPIN: string) {
        const room = await this.prisma.rooms.findFirst({
            where: { PIN: roomPIN },
        });
        if (!room) {
            throw new Error('Room does not exist');
        }
        await this.prisma.room_participants.updateMany({
            where: {
                roomId: room.id,
            },
            data: {
                isFinished: true,
            },
        });
    }
}
