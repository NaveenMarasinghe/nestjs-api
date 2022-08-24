import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Tenant } from 'src/tenants/tenant.entity';
import { ITenant } from 'src/tenants/ITenant';
import { TenantsService } from 'src/tenants/tenants.service';

@Controller('tenants')
@ApiTags('Tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  getAllUsers(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  getUserById(@Param() params): Promise<Tenant[]> {
    return this.tenantsService.getTenantById(params.id);
  }

  @Post()
  addNewUser(@Body() tenant: ITenant) {
    return this.tenantsService.addNewTenant(tenant);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  updateUser(@Body() tenant: ITenant, @Param() params) {
    return this.tenantsService.updateTenant(tenant, params.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param() params) {
    return this.tenantsService.deleteTenant(params.id);
  }
}
