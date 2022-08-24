import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsController } from 'src/tenants/tenants.controller';
import { TenantsService } from 'src/tenants/tenants.service';
import { Tenant } from 'src/tenants/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class TenantsModule {}
