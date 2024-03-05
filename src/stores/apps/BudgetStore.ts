// src/stores/BudgetStore.ts
import { makeAutoObservable } from 'mobx';

export interface BudgetI {
  id: number;
  description: string;
  amount: number;
}



class BudgetStore {
  incomes: BudgetI[] = [];


  constructor() {
    makeAutoObservable(this);
  }
  

  // Actions
  addIncome(income: BudgetI) {
    this.incomes.push(income);
  }

  // Async actions can interact with Supabase
  async fetchIncomes() {
    // const { data, error } = await supabase
    //   .from('incomes')
    //   .select('*');
    // if (error) {
    //   console.error('Error fetching incomes', error);
    // } else {
    //   this.incomes = data;
    // }
  }
}

export default BudgetStore;
