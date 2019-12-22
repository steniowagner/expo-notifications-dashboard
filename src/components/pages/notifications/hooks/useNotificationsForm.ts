import { useState } from 'react';

import { User } from '../../../../types';

type SubmitForm = (title: string, message: string, tokens: string[]) => void;

interface InputError {
  message: string;
  title: string;
}

const useNotificationsForm = (
  users: User[],
  onSubmitForm: SubmitForm,
  setNoUserSelectedError: () => void,
) => {
  const [inputErrors, setInputErrors] = useState<any>({});
  const [tokensSelected, setTokensSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const handleSetInputErrors = (id: string, errorMessage: string = 'This field is requierd') => {
    setInputErrors((prevInputErrors: any) => ({
      ...prevInputErrors,
      [id]: errorMessage,
    }));
  };

  const checkIsFormInputsValid = () => {
    const isFormValid = title && message;

    if (!title) {
      handleSetInputErrors('title');
    }

    if (!message) {
      handleSetInputErrors('message');
    }

    return isFormValid;
  };

  const setFormInputValue = (id: string, value: string, setValue: (value: string) => void) => {
    handleSetInputErrors(id, '');
    setValue(value);
  };

  const onPressSendButton = () => {
    if (tokensSelected.length === 0) {
      setNoUserSelectedError();
    }

    const isFormValid = checkIsFormInputsValid() && tokensSelected.length > 0;

    if (isFormValid) {
      onSubmitForm(title, message, tokensSelected);
    }
  };

  const handleSelectToken = (token: string) =>
    setTokensSelected(previousTokens => [token, ...previousTokens]);

  const handleUnselectToken = (token: string) =>
    setTokensSelected(previousTokens =>
      previousTokens.filter(previousToken => previousToken !== token),
    );

  const onSelectToken = (token: string) => {
    const isTokenAlreadySelected = tokensSelected.includes(token);

    if (isTokenAlreadySelected) {
      handleUnselectToken(token);
    } else {
      handleSelectToken(token);
    }
  };

  const onSelectAllTokens = () => {
    const isSameLength = tokensSelected.length === users.length;

    const tokens = isSameLength ? [] : users.map(user => user.token);

    setTokensSelected(tokens);
  };

  return {
    onSelectAllTokens,
    onPressSendButton,
    setFormInputValue,
    setTokensSelected,
    tokensSelected,
    onSelectToken,
    inputErrors,
    setMessage,
    setTitle,
    message,
    title,
  };
};

export default useNotificationsForm;
