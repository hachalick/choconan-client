import { digitsEnToFa } from "@persian-tools/persian-tools";

export function getPropChoconan(
  data: TIdCategoriesMenu
): { name: string; price: number; available: boolean }[] {
  const listProduct: { name: string; price: number; available: boolean }[] = [];
  for (const category of data) {
    for (const product of category.products) {
      listProduct.push({
        name: digitsEnToFa(product.name.trim()),
        price: product.price,
        available: product.available,
      });
    }
  }
  return listProduct;
}

export function getPropSnapFood(
  data: TCrawlerSnapFood
): { name: string; price: number; available: boolean }[] {
  const listProduct: { name: string; price: number; available: boolean }[] = [];
  for (const category of data.data.menus) {
    for (const product of category.products) {
      listProduct.push({
        name: digitsEnToFa(product.title.trim()),
        price: product.price / 1000,
        available: !product.disabledUntil,
      });
    }
  }
  return listProduct;
}

export function getPropTapsiFood(
  data: TCrawlerTapsiFood
): { name: string; price: number; available: boolean }[] {
  const listProduct: { name: string; price: number; available: boolean }[] = [];
  for (const category of data.data.categories) {
    for (const product of category.products) {
      listProduct.push({
        name: digitsEnToFa(product.productName.trim()),
        price: product.productVariations[0].price / 1000,
        available: true,
      });
    }
  }
  return listProduct;
}

export function margeListProduct({
  dataChoconan,
  dataSnapFood,
  dataTapsiFood,
}: {
  dataChoconan: { name: string; price: number; available: boolean }[];
  dataSnapFood: { name: string; price: number; available: boolean }[];
  dataTapsiFood: { name: string; price: number; available: boolean }[];
}) {
  const margeList: TMatchProduct = {
    productFound: [],
    snapFoodNotMatch: [],
    tapsiFoodNotMatch: [],
  };
  for (const item of dataChoconan) {
    const findProduct: {
      choconan: { name: string; price: number; available: boolean };
      tapsiFood:
        | { name: string; price: number; available: boolean }
        | undefined;
      snapFood: { name: string; price: number; available: boolean } | undefined;
    } = { choconan: item, snapFood: undefined, tapsiFood: undefined };

    const findSnapFood = dataSnapFood.find(
      (val) =>
        val.name === item.name &&
        val.price === item.price &&
        val.available === item.available
    );
    if (findSnapFood) {
      findProduct.snapFood = findSnapFood;
    }
    const findTapsiFood = dataTapsiFood.find(
      (val) =>
        val.name === item.name &&
        val.price === item.price &&
        val.available === item.available
    );
    if (findTapsiFood) {
      findProduct.snapFood = findTapsiFood;
    }
    margeList.productFound.push(findProduct);
  }
  for (const item of dataSnapFood) {
    const existProduct = margeList.productFound.find(
      (val) =>
        val.choconan.name === item.name &&
        val.choconan.price === item.price &&
        val.choconan.available === item.available
    );
    if (!existProduct) {
      margeList.snapFoodNotMatch.push(item);
    }
  }
  for (const item of dataTapsiFood) {
    const existProduct = margeList.productFound.find(
      (val) =>
        val.choconan.name === item.name &&
        val.choconan.price === item.price &&
        val.choconan.available === item.available
    );
    if (!existProduct) {
      margeList.tapsiFoodNotMatch.push(item);
    }
  }
  return margeList;
}
