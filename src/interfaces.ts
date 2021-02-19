import { Dispatch, SetStateAction } from 'react';

export interface IContact {
  email: string;
  favorite?: boolean;
  name: string;
  tel: string;
  id?: string;
}

export interface IModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  idForEdit: string;
  setIdForEdit: Dispatch<SetStateAction<string>>;
}
