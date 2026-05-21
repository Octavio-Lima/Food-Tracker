import { clsx } from "clsx";
import Button from "./button";

function Modal({ children, title, buttons, useMaxSize }: Props) {
    return (
        <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full h-max-full">
            {/* <div className="bg-black opacity-50 z-10 w-full h-full"></div> */}

            <div
                className={clsx(
                    `bg-gray-600 py-4 px-8 max-h-3/4 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col z-3 overflow-y-auto`,
                    {
                        "w-3/4": useMaxSize === true,
                        "max-w-3/4": useMaxSize === false,
                    },
                )}
            >
                <h1 className="text-2xl mx-auto my-4">{title}</h1>
                <hr className="mb-4" />
                {children}
                <hr className="my-4" />
                {buttons && (
                    <div className="space-x-4">
                        {buttons.map((button, index) => (
                            <Button key={index} onClick={button.onClick}>
                                {button.text}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

type Props = {
    children: React.ReactNode;
    title: string;
    buttons?: {
        text: string;
        onClick?: () => void;
        type?: "primary" | "secondary" | "danger" | "special";
    }[];
    useMaxSize?: boolean;
};

export default Modal;
