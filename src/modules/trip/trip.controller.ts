import { Body, Controller, Param, Query, UseGuards } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripQueryDto } from './dto/trip-query.dto';
import { TripCreateDto } from './dto/trip-create.dto';
import { TripUpdateDto } from './dto/trip-update.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/auth.decorator';

@Controller('trip')
export class TripController {
    constructor(private tripService: TripService) { }

    async getTrips(@Query() query: TripQueryDto) {
        const data = this.tripService.getAll(query)
        return {
            message: "get trip success!",
            data
        }
    }

    async getOneTrip(@Param('id') id: number) {
        const data = this.tripService.getOne(id)
        return {
            message: "get one trip success!",
            data
        }
    }

    @UseGuards(AuthGuard)
    @Role('admin')
    async createTrip(@Body() body: TripCreateDto) {
        const data = this.tripService.create(body)
        return {
            message: "create trip success!",
            data
        }
    }

    @UseGuards(AuthGuard)
    @Role('admin')
    async updateTrip(@Param('id') id: number, @Body() body: TripUpdateDto) {
        const data = this.tripService.update(id, body)
        return {
            message: "update trip success!",
            data
        }
    }

    @UseGuards(AuthGuard)
    @Role('admin')
    async deleteTrip(@Param('id') id: number) {
        await this.tripService.delete(id)
        return {
            message: "delete trip success!"
        }
    }

}
