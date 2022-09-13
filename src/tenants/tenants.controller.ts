import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Tenant } from 'src/tenants/tenant.entity';
import { ITenant } from 'src/tenants/ITenant';
import { TenantsService } from 'src/tenants/tenants.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: Tenant })
  @Post()
  @Roles(Role.Admin)
  addNewUser(@Body() tenant: ITenant) {
    return this.tenantsService.addNewTenant(tenant);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: Tenant })
  @Put(':id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  updateUser(@Body() tenant: ITenant, @Param() params) {
    return this.tenantsService.updateTenant(tenant, params.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiParam({ name: 'id' })
  deleteUser(@Param() params) {
    return this.tenantsService.deleteTenant(params.id);
  }
}
