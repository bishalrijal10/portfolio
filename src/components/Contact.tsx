import { useState, useRef, useEffect } from 'react';

const Contact = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<string[]>(['> Initializing secure channel...', '> Ready for input. Type "help" for commands.']);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleCommand = (cmd: string) => {
        const lowerCmd = cmd.toLowerCase().trim();
        let response = '';

        switch (lowerCmd) {
            case 'help':
                response = 'Available commands: email, linkedin, github, clear, contact';
                break;
            case 'email':
                response = 'Redirecting to Gmail secure channel...';
                window.open('https://mail.google.com/mail/?view=cm&fs=1&to=bishal@example.com', '_blank');
                break;
            case 'linkedin':
                response = 'Navigating to LinkedIn profile...';
                window.open('https://linkedin.com/in/bishal-rijal', '_blank');
                break;
            case 'github':
                response = 'Accessing code repositories...';
                window.open('https://github.com/bishal-rijal', '_blank');
                break;
            case 'clear':
                setOutput(['> Terminal cleared.']);
                return;
            case 'contact':
                response = 'You can reach me at bishal@example.com';
                break;
            default:
                response = `Command not found: ${cmd}. Type "help" for assistance.`;
        }

        // Add command and response to output
        if (lowerCmd !== 'clear') {
            // We set output in the effect or here, simpler here
        }
        return response;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const cmd = input;
            const response = handleCommand(cmd);

            if (cmd.toLowerCase().trim() !== 'clear') {
                setOutput(prev => [...prev, `> ${cmd}`, response || '']);
            }

            setInput('');
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [output]);

    return (
        <section className="py-20 w-full bg-dark-bg relative font-mono overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 relative z-10">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center cyber-glitch-1" data-text="< Terminal / Contact >">
                    {'< Terminal / Contact >'}
                </h2>

                <div
                    className="w-full h-96 bg-black/80 rounded-sm border-2 border-primary/50 p-4 overflow-hidden flex flex-col shadow-[0_0_20px_rgba(252,238,10,0.1)] relative"
                    onClick={() => inputRef.current?.focus()}
                >
                    <div className="absolute inset-0 pointer-events-none scanlines opacity-10"></div>
                    <div className="flex-1 overflow-y-auto space-y-2 text-secondary text-sm font-mono custom-scrollbar" ref={scrollRef}>
                        {output.map((line, i) => (
                            <div key={i} className="break-words">{line}</div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center border-t border-primary/30 pt-2 relative z-20">
                        <span className="text-primary mr-2">{'>'}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent outline-none text-primary font-mono placeholder-primary/30"
                            autoFocus
                            placeholder="Initializing connection..."
                        />
                        <div className="w-2 h-4 bg-primary animate-pulse ml-1 shadow-[0_0_5px_#fcee0a]" />
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-8 text-sm font-bold tracking-widest">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bishal@example.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors border-b border-transparent hover:border-primary">EMAIL</a>
                    <a href="#" className="text-white hover:text-secondary transition-colors border-b border-transparent hover:border-secondary">LINKEDIN</a>
                    <a href="#" className="text-white hover:text-accent transition-colors border-b border-transparent hover:border-accent">GITHUB</a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
