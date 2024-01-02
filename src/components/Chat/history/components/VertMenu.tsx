import DeleteIcon from '@mui/icons-material/Delete';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Menu, MenuItem } from '@mui/material';
import { useHistoryStore } from '../../../../_state/Chat/historyWindow/historyStore';
import {
  defaultCurrentMessageHistory,
  useMessagesStore,
} from '../../../../_state/Chat/messageWindow/messagesStore';
import {
  AlertDialog,
  useErrorStore,
} from '../../../../_state/InputResponse/errorStore';
import { useSuccessStore } from '../../../../_state/InputResponse/successStore';
import { useLoginStore } from '../../../../_state/Session/loginStore';
import { ApiFetchFunctions } from '../../../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../../../_types/ApiMethods';
import apiFetch from '../../../../methods/general/apiFetch';

interface IVertMenu {
}

type DeleteButtonFunctions = {
  changeAlertDialogOpen: (boolean: boolean) => void;
  changeAlertDialog: (alertDialog: AlertDialog) => void;
  removeHistory: (historyId: number) => void;
}
type ShareButtonFunctions = {
  changeSuccessMessage: (message: string) => void;
  changeSuccessSnackbarOpen: (successSnackbarOpen: boolean) => void;
};

// delete history
export const deleteHistory = async(historyId: number, apiFetchFunctions: ApiFetchFunctions & DeleteButtonFunctions) => {
  apiFetchFunctions.changeCurrentMessageHistory(defaultCurrentMessageHistory)
  apiFetchFunctions.removeHistory(historyId);
  await apiFetch('./api/endpoints/histories/removeHistoryById', ApiMethods.DELETE, {body: {historyId: historyId}, functions: apiFetchFunctions});
};
const handleDeleteButtonAction = (historyId: number, deleteButtonFunctions: ApiFetchFunctions & DeleteButtonFunctions) => {
  const { changeAlertDialogOpen, changeAlertDialog } = deleteButtonFunctions;

    changeAlertDialog({title: 'Delete this conversation? This cannot be undone.', confirm: async() => await deleteHistory(historyId, deleteButtonFunctions), disagreeBtnText: 'Close', agreeBtnText: 'Delete'})

    changeAlertDialogOpen(true);
};

// save history to savedHistories table to share
export const addSavedHistory = async(historyId: number, apiFetchFunctions: ApiFetchFunctions): Promise<{accessString: string, saved: boolean} | null> => {

  const res = await apiFetch('./api/endpoints/savedHistories/addSavedHistory', ApiMethods.POST, {body: {historyId: historyId}, functions: apiFetchFunctions});

  if(typeof res.accessString == 'string'){
    if(res.saved){
      return {accessString: res.accessString, saved: true};
    }
    return {accessString: res.accessString, saved: false};
  }

  return null;
};
const handleShareButtonAction = async(historyId: number, shareButtonFunctions: ApiFetchFunctions & ShareButtonFunctions) => {
  const { changeSuccessMessage, changeSuccessSnackbarOpen } = shareButtonFunctions;

  const res = await addSavedHistory(historyId, shareButtonFunctions)

  if(res?.accessString){
    if(res.saved){
      await navigator.clipboard.writeText(`${window.location.origin}/share/${res.accessString}`);
      changeSuccessMessage(`The URL has been copied to your clipboard.`);
      changeSuccessSnackbarOpen(true);
      return;
    }

    await navigator.clipboard.writeText(`${window.location.origin}/share/${res.accessString}`);
    changeSuccessMessage(`History saved! The URL has been copied to your clipboard.`);
    changeSuccessSnackbarOpen(true);
  }
};

export const VertMenu: React.FC<IVertMenu> = () => {
  const { menuAnchorEl, changeMenuAnchorEl, clearHistories, removeHistory } = useHistoryStore();
  const { changeAlertDialog, changeAlertDialogOpen, changeError, changeErrorSnackbarOpen } = useErrorStore();
  const { changeLoggedIn } = useLoginStore();
  const { changeCurrentMessageHistory, currentMessageHistory } = useMessagesStore();
  const { changeSuccessMessage, changeSuccessSnackbarOpen } = useSuccessStore();

  const apiFetchFunctions: ApiFetchFunctions = {
    changeLoggedIn: changeLoggedIn,
    clearHistories: clearHistories,
    changeCurrentMessageHistory: changeCurrentMessageHistory,
    changeError: changeError,
    changeErrorSnackbarOpen: changeErrorSnackbarOpen,
  };
  const deleteBtnFunctions: DeleteButtonFunctions = {
    removeHistory: removeHistory,
    changeAlertDialogOpen: changeAlertDialogOpen,
    changeAlertDialog: changeAlertDialog,
  };
  const shareBtnFunctions: ShareButtonFunctions = {
    changeSuccessMessage: changeSuccessMessage,
    changeSuccessSnackbarOpen: changeSuccessSnackbarOpen,
  };

  return(
    <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={() =>  changeMenuAnchorEl(null)}>
      <MenuItem sx={{padding: '3px 8px 3px 6px', fontSize: '16px', fontWeight: '425'}} onClick={() => [changeMenuAnchorEl(null), handleShareButtonAction(currentMessageHistory.id, {...shareBtnFunctions, ...apiFetchFunctions})]}>
        <IosShareIcon /> &nbsp; Share
      </MenuItem>
      <MenuItem sx={{padding: '3px 8px 3px 6px', color: 'red', fontSize: '16px', fontWeight: '425'}} onClick={() => [changeMenuAnchorEl(null), handleDeleteButtonAction(currentMessageHistory.id, {...deleteBtnFunctions, ...apiFetchFunctions})]}>
        <DeleteIcon color='error' /> &nbsp; Delete
      </MenuItem>
    </Menu>
  )
};