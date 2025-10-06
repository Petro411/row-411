import Petro411 from "./petro411";
import Digg411 from "./digg411";


const BRAND: any = "petro"; // can be from env

let BrandConfig: any;

switch (BRAND) {
    case "petro":
        BrandConfig = Petro411;
        break;
    case "digg":
        BrandConfig = Digg411;
        break;
    case "petro":
        BrandConfig = Petro411;
        break;
}

export const colors = BrandConfig?.colors;
export const images = BrandConfig.images;
export const label = BrandConfig.labels;
