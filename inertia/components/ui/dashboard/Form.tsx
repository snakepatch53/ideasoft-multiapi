import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ImagePlus, MessageCircleQuestionIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import useIntl from '~/hooks/useIntl';
import { getPart } from '~/lib/intl';

export function Form({ isShow = true, onSubmit = null, className = '', children, ...props }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(e);
    };
    if (!isShow) return null;

    return (
        <AnimatePresence>
            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className={cn('grid gap-5 md:grid-cols-2', className)}
                {...props}
            >
                {children}
            </motion.form>
        </AnimatePresence>
    );
}

export function Input({ label, error, placeholder, onChange, className = '', classInput = '', ...props }) {
    return (
        <Layout label={label} error={error} className={className}>
            <input
                placeholder={placeholder}
                className={cn('flex flex-1 rounded-md border px-3', classInput)}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            />
        </Layout>
    );
}

export function InputCheck({ label, error, onChange, className = '', classInput = '', ...props }) {
    const value = props?.value || false;
    const onChangeValue = () => onChange(!value);

    return (
        <Layout label={label} error={error} className={cn('py-4', className)}>
            <button
                type="button"
                className={cn('relative mr-auto aspect-square flex-1 cursor-pointer rounded border', classInput)}
                onClick={onChangeValue}
            >
                <Check size={30} className={cn('absolute -right-2 -bottom-1 hidden text-green-500 dark:text-green-700', { block: value })} />
            </button>
        </Layout>
    );
}

export function InputSelect({ label, error, onChange, className = '', classInput = '', children, ...props }) {
    return (
        <Layout label={label} error={error} className={className}>
            <div className="flex flex-1 rounded-md border px-3 focus-within:outline dark:bg-black">
                <select className={cn('w-full flex-1 outline-0 dark:bg-black', classInput)} onChange={(e) => onChange(e.target.value)} {...props}>
                    {children}
                </select>
            </div>
        </Layout>
    );
}

export function InputTextarea({ label, placeholder, error, onChange, className = '', ...props }) {
    return (
        <Layout label={label} error={error} className={cn(className, 'h-auto')}>
            <textarea
                placeholder={placeholder}
                className={cn('field-sizing-content resize-none rounded-md border px-3 py-6')}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            />
        </Layout>
    );
}

export function InputImage({
    label,
    error,
    accept = 'image/*',
    value = '',
    onChange = null,
    disabled = false,
    currentImageUrl = undefined,
    className = '',
    classImage = '',
    classIcon = '',
    ...props
}) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const dragCounter = useRef(0);
    const dragTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const processSelectedFile = (file: File | null) => {
        onChange?.(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        processSelectedFile(file);
    };

    const handleDrag = (e: React.DragEvent<HTMLLabelElement>, isEntering: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        if (isEntering) {
            dragCounter.current += 1;
            if (dragTimeoutRef.current) {
                clearTimeout(dragTimeoutRef.current);
                dragTimeoutRef.current = null;
            }
            setIsDragging(true);
        } else {
            dragCounter.current -= 1;
            if (dragCounter.current === 0) {
                dragTimeoutRef.current = setTimeout(() => {
                    setIsDragging(false);
                }, 50);
            }
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current = 0;
        setIsDragging(false);
        if (dragTimeoutRef.current) {
            clearTimeout(dragTimeoutRef.current);
            dragTimeoutRef.current = null;
        }
        const file = e.dataTransfer.files[0];
        if (file && (accept === '*' || file.type.startsWith(accept.replace('/*', '')))) {
            processSelectedFile(file);
        }
    };

    useEffect(() => {
        return () => {
            if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (typeof value === 'string') {
            onChange?.(null);
        }
    }, [value]); // eslint-disable-line

    return (
        <Layout
            label={label}
            error={error}
            className={cn(
                'flex h-auto w-full max-w-56 flex-col',
                {
                    'pointer-events-none opacity-50': disabled,
                },
                className
            )}
        >
            <label
                className={cn(
                    'group relative mt-1 block aspect-square h-full w-full cursor-pointer overflow-hidden rounded-xl bg-black/10 dark:bg-white/10',
                    {
                        'ring-primary border-primary border-2 border-dashed ring-4': isDragging,
                    },
                    classImage
                )}
                onDragOver={(e) => handleDrag(e, true)}
                onDragEnter={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                onDrop={handleDrop}
            >
                {preview && <img src={preview} alt="Preview" className={cn('h-full w-full object-contain')} />}
                {!preview && currentImageUrl && <img src={currentImageUrl} alt="Current image" className={cn('h-full w-full object-contain')} />}
                {!preview && !currentImageUrl && (
                    <div className="flex h-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                        <ImagePlus className={cn('h-full w-full max-w-20 text-neutral-400', classIcon)} />
                    </div>
                )}
                <div
                    className={cn('absolute inset-0 flex flex-col items-center justify-center gap-2 backdrop-blur-sm transition-opacity', {
                        'bg-black/30 opacity-100 dark:bg-white/20': isDragging,
                        'bg-black/10 opacity-0 group-hover:opacity-100 dark:bg-white/10': !isDragging,
                    })}
                >
                    <ImagePlus
                        className={cn(
                            {
                                'text-white dark:text-black': isDragging,
                                'text-black': !isDragging,
                            },
                            classIcon
                        )}
                        size={60}
                    />
                    {isDragging && <p className="text-lg font-medium text-white dark:text-black">Drop file here</p>}
                </div>
                <div className="group/dialog absolute top-0 left-0 flex w-full pt-1 pl-1.5">
                    <MessageCircleQuestionIcon className="size-5" />
                    <div className="relative w-full">
                        <div className="absolute top-0 max-h-0 w-full overflow-hidden px-1 transition-all duration-300 group-hover/dialog:max-h-26">
                            <small className="block w-full rounded-lg bg-white/50 p-2 text-xs hyphens-auto shadow-lg backdrop-blur-md dark:bg-black/50">
                                Optimize the image &lt;100KB before uploading. Use{' '}
                                <a
                                    href="https://squoosh.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    squoosh
                                </a>
                            </small>
                        </div>
                    </div>
                </div>
                <input
                    id={`file-${label}`}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept={accept}
                    disabled={disabled}
                    {...props}
                />
            </label>
        </Layout>
    );
}

export function InputIntl({ label, error, placeholder, value, onChange, className = '' }) {
    const { t } = useIntl();
    const val1 = useMemo(() => getPart(value, 0), [value]);
    const val2 = useMemo(() => getPart(value, 1), [value]);

    return (
        <div className={cn('', className)}>
            <span className="pl-1 text-sm font-bold">{label}</span>
            <div className="mt-1 flex flex-col gap-x-5 gap-y-1 lg:flex-row">
                <label className="flex w-full flex-1 flex-col lg:w-auto">
                    <span className="mb-1 text-xs">{t('Español: ', 'Spanish: ')}</span>
                    <input
                        placeholder={placeholder}
                        className={cn('block flex-1 rounded-md border px-3 py-3')}
                        value={val1}
                        onChange={(e) => onChange(`t('${e.target.value}','${val2}')`)}
                    />
                </label>
                <label className="flex w-full flex-1 flex-col lg:w-auto">
                    <span className="mb-1 text-xs">{t('Ingles: ', 'English')}</span>
                    <input
                        placeholder={placeholder}
                        className={cn('block flex-1 rounded-md border px-3 py-3')}
                        value={val2}
                        onChange={(e) => onChange(`t('${val1}','${e.target.value}')`)}
                    />
                </label>
            </div>
            <span className="mt-0.5 block h-6 truncate text-sm text-red-500">{error || ''}</span>
        </div>
    );
}

export function TextareaIntl({ label, error, placeholder, value, onChange, className = '' }) {
    const { t } = useIntl();
    const val1 = useMemo(() => getPart(value, 0), [value]);
    const val2 = useMemo(() => getPart(value, 1), [value]);

    return (
        <div className={cn('', className)}>
            <span className="pl-1 text-sm font-bold">{label}</span>
            <div className="mt-1 flex flex-col gap-x-5 gap-y-1 lg:flex-row">
                <label className="flex w-full flex-1 flex-col lg:w-auto">
                    <span className="mb-1 text-xs">{t('Español: ', 'Spanish: ')}</span>
                    <textarea
                        placeholder={placeholder}
                        className={cn('block field-sizing-content min-h-20 flex-1 resize-none rounded-md border px-3 py-3')}
                        value={val1}
                        onChange={(e) => onChange(`t('${e.target.value}','${val2}')`)}
                    />
                </label>
                <label className="flex w-full flex-1 flex-col lg:w-auto">
                    <span className="mb-1 text-xs">{t('Ingles: ', 'English')}</span>
                    <textarea
                        placeholder={placeholder}
                        className={cn('block field-sizing-content min-h-20 flex-1 resize-none rounded-md border px-3 py-3')}
                        value={val2}
                        onChange={(e) => onChange(`t('${val1}','${e.target.value}')`)}
                    />
                </label>
            </div>
            <span className="mt-0.5 block h-6 truncate text-sm text-red-500">{error || ''}</span>
        </div>
    );
}

function Layout({ className, label, error, children }) {
    return (
        <label className={cn('flex h-24 flex-col', className)}>
            <span className="pl-1 text-sm font-bold">{label}</span>
            {children}
            <span className="mt-0.5 h-6 truncate text-sm text-red-500">{error || ''}</span>
        </label>
    );
}
