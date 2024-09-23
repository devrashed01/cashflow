interface Statistics {
  totalExpenses: number;
  totalIncomes: number;
  totalByCategory: {
    [key: string]: number;
  };
  totalByDay: {
    [key: string]: number;
  };
}
