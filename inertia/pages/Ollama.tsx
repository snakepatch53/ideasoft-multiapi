import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import MarkdownRender from '~/components/MarkdownRender';
import { cn } from '~/lib/utils';

type MessageT = {
    role: 'user' | 'assistant';
    content: string;
};

type ModelT = 'tinyllama' | 'gemma:2b' | 'gemma3' | 'gpt-oss:120b-cloud';

export default function Ollama({ messages }: { messages: MessageT[] }) {
    const { data, setData, post, reset, processing } = useForm<{ message: string; model: ModelT }>({ message: '', model: 'tinyllama' });
    const lastMsgRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!lastMsgRef.current || !textAreaRef.current) return;
        lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
        textAreaRef.current?.focus();
    }, [messages]);

    return (
        <>
            <Head title="Ollama Page" />
            <section className="flex h-screen overflow-hidden px-5 py-16">
                <div className="container mx-auto flex flex-col gap-5">
                    <h1>Ollama Chat</h1>
                    <div className="flex-1 overflow-y-auto rounded-xl border p-5">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={cn('my-2 ml-auto flex w-fit flex-col rounded-xl border border-gray-200 bg-blue-100 p-2', {
                                    'mr-auto ml-0 bg-gray-200': msg.role === 'assistant',
                                })}
                            >
                                <strong>{msg.role}</strong>
                                <div>
                                    <MarkdownRender>{msg.content}</MarkdownRender>
                                </div>
                            </div>
                        ))}
                        <div ref={lastMsgRef} />
                    </div>
                    <label
                        className={cn('flex items-start rounded-xl border p-2', {
                            'pointer-events-none opacity-50': !!processing,
                        })}
                    >
                        <textarea
                            ref={textAreaRef}
                            value={data?.message || ''}
                            onChange={(e) => setData('message', e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    post('/message', { preserveState: true });
                                    reset('message');
                                }
                            }}
                            className="field-sizing-content min-h-12 w-full flex-1 resize-none outline-none"
                            placeholder="Type your message here..."
                            disabled={!!processing}
                        />
                        <select
                            className="rounded-lg border p-2"
                            value={data?.model || ''}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('model', e.target.value as ModelT)}
                        >
                            <option value="tinyllama">tinyllama</option>
                            <option value="gemma:2b">gemma:2b</option>
                            <option value="gemma3">gemma3</option>
                            <option value="gpt-oss:120b-cloud">gpt-oss:120b-cloud</option>
                        </select>
                    </label>
                </div>
            </section>
        </>
    );
}
