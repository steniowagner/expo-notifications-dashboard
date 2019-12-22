export interface User {
  email: string;
  token: string;
  name: string;
  id: string;
}

export type CellId = 'email' | 'token' | 'name' | 'id';

export type TableOrder = 'asc' | 'desc';

export type HeaderCell = {
  disablePadding: boolean;
  isNumeric: boolean;
  label: string;
  id: string;
};

export interface TableConfig {
  initiallyOrderedBy: string;
  headerCells: HeaderCell[];
  selectedVerifier: string;
  filters: string[];
  fields: string[];
}
