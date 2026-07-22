type TCardSearch = {
  id: number;
  name: string;
  src: string;
  category: string;
  description: string;
};

type TCardsSearch = Array<TCardSearch>;

type TListSearchEconomic = {
  product_id: string;
  name: string;
  count: number;
  price: number;
}

type TListSearchEconomics = TListSearchEconomic[]