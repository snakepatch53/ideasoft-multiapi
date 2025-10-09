import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import MarkdownRender from '~/components/MarkdownRender';
import { cn } from '~/lib/utils';

export default function Ollama({
    messages,
    model,
}: {
    messages: {
        role: 'user' | 'assistant';
        content: string;
    }[];
    model: string;
}) {
    const { data, setData, post, reset, processing } = useForm({ message: '', model });
    const lastMsgRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!lastMsgRef.current || !textAreaRef.current) return;
        lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
        textAreaRef.current?.focus();
    }, [messages]);
    console.log(data);

    return (
        <>
            <Head title="Ollama Page" />
            <section className="px-5 py-16 h-screen overflow-hidden flex">
                <div className="container mx-auto flex flex-col gap-5 ">
                    <h1>Ollama Chat</h1>
                    <div className="border rounded-xl p-5 flex-1 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={cn('flex flex-col border border-gray-200 p-2 my-2 rounded-xl ml-auto w-fit bg-blue-100', {
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
                        className={cn('flex border rounded-xl items-start p-2', {
                            'opacity-50 pointer-events-none': !!processing,
                        })}
                    >
                        <textarea
                            ref={textAreaRef}
                            value={data.message || ''}
                            onChange={(e) => setData('message', e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    post('/message');
                                    reset();
                                }
                            }}
                            className="flex-1 outline-none w-full field-sizing-content min-h-12 resize-none"
                            placeholder="Type your message here..."
                            disabled={!!processing}
                        />
                        <select className="border rounded-lg p-2" value={data.model} onChange={(e) => setData('model', e.target.value)}>
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
