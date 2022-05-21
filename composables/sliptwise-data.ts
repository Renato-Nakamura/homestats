export class Data {
  json: any;
  monthExpense: any[] = [];
  constructor(json) {
    this.json = json;
  }
  //[[],[]]
  getMonthExpenses=()=>{
    this.json.forEach((expense) => {
        const monthIndex = this.monthExpense.findIndex(
          (d) => d[0]["Data"]?.slice(0, 7) == expense["Data"].slice(0, 7)
        );
        if (monthIndex == -1) {
          this.monthExpense.push([expense]);
        } else {
          this.monthExpense[monthIndex].push(expense);
        }
      });
  }
  totalMonthExpenses = () => {
    this.getMonthExpenses()
    this.monthExpense = this.monthExpense.map((month) => {
      const date = month[0]["Data"].slice(0, 7)
      let monthCost = month.reduce(function (prevValue, curValue) {
        if (!curValue["Custo"]) return prevValue;
        let a = prevValue + parseFloat(curValue["Custo"]);
        return a;
      }, 0);
      return {date,monthCost};
    });
    console.log(this.monthExpense)
    const labels = this.monthExpense.map((e)=> e.date)
    const data = this.monthExpense.map((e)=> e.monthCost)
    return {labels,data};
  };
  dayExpenses = ()=>{
      this.getMonthExpenses()
      const expenses =this.monthExpense[this.monthExpense.length -1]
      const labels = expenses.map((a)=> a["Data"])
      const data = expenses.map((a)=> a["Custo"])
      return {labels,data};
  }
}
/*
[
    [
        {
            "Renato Nakamura": "20.67",
            "Bianca Marchi": "-10.34",
            "Moeda": "BRL",
            "Sabrina": "-10.33",
            "Categoria": "Geral",
            "Custo": "31.00",
            "Data": "2022-04-28",
            "Descrição": "Padoqueira burguesa"
        }
    ],
    [
        {
            "Data": "2022-05-01",
            "Bianca Marchi": "-30.24",
            "Custo": "90.70",
            "Descrição": "Restaurante",
            "Sabrina": "-30.23",
            "Moeda": "BRL",
            "Categoria": "Jantar fora",
            "Renato Nakamura": "60.47"
        },
        {
            "Categoria": "Mercado",
            "Moeda": "BRL",
            "Data": "2022-05-01",
            "Bianca Marchi": "10.54",
            "Renato Nakamura": "-5.27",
            "Custo": "15.81",
            "Descrição": "Uber mercado",
            "Sabrina": "-5.27"
        },
        {
            "Custo": "99.90",
            "Renato Nakamura": "-33.30",
            "Data": "2022-05-04",
            "Moeda": "BRL",
            "Bianca Marchi": "-33.30",
            "Descrição": "internetssss",
            "Sabrina": "66.60",
            "Categoria": "TV/Telefone/Internet"
        },
        {
            "Custo": "242.79",
            "Renato Nakamura": "161.86",
            "Categoria": "Água",
            "Descrição": "Água mole, pedra dura, tanto bate que explode nossa carteira",
            "Bianca Marchi": "-80.93",
            "Sabrina": "-80.93",
            "Data": "2022-05-04",
            "Moeda": "BRL"
        },
        {
            "Data": "2022-05-04",
            "Moeda": "BRL",
            "Renato Nakamura": "2258.33",
            "Descrição": "Aluguel auuuuuuuu",
            "Custo": "3387.50",
            "Categoria": "Aluguel",
            "Sabrina": "-1129.17",
            "Bianca Marchi": "-1129.16"
        },
        {
            "Moeda": "BRL",
            "Categoria": "",
            "Sabrina": "-1189.33",
            "Descrição": "Saldo total",
            "Bianca Marchi": "-1273.43",
            "Renato Nakamura": "2462.76",
            "Data": "2022-05-05",
            "Custo": ""
        }
    ]
]
*/
