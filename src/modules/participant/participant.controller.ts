import { Controller,Query,Body,Get,Post,Delete,Param, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantQueryDto } from './dto/participant-query.dto';
import { ParticipantCreateDto } from './dto/participant-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/auth.decorator';

@Controller('participant')
export class ParticipantController {
    constructor(private participantService:ParticipantService){}

    @UseGuards(AuthGuard)
    @Role('admin')
    @Get()
    async getParticipant(@Query() query:ParticipantQueryDto){
        const data = await this.participantService.getAll(query)
        return {
            message: "get participants success!",
            data
        }
    }

    @UseGuards(AuthGuard)
    @Role('admin')
    @Post()
    async createParticipant(@Body() body:ParticipantCreateDto){
        const data = await this.participantService.create(body)
        return {
            message: "create participant success!",
            data
        }
    }

    @UseGuards(AuthGuard)
    @Role('admin')
    @Delete(':id')
    async deleteParticipant(@Param('id') id:number){
        await this.participantService.delete(id)
        return {
            message: "delete participant success!"
        }
    }
}
