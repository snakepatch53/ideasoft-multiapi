import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export default function MarkdownRender({ children }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            urlTransform={(url) => url}
            components={{
                h1: ({ ...props }) => (
                    <h1 className="mt-10 scroll-mt-24 text-4xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white" {...props} />
                ),
                h2: ({ ...props }) => (
                    <h2 className="mt-10 scroll-mt-24 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white" {...props} />
                ),
                h3: ({ ...props }) => <h3 className="mt-8 scroll-mt-24 text-2xl font-bold text-gray-900 md:text-2xl dark:text-white" {...props} />,
                h4: ({ ...props }) => <h4 className="mt-8 scroll-mt-24 text-xl font-bold text-gray-900 md:text-xl dark:text-white" {...props} />,
                h5: ({ ...props }) => <h5 className="mt-8 scroll-mt-24 text-lg font-bold text-gray-900 md:text-lg dark:text-white" {...props} />,
                h6: ({ ...props }) => <h6 className="mt-8 scroll-mt-24 text-base font-bold text-gray-900 md:text-base dark:text-white" {...props} />,
                p: ({ ...props }) => <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300" {...props} />,
                ul: ({ ...props }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300" {...props} />,
                ol: ({ ...props }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-gray-700 dark:text-gray-300" {...props} />,
                li: ({ ...props }) => <li className="leading-7" {...props} />,
                blockquote: ({ ...props }) => (
                    <blockquote
                        className="mt-6 border-l-4 border-blue-500 pl-4 text-gray-700 italic dark:border-blue-400 dark:text-gray-300"
                        {...props}
                    />
                ),
                a: ({ ...props }) => (
                    <a
                        className="text-blue-600 underline decoration-2 underline-offset-4 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        {...props}
                    />
                ),
                code: (props) => {
                    const { inline, children, ...rest } = props as any;
                    return inline ? (
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100" {...rest}>
                            {children}
                        </code>
                    ) : (
                        <pre className="mt-6 overflow-x-auto rounded-2xl bg-gray-900 p-4 text-gray-100">
                            <code {...rest}>{children}</code>
                        </pre>
                    );
                },
                img: ({ ...props }) => (
                    <img
                        className="mt-6 cursor-pointer rounded-2xl border border-gray-200 shadow dark:border-gray-700"
                        alt={(props.alt as string) || ''}
                        {...props}
                    />
                ),
                table: ({ ...props }) => (
                    <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
                    </div>
                ),
                thead: ({ ...props }) => <thead className="bg-gray-50 dark:bg-gray-800" {...props} />,
                tbody: ({ ...props }) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props} />,
                th: ({ ...props }) => <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white" {...props} />,
                td: ({ ...props }) => <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300" {...props} />,
                hr: ({ ...props }) => <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />,
            }}
        >
            {children}
        </ReactMarkdown>
    );
}
