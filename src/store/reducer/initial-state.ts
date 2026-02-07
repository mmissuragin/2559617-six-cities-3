import { TOffer} from '../../types/offers';
import { TNearbyOffer } from '../../types/nearby-offers';
import { TComment } from '../../types/comments';
import { User } from '../../types/user';
import { CITIES, AuthorizationStatus } from '../../const';

export interface OffersState {
  city: string;
  offers: TOffer[];
  sortType: string;
  hoveredOfferId: string | null;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  currentUser: User | null;
  currentOffer: TOffer | null;
  isCurrentOfferLoading: boolean;
  currentNearbyOffers: TNearbyOffer[];
  isNearbyOffersLoading: boolean;
  currentComments: TComment[];
  isCommentsLoading: boolean;

  favorites: {
    offers: TOffer[];
    loading: boolean;
    error: string | null;
  };
}


export const initialState: OffersState = {
  city: CITIES[0].name,
  offers: [],
  sortType: 'popular',
  hoveredOfferId: null,
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUser: null,
  currentOffer: null,
  isCurrentOfferLoading: false,
  currentNearbyOffers: [],
  isNearbyOffersLoading: false,
  currentComments: [],
  isCommentsLoading: false,
  favorites: {
    offers: [],
    loading: false,
    error: null,
  },
};
