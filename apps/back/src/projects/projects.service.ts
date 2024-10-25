import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project } from './dto/Project.dto';
import { User } from '@prisma/client';

@Injectable()
export class ProjectsService {
    constructor(private prismaService: PrismaService){}

    async create(projectToCreate: Project, user: User) {
            return await this.prismaService.project.create({ data: { ...projectToCreate, founderRole: projectToCreate.founderRole, place: JSON.stringify(projectToCreate.place), founder: {
                connect: {
                    id: user.id
                }
            } , partnersWanted: JSON.stringify(projectToCreate.partnersWanted), stakes: JSON.stringify(projectToCreate.stakes), state: projectToCreate.state }, })
    }

    async getAll() {
        return await this.prismaService.project.findMany();
    }

    async getAllCreatedByLoggedUser(userId: number) {
        return await this.prismaService.project.findMany({
            where: {
                founderId: userId
            }
        });
    }

    async getOne(id: number) {
        return await this.prismaService.project.findUnique({
            where: {
                id
            },
            include: {
                founder: true
            }
        })
    }

    async edit(
        projectId: number,
        data: {
        name: string;
        description: string;
        place: string;
        state: 1 | 2 | 3 ;
        founderRole: string;
        stakes: string[];
        partnersWanted: {
            id: string;
            role: string;
            description: string;
        }[];
    }) {
        return await this.prismaService.project.update({
            where: {
                id: projectId,
            },
            data: { ...data, stakes: JSON.stringify(data.stakes), partnersWanted: JSON.stringify(data.partnersWanted), place: JSON.stringify(data.place) }
        })
    }

    async delete(id: number) {
        return await this.prismaService.project.delete({
            where: {
                id
            }
        })
    }
}
