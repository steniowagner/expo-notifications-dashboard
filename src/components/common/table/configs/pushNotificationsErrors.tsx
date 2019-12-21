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
    id: 'message',
    isNumeric: false,
    disablePadding: true,
    label: 'Reason',
  },
  {
    id: 'token',
    isNumeric: false,
    disablePadding: true,
    label: 'Token',
  },
];

const pushNotificationsErrors = {
  fields: ['id', 'name', 'email', 'message', 'token'],
  initiallyOrderedBy: 'name',
  selectedVerifier: 'token',
  headerCells,
};

export default pushNotificationsErrors;
