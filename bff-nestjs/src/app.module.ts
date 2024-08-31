import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [OffersModule],
})
export class AppModule {}
