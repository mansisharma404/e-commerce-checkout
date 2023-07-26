import { Product } from '../../product/schemas/product.schema';

export interface IOfferConfig {
  minimumProductCount?: number;
  minimumOrderValue?: number;
  buyN?: number;
  getM?: number;
  discountPercent?: number;
  discountApplicableOnEachArticle?: boolean;
  discountApplicableOnOverallProductMRP?: boolean;
  products?: Array<Record<string, any>>;
}
