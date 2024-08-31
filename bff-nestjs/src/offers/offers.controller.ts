import { Controller, Post, Body, Sse, MessageEvent, Get } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { OffersService } from './offers.service';
import { Offer } from './offer.interface';

@Controller('offers')
export class OffersController {
    constructor(private readonly offersService: OffersService) {}

    @Post()
    addOffer(@Body() offer: Offer) {
        this.offersService.addOffer(offer);
        return this.offersService.getAllOffers();
    }

    @Get()
    getAllOffers(): Offer[] {
        return this.offersService.getAllOffers();
    }
    
    // The @Sse() decorator indicates that this method should handle Server-Sent Events. 
    // When a GET request is made to /offers/events, this method will establish the SSE connection.
    @Sse('events')
    sendOfferEvents(): Observable<MessageEvent> {
        // Server-Sent Events routes must return an Observable stream.

        // Returns an observable stream of MessageEvent objects. Each time a new offer is added, 
        // the service emits a new value, and the observable passes it to the client.

        // The pipe() method is a way to compose multiple operators on an observable. It takes in one or more operators 
        // as arguments and applies them in sequence to the observable data stream. The operators within the pipe() are applied 
        // to the data emitted by the observable and can be used to transform, filter, or otherwise manipulate the data.

        // The map() operator is used to format the emitted offer as a MessageEvent object, which contains a data
        // property with the offer.
        return this.offersService.getOfferAddedObservable().pipe(
            map((offers) => ({
                data: offers,
            })),
        );
    }
}
