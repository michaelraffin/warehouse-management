export interface ProductLitterCategory {
  value: string;
  label: number;
}

export interface StoreSetup {
  // Add the actual fields here based on your schema
  [key: string]: any;
}
export interface PackagingOption {
  status: string;
  title: string;
}
export interface ServiceItem {
  // Define properties if known
  [key: string]: any;
}

export interface AppVersioning {
  [key: string]: any;
}

export interface AvailableLogin {
  [key: string]: any;
}

export interface StoreData {
  _id: string;
  serviceList: ServiceItem[];
  availableLogin: AvailableLogin[];
  appVersioning: AppVersioning;
  storeSetup: StoreSetup;
  productLittersCategory: ProductLitterCategory[];
}

export interface StoreSettingsResponse {
  results: StoreData[];
}
