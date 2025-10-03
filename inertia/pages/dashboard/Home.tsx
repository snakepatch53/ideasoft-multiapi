import { cn } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';
import { Input, InputImage } from '~/components/ui/dashboard/Form';

export default function Dashboard() {
    const { data, setData, errors, post, processing } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleChange = (field: string, value: string) => {};

    return (
        <div>
            <section className="p-5">
                <form onSubmit={handleSubmit} className="container mx-auto">
                    <h2>Images</h2>
                    <div className="grid grid-cols-3 gap-5">
                        <InputImage
                            label="Test"
                            accept="image/*"
                            error=""
                            disabled={processing}
                            onChange={(e) => handleChange('test', e)}
                            classImage="p-5"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
}
