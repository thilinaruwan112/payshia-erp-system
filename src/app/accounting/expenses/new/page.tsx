
import { ExpenseForm } from '@/components/expense-form';
import { chartOfAccounts } from '@/lib/data';

export default function NewExpensePage() {
  const expenseAccounts = chartOfAccounts.filter(acc => acc.type === 'Expense');
  const paymentAccounts = chartOfAccounts.filter(acc => acc.type === 'Asset');
  
  return <ExpenseForm expenseAccounts={expenseAccounts} paymentAccounts={paymentAccounts} />;
}
