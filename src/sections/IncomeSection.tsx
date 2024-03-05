// src/components/IncomeSection.tsx
import React, {  } from 'react';
import { observer } from 'mobx-react-lite';

const IncomeSection: React.FC = observer(() => {
  // const { rootStore } = useContext(StoreContext);

  // useEffect(() => {
  //   budgetStore.fetchIncomes(); // Fetch incomes from Supabase when the component mounts
  // }, [budgetStore]);

  return (
    <div>
      <h2>Income Section</h2>
      {/* {budgetStore.incomes.map((income, index) => (
        <div key={index}>{income.description}: {income.amount}</div>
      ))} */}
      {/* UI to add new income item */}
    </div>
  );
});

export default IncomeSection;
