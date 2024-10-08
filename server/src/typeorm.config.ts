import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateUserTable1678998040775 } from './migration/1678998040775-CreateUserTable';
import { CreateTemplateTable1678998082380 } from './migration/1678998082380-CreateTemplateTable';
import { UpdateUserTable1679279658988 } from './migration/1679279658988-UpdateUserTable';
import { UpdateTemplateTable1679322876482 } from './migration/1679322876482-UpdateTemplateTable';
import { UpdateTemplateTable1680093087191 } from './migration/1680093087191-UpdateTemplateTable';
import { CreatePlanTable1680827223545 } from './migration/1680827223545-CreatePlanTable';
import { UpdatePlanTable1680828046085 } from './migration/1680828046085-UpdatePlanTable';
import { CreateSubscriptionTable1680860268374 } from './migration/1680860268374-CreateSubscriptionTable';
import { CreateBillingMethodTable1683232087178 } from './migration/1683232087178-CreateBillingMethodTable';
import { UpdateSubscriptionTable1683316318470 } from './migration/1683316318470-UpdateSubscriptionTable';
import { UpdateBillingMethodTable1683543329419 } from './migration/1683543329419-UpdateBillingMethodTable';
import { UpdatePlanTable1683616723113 } from './migration/1683616723113-UpdatePlanTable';
import { UpdateSubscriptionTable1683624322660 } from './migration/1683624322660-UpdateSubscriptionTable';
import { UpdateSubscriptionTable1683625481001 } from './migration/1683625481001-UpdateSubscriptionTable';
import { BillingMethod } from './module/billing-method/billing-method.entity';
import { Plan } from './module/plan/plan.entity';
import { Subscription } from './module/subscription/subscription.entity';
import { Template } from './module/templates/template.entity';
import { User } from './module/users/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [User, Template, Plan, Subscription, BillingMethod],
  migrations: [
    CreateUserTable1678998040775,
    CreateTemplateTable1678998082380,
    UpdateUserTable1679279658988,
    UpdateTemplateTable1679322876482,
    UpdateTemplateTable1680093087191,
    CreatePlanTable1680827223545,
    UpdatePlanTable1680828046085,
    CreateSubscriptionTable1680860268374,
    CreateBillingMethodTable1683232087178,
    UpdateSubscriptionTable1683316318470,
    UpdateBillingMethodTable1683543329419,
    UpdatePlanTable1683616723113,
    UpdateSubscriptionTable1683624322660,
    UpdateSubscriptionTable1683625481001,
  ],
});
