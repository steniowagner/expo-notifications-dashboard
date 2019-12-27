import React from 'react';
import { Typography, Tooltip, Paper, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Send as SendIcon } from '@material-ui/icons';

import { usersNotificationsTableConfig } from '../../../common/table/configs';
import useNotificationsForm from '../../../../hooks/useNotificationsForm';
import Table from '../../../common/table/Table';
import Input from '../../../common/Input';
import { User } from '../../../../types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 2),
    width: '70%',
  },
  section: {
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  sendButtonWrapper: {
    alignSelf: 'flex-end',
  },
}));

interface Props {
  onSubmitForm: (title: string, message: string, tokens: string[]) => void;
  setNoUserSelectedError: () => void;
  loading: boolean;
  users: User[];
}

const Form = ({ setNoUserSelectedError, onSubmitForm, loading, users }: Props) => {
  const {
    removeSelectedTokens,
    onSelectAllTokens,
    onPressSendButton,
    setFormInputValue,
    tokensSelected,
    onSelectToken,
    inputErrors,
    message,
    title,
  } = useNotificationsForm(users, onSubmitForm, setNoUserSelectedError);

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.section}>
        <Typography component="h3" variant="h5">
          Notification
        </Typography>
        <div className={classes.inputWrapper}>
          <Input
            setValue={value => setFormInputValue('title', value)}
            errorMessage={inputErrors.title}
            label="Title*"
            value={title}
            id="title"
          />
          <Input
            setValue={value => setFormInputValue('message', value)}
            errorMessage={inputErrors.message}
            label="Message*"
            value={message}
            id="message"
          />
        </div>
      </div>
      <div className={classes.section}>
        <Typography component="h3" variant="h5">
          Recipients
        </Typography>
        <Table
          onSelectItem={({ notificationToken }: Pick<User, 'notificationToken'>) =>
            onSelectToken(notificationToken)
          }
          checkIsItemSelected={(tokenToCheck: string) => tokensSelected.includes(tokenToCheck)}
          onRemoveSelectedItems={removeSelectedTokens}
          itemsSelectedCount={tokensSelected.length}
          config={usersNotificationsTableConfig}
          onSelectAllItems={onSelectAllTokens}
          loading={loading}
          dataset={users}
          withCheckboxes
          withFilter
          withHeader
        />
      </div>
      <div className={classes.sendButtonWrapper}>
        <Tooltip aria-label="send" placement="left" title="Send">
          <Fab onClick={onPressSendButton} color="primary">
            <SendIcon />
          </Fab>
        </Tooltip>
      </div>
    </Paper>
  );
};

export default Form;
