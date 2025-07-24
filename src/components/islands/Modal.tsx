import * as Dialog from '@radix-ui/react-dialog';

export default function Modal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700 transition-colors">
        Open Modal
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl max-w-md w-full animate-scale-in">
          <Dialog.Title className="text-xl font-bold mb-4">Welcome</Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6">
            This is a Radix UI modal component hydrated as a React island in Astro.
          </Dialog.Description>
          <Dialog.Close className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors">
            Close
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}