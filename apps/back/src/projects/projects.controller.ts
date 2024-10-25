import { Controller, Delete, Get, Param, Patch, Post, Query, Request, Response, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService){}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Request() req, @Response() res) {
        try {
            const projectToCreate = req.body;
            const createdProject = await this.projectService.create(projectToCreate, req.user);
            res.send(createdProject);
        } catch(e) {
            console.log(e);
        }
    }

    @Get('get-all')
    async getAll(@Request() req, @Response() res) {
        try {
            const allProjects = await this.projectService.getAll();
            const allProjectsFormated = allProjects.map(proj => {
                return {...proj, stakes: JSON.parse(proj.stakes), partnersWanted: JSON.parse(proj.partnersWanted), place: JSON.parse(proj.place)}
            })
            res.send(allProjectsFormated);
        } catch(e) {
            console.log(e);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-created-by-logged-user')
    async getAllCreatedByLoggedUser(@Request() req, @Response() res) {
        try {
            if (req.user) {
            const projects = await this.projectService.getAllCreatedByLoggedUser(req.user.id);
            const projectsFormated = projects.map(proj => {
                return {...proj, stakes: JSON.parse(proj.stakes), partnersWanted: JSON.parse(proj.partnersWanted), place: JSON.parse(proj.place)}
            })
            res.send(projectsFormated);
            }
        } catch(e) {
            console.log(e);
        }
    }

    @Get('get/:id')
    async getOne(@Request() req, @Response() res, @Param('id') param) {
        try {
            if (param) {
                const projectFound = await this.projectService.getOne(parseInt(param));
                const projFormated = {...projectFound, stakes: JSON.parse(projectFound.stakes), partnersWanted: JSON.parse(projectFound.partnersWanted), place: JSON.parse(projectFound.place), founder: {
                    email: projectFound.founder.email,
                    id: projectFound.founder.id,
                    entrepreneurialExperience: projectFound.founder.entrepreneurialExperience,
                    name: projectFound.founder.name
                }};
                res.send(projFormated);
            }
            
        } catch(e) {
            console.log(e);
        }
    }

    @Patch('edit')
    async editProject(@Request() req, @Response() res) {
        try {
            const {
                id,
                name,
                description,
                place,
                state,
                founderRole,
                stakes,
                partnersWanted,
            } = req.body
                const editedProject = await this.projectService.edit(
                    id,
                    {
                    name,
                    description,
                    place,
                    state,
                    founderRole,
                    stakes,
                    partnersWanted,
                });
                if (editedProject) {
                    res.send(editedProject);
                }
        } catch(e) {
            console.log(e, ' is the error');
        }
    }

    @Delete('delete/:id')
    async deleteProject(@Request() req, @Response() res, @Param('id') param) {
        try {
            if (param) {
                const deletedProject = await this.projectService.delete(parseInt(param));
                if (deletedProject) {
                    res.send(deletedProject)
                }
            }
        } catch(e) {
            console.log(e, ' is the error')
        }
    }
}
