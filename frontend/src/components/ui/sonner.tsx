import { Toaster as Sonner } from 'sonner';

interface ToasterProps {
  className?: string;
  [key: string]: any;
}

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="system"
      className={className}
      toastOptions={{
        classNames: {
          toast:
            'group toast group flex w-full items-center space-x-4 rounded-md border p-4 pr-6 shadow-lg',
          description: 'group-[.toast]:text-sm',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          error:
            'group-[.toast]:bg-destructive group-[.toast]:text-destructive-foreground group-[.toast]:border-destructive',
          success:
            'group-[.toast]:bg-green-500 group-[.toast]:text-white group-[.toast]:border-green-600',
          warning:
            'group-[.toast]:bg-yellow-500 group-[.toast]:text-white group-[.toast]:border-yellow-600',
          info: 'group-[.toast]:bg-blue-500 group-[.toast]:text-white group-[.toast]:border-blue-600',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
