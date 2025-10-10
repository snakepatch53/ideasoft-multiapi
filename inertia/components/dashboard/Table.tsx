import { Table as DataTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function Table<T>({
    isShow = true,
    childrenHeader = undefined,
    childrenTitles,
    data,
    accessorKey = 'id',
    onRow,
    ...props
}: {
    isShow?: boolean;
    childrenHeader?: React.ReactNode;
    childrenTitles: React.ReactNode;
    data: T[];
    accessorKey?: string;
    onRow: (item: T) => React.ReactNode;
} & React.TableHTMLAttributes<HTMLTableElement>) {
    if (!isShow) return null;
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="w-full">
                {childrenHeader && <div className="mb-5">{childrenHeader}</div>}
                <DataTable {...props}>
                    <TableHeader>
                        <TableRow>{childrenTitles}</TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item) => (
                            <TableRow key={String(item[accessorKey])}>{onRow(item)}</TableRow>
                        ))}
                    </TableBody>
                </DataTable>
            </motion.div>
        </AnimatePresence>
    );
}

export function Th({ label = undefined, children = undefined, className = '', ...props }) {
    return (
        <TableHead className={cn('', className)} {...props}>
            {label || children}
        </TableHead>
    );
}

export function Td({ label = undefined, children = undefined, className = '', ...props }) {
    return (
        <TableCell className={cn('px-5', className)} {...props}>
            {label || children}
        </TableCell>
    );
}

export function TdActions({ label = undefined, children = undefined, className = '', classWrap = '', ...props }) {
    return (
        <TableCell className={cn('px-5', className)} {...props}>
            <div className={cn('flex items-center gap-3', classWrap)}>{label || children}</div>
        </TableCell>
    );
}
