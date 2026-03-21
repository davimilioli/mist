import { Code, Github } from "lucide-react";

const GithubButtons = () => {

    const buttons = [
        {
            href: "https://github.com/davimilioli/mist",
            icon: Code,
            label: "Repositório",
            color: "bg-blue-600 hover:bg-blue-700"
        },
        {
            href: "https://github.com/davimilioli",
            icon: Github,
            label: "GitHub",
            color: "bg-gray-800 hover:bg-gray-900"
        }
    ]

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
            {buttons.map((button) => (
                <a
                    key={button.href}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${button.color} text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200`}
                    title={button.label}
                >
                    <button.icon size={20} />
                    <span className="hidden md:block">{button.label}</span>
                </a>
            ))}
        </div>
    );
};

export default GithubButtons;