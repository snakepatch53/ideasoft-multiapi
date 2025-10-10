// import type { FormDataType } from '@/types';
import type { FormDataKeys, FormDataType, FormDataValues } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { RouteName } from '@izzyjs/route/routes';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useCrud<T extends FormDataType<T>>({ resource, prefix = 'dashboard.' }: { resource: string; prefix?: string }) {
    const { data, setData, post, patch, delete: del, reset, errors, processing } = useForm<T>({} as T);
    const [selectedRow, setSelectedRow] = useState(null); // null -> modetable
    const [selectedForDelete, setSelectedForDelete] = useState(null); // null -> not delete mode

    const resetForm = (message = undefined, type = 'success') => {
        reset();
        setSelectedRow(null);
        if (message === undefined) return;
        if (type === 'error') toast.error(message);
        if (type === 'success') toast.success(message);
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (!selectedRow)
            return post(route((prefix + resource + '.store') as RouteName).url, {
                preserveScroll: true,
                onSuccess: () => resetForm('Created successfully'),
                onError: (errors) => console.error(errors),
            });
        patch(route((prefix + resource + '.update') as RouteName, { params: { id: selectedRow.id } }).url, {
            preserveScroll: true,
            onSuccess: () => resetForm('Updated successfully'),
            onError: (errors) => console.error(errors),
        });
    };

    const handleDelete = () => {
        if (!selectedForDelete) return;
        del(route((prefix + resource + '.destroy') as RouteName, { params: { id: selectedForDelete.id } }).url, {
            preserveScroll: true,
            onSuccess: () => {
                resetForm('Deleted successfully');
                setSelectedForDelete(null);
            },
            onError: (errors) => console.error(errors),
        });
    };

    const setModeForm = (row?: any) => () => {
        if (!setSelectedRow) resetForm();
        else if (row) setData(row);
        setSelectedRow(row === false ? null : row);
    };

    return {
        errors,
        data,
        processing,
        modeForm: selectedRow !== null,
        showModal: !!selectedForDelete,
        reset,
        setData,
        handleSubmit,
        handleDelete,
        addField: (name: FormDataKeys<T>, label: string = '', formatter = (v: FormDataValues<T, FormDataKeys<T>>) => v) => ({
            label: label || name,
            placeholder: label || name,
            onChange: (value: FormDataValues<T, FormDataKeys<T>>) => setData(name, value),
            value: formatter(data[name as string] || ''),
            error: errors[name as string] || undefined,
            disabled: processing,
        }),
        setModeForm,
        setDeleteMode: (row: any) => () => {
            setData(row);
            setSelectedForDelete(row);
        },
        handleNew: (data: Partial<T>) => () => {
            setModeForm()();
            reset();
            setData((data || {}) as T);
        },
    };
}
