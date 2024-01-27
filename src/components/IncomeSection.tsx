// src/components/IncomeSection.tsx
import React, { useState } from 'react';

interface IncomeItem {
  description: string;
  amount: number;
}

const IncomeSection: React.FC = () => {
  const [incomeItems, setIncomeItems] = useState<IncomeItem[]>([]);

  const addIncomeItem = (item: IncomeItem) => {
    setIncomeItems([...incomeItems, item]);
  };

  return (
    <div>
      <h2>Income Section</h2>
      {incomeItems.map((item, index) => (
        <div key={index}>{item.description}: {item.amount}</div>
      ))}
      {/* Add form to input new income item */}
      <button onClick={()=> addIncomeItem({amount:1,description:"test"})}>

      </button>
    </div>
  );
};

export default IncomeSection;