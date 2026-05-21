function Input({ children, error, id, type }: Props) {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={id} className="font-bold">
                {children}
            </label>
            <input
                type={type || "text"}
                name={id}
                id={id}
                className="py-1 px-2 border-1 bg-white text-black border-white accent-blue-500"
            />
            <p className="text-red-500 mt-1 whitespace-pre-wrap">{error}</p>
        </div>
    );
}

type Props = {
    children: React.ReactNode;
    error?: string;
    id: string;
    type?: string;
};

export default Input;
