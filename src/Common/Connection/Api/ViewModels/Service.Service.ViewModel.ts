export class ReadAllProductSnapFoodViewModel {
  Id: number = 0;
  Title: string = "";
  Price: number = 0;
}

export class ReadMatchProductSnapFoodViewModel {
  Id: number = 0;
  Title: string = "";
  Price: number = 0;
  SelfTitle: string = "";
  SelfPrice: number = 0;
}

export class ReadNotMatchProductSnapFoodViewModel {
  Id: number = 0;
  Title: string = "";
  Price: number = 0;
}

export class ReadMenuSnapFoodViewModel {
  AllProduct: ReadAllProductSnapFoodViewModel[] = [];
  Match: ReadMatchProductSnapFoodViewModel[] = [];
  NotMatch: ReadNotMatchProductSnapFoodViewModel[] = [];
}

export class ReadAllProductTapsiFoodViewModel {
  Id: number = 0;
  Title: string = "";
  Price: number = 0;
}

export class ReadMatchProductTapsiFoodViewModel {
  Id: number = 0;
  Title: string = "";
  Price: number = 0;
  SelfTitle: string = "";
  SelfPrice: number = 0;
}

export class ReadNotMatchProductTapsiFoodViewModel {
  Id: number = 0;
  Title: string = "";
  Price: number = 0;
}

export class ReadMenuTapsiFoodViewModel {
  AllProduct: ReadAllProductTapsiFoodViewModel[] = [];
  Match: ReadMatchProductTapsiFoodViewModel[] = [];
  NotMatch: ReadNotMatchProductTapsiFoodViewModel[] = [];
}
