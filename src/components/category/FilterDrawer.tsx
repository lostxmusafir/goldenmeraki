import { Drawer } from '../common/Drawer';
import type { FilterSidebarProps } from './FilterSidebar';
import { FilterSidebar } from './FilterSidebar';

export interface FilterDrawerProps extends FilterSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function FilterDrawer(props: FilterDrawerProps) {
  const { open, onClose, ...filterProps } = props;

  return (
    <Drawer open={open} onClose={onClose} title="Category filters">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Filters</div>
          <div className="text-sm text-slate-600">Refine products</div>
        </div>
        <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700">
          Close
        </button>
      </div>
      <div className="p-4">
        <FilterSidebar {...filterProps} onClose={onClose} />
      </div>
    </Drawer>
  );
}

