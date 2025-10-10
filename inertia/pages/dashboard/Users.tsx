import Button from '@/components/dashboard/Button';
import ConfirmModal from '@/components/dashboard/ConfirmModal';
import { Form, Input, InputImage } from '@/components/dashboard/Form';
import { Table, Td, TdActions, Th } from '@/components/dashboard/Table';
import useCrud from '@/hooks/useCrud';
import DashboardLayout from '@/layouts/DashboardLayout';
import type { UserT } from '@/types/models';

export default function Users({ users }: { users: UserT[] }) {
    const { addField, modeForm, setModeForm, handleSubmit, showModal, setDeleteMode, handleDelete, handleNew, data } = useCrud<UserT>({
        resource: 'crud_users',
    });

    return (
        <DashboardLayout
            title="Users"
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard.home').url },
                { title: 'Users', href: route('dashboard.users').url },
            ]}
        >
            <section className="flex h-full flex-1 flex-col gap-4 rounded-xl p-5">
                <div className="container mx-auto">
                    <Table
                        isShow={!modeForm}
                        childrenHeader={<Button label="Create new" onClick={handleNew({})} />}
                        childrenTitles={
                            <>
                                <Th label="ID" className="w-0" />
                                <Th label="Photo" />
                                <Th label="Name" />
                                <Th label="Email" />
                                <Th label="Actions" className="w-0" />
                            </>
                        }
                        data={users}
                        onRow={(item) => (
                            <>
                                <Td label={String(item.id)} />
                                <Td>
                                    <img src={item.photoUrl} alt={item.fullName} className="mx-auto size-10 min-w-10" />
                                </Td>
                                <Td label={item.fullName} />
                                <Td label={item.email} />
                                <TdActions>
                                    <Button label="Edit" onClick={setModeForm(item)} />
                                    <Button label="Delete" variant="destructive" onClick={setDeleteMode(item)} />
                                </TdActions>
                            </>
                        )}
                    />
                    <Form isShow={modeForm} onSubmit={handleSubmit} className="mx-auto flex w-full flex-col">
                        <div className="flex w-full flex-col gap-5 sm:flex-row">
                            <div className="max-w-48 flex-1">
                                <InputImage
                                    {...(addField('photo', 'Image') as any)}
                                    className="[&_img]:object-cover"
                                    currentImageUrl={data.photoUrl}
                                />
                            </div>
                            <div className="grid flex-1 gap-x-5 gap-y-3 md:grid-cols-2">
                                <Input {...addField('fullName', 'Name')} />
                                <Input {...addField('email', 'Email')} type="email" />
                                <Input type="password" {...addField('password', 'Password')} className="md:col-span-2" />
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
