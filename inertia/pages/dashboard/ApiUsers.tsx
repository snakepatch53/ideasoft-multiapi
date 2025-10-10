import Button from '@/components/dashboard/Button';
import ConfirmModal from '@/components/dashboard/ConfirmModal';
import { Form, Input, InputImage, InputTextarea } from '@/components/dashboard/Form';
import { Table, Td, TdActions, Th } from '@/components/dashboard/Table';
import useCrud from '@/hooks/useCrud';
import DashboardLayout from '@/layouts/DashboardLayout';
import { cn } from '@/lib/utils';
import type { ApiUserT } from '@/types';
import { router } from '@inertiajs/react';

export default function ApiUsers({ apiUsers }: { apiUsers: ApiUserT[] }) {
    const { addField, modeForm, setModeForm, handleSubmit, showModal, setDeleteMode, handleDelete, handleNew, data } = useCrud<ApiUserT>({
        resource: 'crud_api_users',
    });

    return (
        <DashboardLayout title="API Users" breadcrumbs={[{ title: 'API Users', href: route('dashboard.api_users').url }]}>
            <section className="flex h-full flex-1 flex-col gap-4 rounded-xl p-5">
                <div className="container mx-auto">
                    <Table
                        isShow={!modeForm}
                        childrenHeader={<Button label="Create new" onClick={handleNew({})} />}
                        childrenTitles={
                            <>
                                <Th label="ID" className="w-0" />
                                <Th label="Logo" />
                                <Th label="Name" />
                                <Th label="Domain" />
                                <Th label="Is Admin" />
                                <Th label="Actions" className="w-0" />
                            </>
                        }
                        data={apiUsers}
                        onRow={(item) => (
                            <>
                                <Td label={String(item.id)} />
                                <Td>
                                    <img src={item.logoUrl} alt={item.name} className="size-10 min-w-10 rounded-full border object-cover" />
                                </Td>
                                <Td label={String(item.name)} />
                                <Td>
                                    <a
                                        href={item.domain}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline dark:text-blue-400/50 hover:dark:text-blue-400/80"
                                    >
                                        {item.domain}
                                    </a>
                                </Td>
                                <Td>
                                    <button
                                        className={cn('rounded-full bg-black/5 p-1 pr-4 transition-all duration-300 dark:bg-white/5', {
                                            'cursor-default pr-1 pl-4': item.isAdmin,
                                        })}
                                        onClick={() =>
                                            router.put(route('dashboard.crud_api_users.update', item.id).url, {
                                                ...item,
                                                logo: null,
                                                isAdmin: !item.isAdmin,
                                            })
                                        }
                                        disabled={item.isAdmin}
                                    >
                                        <span
                                            className={cn('bg-c1 block size-4 rounded-full transition-colors duration-300', {
                                                'bg-gray-400': !item.isAdmin,
                                            })}
                                        />
                                    </button>
                                </Td>
                                <TdActions className="w-0">
                                    <Button label="Edit" onClick={setModeForm(item)} />
                                    <Button label="Delete" variant="destructive" onClick={setDeleteMode(item)} />
                                </TdActions>
                            </>
                        )}
                    />
                    <Form isShow={modeForm} onSubmit={handleSubmit} className="mx-auto flex w-full flex-col">
                        <div className="flex w-full flex-col gap-5 md:flex-row">
                            <InputImage {...(addField('logo', 'Logo') as any)} className="max-h-48" currentImageUrl={data.logoUrl} />
                            <div className="grid flex-1 gap-x-5 gap-y-1 lg:grid-cols-2">
                                <Input {...addField('name', 'Name')} className="lg:col-span-2" />
                                <Input {...addField('key', 'Api Key')} />
                                <Input {...addField('domain', 'Domain')} type="url" />
                                <InputTextarea {...addField('origins', 'Permitted origins (use enter to separate)')} />
                                <InputTextarea {...addField('emails', 'Emails (use enter to separate)')} />
                            </div>
                        </div>
                        <div className="flex gap-5 md:col-span-2">
                            <Button label="Save" />
                            <Button label="Cancel" variant="destructive" onClick={setModeForm(false)} type="button" />
                        </div>
                    </Form>
                    <ConfirmModal
                        title="Delete row"
                        subtitle="Are you sure you want to delete this row? This action cannot be undone."
                        onConfirm={handleDelete}
                        onCancel={setDeleteMode(false)}
                        isShow={showModal}
                    />
                </div>
            </section>
        </DashboardLayout>
    );
}
