import { SupplierForm } from './supplier/SupplierForm';
import { SupplierList } from './supplier/SupplierList';

export function SupplierFormExpanded() {
  return (
    <div className="space-y-6">
      <SupplierForm />
      <SupplierList />
    </div>
  );
}