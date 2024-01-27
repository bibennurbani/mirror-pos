// src/stores/BudgetStore.ts
import { makeAutoObservable } from 'mobx';
import { supabase } from '../supabaseClient';

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
    const { data, error } = await supabase
      .from('incomes')
      .select('*');
    if (error) {
      console.error('Error fetching incomes', error);
    } else {
      this.incomes = data;
    }
  }
}

export default BudgetStore;
