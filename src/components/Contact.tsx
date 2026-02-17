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
                response = 'Sending transmission to: bishal@example.com (Opening mail client...)';
                window.location.href = 'mailto:bishal@example.com';
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
        <section className="py-20 w-full bg-black relative font-mono">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center glitch-effect">
                    {'< Terminal / Contact >'}
                </h2>

                <div
                    className="w-full h-96 bg-gray-900/50 rounded-lg border border-primary/30 p-4 overflow-hidden flex flex-col shadow-[0_0_20px_rgba(0,240,255,0.1)] backdrop-blur-sm"
                    onClick={() => inputRef.current?.focus()}
                >
                    <div className="flex-1 overflow-y-auto space-y-2 text-green-400 text-sm" ref={scrollRef}>
                        {output.map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center border-t border-gray-700 pt-2">
                        <span className="text-primary mr-2">{'>'}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent outline-none text-white font-mono"
                            autoFocus
                            placeholder="Type command..."
                        />
                        <div className="w-2 h-4 bg-primary animate-pulse ml-1" />
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-8 text-sm text-gray-500">
                    <a href="mailto:bishal@example.com" className="hover:text-primary transition-colors">EMAIL</a>
                    <a href="#" className="hover:text-primary transition-colors">LINKEDIN</a>
                    <a href="#" className="hover:text-primary transition-colors">GITHUB</a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
