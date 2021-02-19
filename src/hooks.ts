import { useState, useCallback, SetStateAction, Dispatch } from 'react';

export const useModal = (): [boolean, Dispatch<SetStateAction<boolean>>, () => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return [isOpen, setIsOpen, toggleModal];
};
