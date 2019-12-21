const headerCells = [
  {
    id: 'id',
    isNumeric: true,
    disablePadding: false,
    label: 'id',
  },
  {
    id: 'name',
    isNumeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'email',
    isNumeric: false,
    disablePadding: true,
    label: 'E-mail',
  },
  {
    id: 'token',
    isNumeric: false,
    disablePadding: true,
    label: 'Token',
  },
];

const usersNotifications = {
  fields: ['id', 'name', 'email', 'token'],
  filters: ['id', 'name', 'email', 'token'],
  initiallyOrderedBy: 'name',
  selectedVerifier: 'token',
  headerCells,
};

export default usersNotifications;
