import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tenant } from 'src/entities/tenant.entity';
import { ITenant } from 'src/interfaces/ITenant';
import { TenantsService } from 'src/services/tenants.service';

@Controller('tenants')
@ApiTags('Tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  getAllUsers(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  getUserById(@Param() params): Promise<Tenant[]> {
    return this.tenantsService.getTenantById(params.id);
  }

  @Post()
  addNewUser(@Body() tenant: ITenant) {
    return this.tenantsService.addNewTenant(tenant);
  }

  @Put(':id')
  updateUser(@Body() tenant: ITenant, @Param() params) {
    return this.tenantsService.updateTenant(tenant, params.id);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.tenantsService.deleteTenant(params.id);
  }
}
