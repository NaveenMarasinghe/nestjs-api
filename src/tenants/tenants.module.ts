import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsController } from 'src/tenants/tenants.controller';
import { TenantsService } from 'src/tenants/tenants.service';
import { Tenant } from 'src/tenants/tenant.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, User]), UsersModule],
  controllers: [TenantsController],
  providers: [
    TenantsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class TenantsModule {}
