// src/stores/BudgetStore.ts
import { makeAutoObservable } from 'mobx';

interface Income {
  id: number;
  description: string;
  amount: number;
}

class BudgetStore {
  incomes: Income[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  addIncome(income: Income) {
    this.incomes.push(income);
  }

  // Async actions can interact with Supabase
  async fetchIncomes() {
    // Supabase call to fetch incomes
  }
}

export default new BudgetStore();
