import { BudgetI } from "../apps/BudgetStore";
import { AbstractApi } from "./AbstractApi";

export default class BudgetApi extends AbstractApi<BudgetI>{
    getAll(): Promise<BudgetI[] | undefined> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<BudgetI | undefined> {
        console.log('🚀 ~ BudgetApi ~ getById ~ id:', id)
        throw new Error("Method not implemented.");
    }
    create(data: BudgetI): Promise<BudgetI> {
        console.log('🚀 ~ BudgetApi ~ create ~ data:', data)
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        console.log('🚀 ~ BudgetApi ~ delete ~ id:', id)
        throw new Error("Method not implemented.");
    }
    update(id: string, newData: BudgetI): Promise<void> {
        console.log('🚀 ~ BudgetApi ~ update ~ newData:', newData)
        console.log('🚀 ~ BudgetApi ~ update ~ id:', id)
        throw new Error("Method not implemented.");
    }
    
}