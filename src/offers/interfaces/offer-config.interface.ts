export interface IOfferConfig {
  minimumProductCount?: number;
  minimumOrderValue?: number;
  buyN?: number;
  getM?: number;
  freeProductId?: string;
  discountPercent?: number;
  productsInCart?: Array<Record<string, any>>;
}
