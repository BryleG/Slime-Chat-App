'use client';

import clsx from 'clsx';

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
  }

const Button: React.FC<ButtonProps> = ({
    type = "button",
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
  }) => {
    return ( 
        <button
          onClick={onClick}
          type={type}
          disabled={disabled}
          className={clsx(`
            flex 
            justify-center 
            rounded-md 
            px-3 
            py-2 
            text-sm 
            font-semibold F
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            border-black
            border-2
            `,
            disabled && 'opacity-50 cursor-default',
            fullWidth && 'w-full',
            secondary ? 'text-white' : 'text-gray-900',
            danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
            !secondary && !danger && 'bg-white hover:bg-gray-900 hover:text-white focus-visible:outline-gray-950'
          )}
        >
          {children}
        </button>
       );
}

export default Button;