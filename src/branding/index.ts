import Row411 from "./row411";


const BRAND: any = "row"; // can be from env

let BrandConfig: any;

switch (BRAND) {
    case "row":
        BrandConfig = Row411;
        break;
}

export const colors = BrandConfig?.colors;
export const images = BrandConfig.images;
export const label = BrandConfig.labels;
