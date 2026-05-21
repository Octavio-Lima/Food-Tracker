import { clsx } from "clsx";

function Button({ children, className }: Props) {
    return (
        <button
            type="button"
            className={clsx(
                "bg-transparent border-1 py-1 px-3 cursor-pointer hover:bg-gray-500 active:bg-gray-700",
                className,
            )}
        >
            {children}
        </button>
    );
}

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "primary" | "secondary" | "danger" | "special";
    className?: string;
};

export default Button;
