import { useState, useEffect } from 'react';

import { User } from '../../../../types';

interface State {
  tokensSelected: string[];
  message: string;
  title: string;
}

type InputErrors = Omit<State, 'tokensSelected'>;

const INITIAL_FORM_STATE: State = {
  tokensSelected: [],
  message: '',
  title: '',
};

const INITIAL_FORM_ERROR: InputErrors = {
  message: '',
  title: '',
};

const useNotificationsForm = (
  users: User[],
  onSubmitForm: (title: string, message: string, tokensSelected: string[]) => void,
  setNoUserSelectedError: () => void,
) => {
  const [inputErrors, setInputErrors] = useState<InputErrors>(INITIAL_FORM_ERROR);
  const [state, setState] = useState<State>(INITIAL_FORM_STATE);

  const handleSetInputErrors = (
    id: keyof InputErrors,
    errorMessage: string = 'This field is requierd',
  ) => {
    setInputErrors((prevInputErrors: InputErrors) => ({
      ...prevInputErrors,
      [id]: errorMessage,
    }));
  };

  useEffect(() => {
    const { message, title } = state;

    if (message && inputErrors.message) {
      handleSetInputErrors('message', '');
    }

    if (title && inputErrors.title) {
      handleSetInputErrors('title', '');
    }
  }, [state, inputErrors]);

  const checkIsFormInputsValid = () => {
    const { message, title } = state;

    const isFormValid = title && message;

    if (!title) {
      handleSetInputErrors('title');
    }

    if (!message) {
      handleSetInputErrors('message');
    }

    return isFormValid;
  };

  const setFormInputValue = (id: keyof State, value: string | string[]) => {
    setState((previousState: State) => ({
      ...previousState,
      [id]: value,
    }));
  };

  const onPressSendButton = () => {
    const { title, message, tokensSelected } = state;

    if (tokensSelected.length === 0) {
      setNoUserSelectedError();
    }

    const isFormValid = checkIsFormInputsValid() && tokensSelected.length > 0;

    if (isFormValid) {
      onSubmitForm(title, message, tokensSelected);
    }
  };

  const handleSelectToken = (token: string) => {
    setFormInputValue('tokensSelected', [token, ...state.tokensSelected]);
  };

  const handleUnselectToken = (token: string) => {
    const tokensFiltered = state.tokensSelected.filter(stateToken => stateToken !== token);

    setFormInputValue('tokensSelected', tokensFiltered);
  };

  const onSelectToken = (token: string) => {
    const isTokenAlreadySelected = state.tokensSelected.includes(token);

    const action = isTokenAlreadySelected ? handleUnselectToken : handleSelectToken;

    action(token);
  };

  const onSelectAllTokens = () => {
    const { tokensSelected } = state;

    const isNoTokensSelected = !tokensSelected.length;
    const isAllTokensSeleted = !isNoTokensSelected && tokensSelected.length === users.length;
    const isSomeTokensSelected = !isAllTokensSeleted && !isNoTokensSelected;

    if (isAllTokensSeleted) {
      setFormInputValue('tokensSelected', []);
    }

    if (isNoTokensSelected || isSomeTokensSelected) {
      const allTokens = users.map(user => user.notificationToken);
      setFormInputValue('tokensSelected', allTokens);
    }
  };

  return {
    ...state,
    removeSelectedTokens: () => setFormInputValue('tokensSelected', []),
    onSelectAllTokens,
    onPressSendButton,
    setFormInputValue,
    onSelectToken,
    inputErrors,
  };
};

export default useNotificationsForm;
