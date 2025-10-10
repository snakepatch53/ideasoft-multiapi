import Can from '@/components/Can';
import Button from '@/components/dashboard/Button';
import { Input, InputImage, InputTextarea } from '@/components/dashboard/Form';
import DashboardLayout from '@/layouts/DashboardLayout';
import { cn } from '@/lib/utils';
import { InfosT } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Dashboard({ infos }: { infos: InfosT[] }) {
    const { data, setData, errors, post, processing } = useForm({ infos });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.crud-info.update'), {
            preserveScroll: true,
            onSuccess: () => toast.success('Data saved successfully'),
            onError: (error) => console.error(error),
        });
    };

    const handleChange = (field: string, value: string) => {
        setData(
            'infos',
            data.infos.map((info) => (info.field === field ? { ...info, value } : info))
        );
    };

    const inputsImage = data.infos.filter((info) => info.type === 'image');
    const inputsCredentials = data.infos.filter((info) => info.type === 'credential');
    const inputsText = data.infos.filter((info) => info.type === 'text');
    const inputsTextarea = data.infos.filter((info) => info.type === 'textarea');
    const inputsMarkdown = data.infos.filter((info) => info.type === 'markdown');

    return (
        <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: route('dashboard.home') }]}>
            <section className="p-5">
                <form onSubmit={handleSubmit} className="container mx-auto">
                    {inputsImage.length > 0 && <h2>Images</h2>}
                    <div className="grid grid-cols-2 gap-5">
                        {inputsImage.map((info, index) => (
                            <InputImage
                                key={info.id}
                                label={info.label}
                                accept="image/*"
                                value={info.value}
                                error={errors[`infos.${index}.value`]}
                                disabled={processing}
                                onChange={(e) => handleChange(info.field, e)}
                                classImage="p-5"
                                currentImageUrl={info.formatted}
                            />
                        ))}
                    </div>
                    <Can permission="information.viewCredentials">
                        {inputsCredentials.length > 0 && <h2>Credentials</h2>}
                        <div className="grid gap-5 md:grid-cols-2">
                            {inputsCredentials.map((info, index) => (
                                <Input
                                    key={info.id}
                                    label={info.label}
                                    placeholder={info.label}
                                    value={info.value}
                                    error={errors[`infos.${index}.value`]}
                                    disabled={processing}
                                    onChange={(e) => handleChange(info.field, e)}
                                />
                            ))}
                        </div>
                    </Can>
                    {inputsText.length > 0 && <h2>Texts</h2>}
                    <div className="grid gap-5 md:grid-cols-2">
                        {inputsText.map((info, index) => (
                            <Input
                                key={info.id}
                                label={info.label}
                                placeholder={info.field}
                                value={info.value}
                                error={errors[`infos.${index}.value`]}
                                disabled={processing}
                                className={cn({ 'lg:col-span-2': inputsText.length % 2 !== 0 && index === 0 })}
                                onChange={(e) => handleChange(info.field, e)}
                            />
                        ))}
                    </div>
                    {inputsMarkdown.length > 0 && <h2>Markdowns</h2>}
                    <div className="mb-5 grid gap-5 md:grid-cols-2">
                        {inputsMarkdown.map((info) => (
                            <label key={info.id} className="flex flex-col">
                                <b className="text-sm">{info.label}</b>
                                <Button
                                    as={Link}
                                    label="Markdown Editor"
                                    icon={ExternalLink}
                                    // href={route('dashboard.info_md_editor', info.id)}
                                    className="mt-0.5 mr-auto"
                                    classIcon="mb-1"
                                />
                            </label>
                        ))}
                    </div>
                    {inputsMarkdown.length > 0 && <h2>Textareas</h2>}
                    <div className="grid gap-5 lg:grid-cols-2">
                        {inputsTextarea.map((info, index) => (
                            <InputTextarea
                                key={info.id}
                                label={info.label}
                                placeholder={info.field}
                                value={info.value}
                                error={errors[`infos.${index}.value`]}
                                disabled={processing}
                                onChange={(e) => handleChange(info.field, e)}
                                className="grid"
                            />
                        ))}
                    </div>

                    <div className="mt-5 flex gap-3 sm:gap-5">
                        <Button label="Save Changes" type="submit" disabled={processing} />
                        {/* <Button
                            as="a"
                            href={info.lbsupp_api_url + '/transfer'}
                            target="_blank"
                            rel="noopener noreferrer"
                            label="Transfer website"
                            type="submit"
                            disabled={processing}
                            className="bg-transparent text-black/50 hover:bg-black/5 hover:text-black dark:bg-transparent dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white"
                        /> */}
                    </div>
                </form>
            </section>
        </DashboardLayout>
    );
}
