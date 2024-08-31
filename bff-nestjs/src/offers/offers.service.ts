import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Offer } from './offer.interface';

@Injectable()
export class OffersService {
    private offers: Offer[] = [];
    // This is an RxJS Subject. A Subject is both an observable and an observer, meaning you can emit values 
    // and also subscribe to it to listen for those values.
    private offerAddedSubject = new Subject<Offer[]>();

    addOffer(offer: Offer) {
        this.offers.push(offer); // Add offer
        this.offerAddedSubject.next([...this.offers]); // Notify subscribers
    }

    getAllOffers(): Offer[] {
        return [...this.offers];
    }

    getOfferAddedObservable() {
        // Server-Sent Events routes must return an Observable stream.
        // Returns the offerAddedSubject as an observable, which allows other parts of the application to 
        // subscribe to it and react to new offers being added.
        return this.offerAddedSubject.asObservable(); 
    }
}
