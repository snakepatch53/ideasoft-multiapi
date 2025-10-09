import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import MarkdownRender from '~/components/MarkdownRender';
import { cn } from '~/lib/utils';

export default function Ollama({
    messages,
}: {
    messages: {
        role: 'user' | 'assistant';
        content: string;
    }[];
}) {
    const { data, setData, post, reset, processing } = useForm({ message: '' });

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
                    </div>
                    <textarea
                        value={data.message || ''}
                        onChange={(e) => setData('message', e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                post('/message');
                                reset();
                            }
                        }}
                        className="rounded-xl border p-2 w-full disabled:opacity-50"
                        placeholder="Type your message here..."
                        disabled={!!processing}
                    />
                </div>
            </section>
        </>
    );
}
