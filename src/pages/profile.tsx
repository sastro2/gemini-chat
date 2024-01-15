import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  Avatar,
  Container,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { useRef } from 'react';
import {
  AlertDialogType,
  useErrorStore,
} from '../_state/InputResponse/errorStore';
import { useMediaQueryStore } from '../_state/Page/mediaQueryStore';
import { useSettingsStore } from '../_state/Profile/settingsStore';
import { useUserDataStore } from '../_state/Profile/userDataStore';
import { ApiMethods } from '../_types/ApiMethods';
import { DefaultApiResponseBody } from '../_types/DefaultApiResponseBody';
import { SafetySettings } from '../_types/SafetySettings';
import { AlertDialog } from '../components/general/AlertDialog';
import styles from '../components/Profile/_styles/profileStyles.module.css';
import apiFetch from '../methods/general/apiFetch';
import { accessOptionsGuard } from '../methods/Typeguards/accessOptionsGuard';

interface IProfile {
  profileImage: string;
  username: string;
  contentFilterStrength: SafetySettings;
}

export const updateProfileImage = async (img: File): Promise<Buffer | null> => {
  const formData = new FormData();
  console.log(img)
  formData.append('profileImg', new Blob([img], {type: 'image/png'}));

  const res = await fetch(`/api/endpoints/users/uploadProfilePicture`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: ApiMethods.POST,
    body: formData,
  });

  const resJson = await res.json() as DefaultApiResponseBody & {profileImage: Buffer};

  return resJson.profileImage;
};
export const updateSafetySettings = async () => {};

export const handleSafetySettingsChange = (e: SelectChangeEvent<SafetySettings>, changeSafetySettings: (newSetting: SafetySettings) => void, changeAlertDialogOpen: (boolean: boolean) => void, changeAlertDialog: (alertDialog: AlertDialogType) => void, frameSize: "desktop" | "tablet" | "mobile") => {
  if(!e.target.value) return;
  if(e.target.value === "BLOCK_NONE"){
    changeAlertDialog({title: 'DANGER', content: 'Google Gemini is currently in beta and still occasionally produces violent or hateful responses. Enabling this setting will remove all safeguards designed to mitigate such occurrences. Are you sure you want to do this?', disagreeBtnText: 'Cancel', agreeBtnText: 'Confirm', changeState: () => changeSafetySettings(SafetySettings.BLOCK_NONE), fontSize: frameSize === 'mobile'? 10: undefined})
    changeAlertDialogOpen(true);
  }

  switch(e.target.value){
    case "BLOCK_ONLY_HIGH":
      changeSafetySettings(SafetySettings.BLOCK_FEW);
      break;
    case "BLOCK_MEDIUM_AND_ABOVE":
      changeSafetySettings(SafetySettings.BLOCK_SOME);
      break;
    case "BLOCK_LOW_AND_ABOVE":
      changeSafetySettings(SafetySettings.BLOCK_MOST);
      break;
  }
};

export const handleFileRemoval = (changeProfileImg: (profileImg: string) => void) => {
  changeProfileImg('');
};
export const handleFileUpload = (fileInputRef: React.RefObject<HTMLInputElement>, changeProfileImg: (profileImg: string) => void) => {
  console.log(fileInputRef.current?.files)
  if(!fileInputRef.current || !fileInputRef.current.files || !fileInputRef.current.files[0]){
    changeProfileImg('');
    return;
  }

  //profile image uploading doesnt work yet
  //const updatedImg = await updateProfileImage(fileInputRef.current.files[0]);
  //const imgBlob = new Blob(updatedImg.data as BlobPart[], { type: 'application/octet-binary' })
  //changeProfileImg(URL.createObjectURL(imgBlob));
};

export const Profile: React.FC<IProfile> = () => {
  const { frameSize } = useMediaQueryStore();
  const { safetySettings, changeSafetySettings } = useSettingsStore();
  const {changeAlertDialogOpen, changeAlertDialog} = useErrorStore();
  const { profileImg, menuAnchorEl, changeMenuAnchorEl, changeProfileImg } = useUserDataStore();
  console.log(profileImg)

  const fileInputRef = useRef<HTMLInputElement>(null);

  return(
    <Container id={styles.profileBackground} disableGutters maxWidth={false}>
      <Container id={styles.profileContent}>
        <Container id={styles.profileTitleContainer} disableGutters maxWidth={false}>
          <ArrowBackIcon id={styles.backIcon} fontSize='large' onClick={() => window.location.href = '../'} />
          <Container id={styles.avatarContainer}>
            <Container id={styles.editContainer} onClick={(e) => changeMenuAnchorEl(e.currentTarget)} disableGutters maxWidth={false}>
              <Container id={styles.editIconContainer} disableGutters>
                <UploadFileIcon id={styles.editIcon} />
              </Container>
              <Avatar id={styles.avatar} src={profileImg} sx={frameSize === 'desktop'? { width: 56, height: 56 }: {}} />
            </Container>
            <Typography id={styles.profileTitle} variant={frameSize !== 'desktop'? 'h4': 'h2'}>Profile</Typography>
          </Container>
        </Container>
        <Container id={styles.profileSelectContainer}>
          <InputLabel id={styles.profileSelectLabel}>Content filter strength</InputLabel>
          <Select id={frameSize === 'mobile'? styles.profileSelectMobile: styles.profileSelect} labelId="profileSelectLabel" value={safetySettings} onChange={(e) => handleSafetySettingsChange(e, changeSafetySettings, changeAlertDialogOpen, changeAlertDialog, frameSize)}>
            <MenuItem value={SafetySettings.BLOCK_NONE} dense={frameSize === 'mobile'}>Block none</MenuItem>
            <MenuItem value={SafetySettings.BLOCK_FEW} dense={frameSize === 'mobile'}>Block few</MenuItem>
            <MenuItem value={SafetySettings.BLOCK_SOME} dense={frameSize === 'mobile'}>Block some</MenuItem>
            <MenuItem value={SafetySettings.BLOCK_MOST} dense={frameSize === 'mobile'}>Block most</MenuItem>
          </Select>
        </Container>
      </Container>
      <AlertDialog />
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={() => changeMenuAnchorEl(null)}>
        <MenuItem dense={frameSize !== 'desktop'} sx={{padding: '3px 8px 3px 6px', fontSize: frameSize === 'desktop'? '16px': '12px', fontWeight: '425'}} onClick={() => [changeMenuAnchorEl(null), fileInputRef.current?.click()]}>
          <FileUploadIcon /> &nbsp; Upload
        </MenuItem>
        <MenuItem dense={frameSize !== 'desktop'} sx={{padding: '3px 8px 3px 6px', color: 'red', fontSize: frameSize === 'desktop'? '16px': '12px', fontWeight: '425'}} onClick={() => [changeMenuAnchorEl(null), handleFileRemoval(changeProfileImg)]}>
          <DeleteIcon /> &nbsp; Remove
        </MenuItem>
      </Menu>
      <input style={{display: 'none'}} type='file' ref={fileInputRef} onChange={() => [handleFileUpload(fileInputRef, changeProfileImg)]}/>
    </Container>
  )
};

export const getServerSideProps: GetServerSideProps<IProfile> = async(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IProfile>> => {
  const accessOptions = context.req.cookies.accessOptions;

  // if there is no cookie - not authenticated
  if(!accessOptions) {
    return {
      redirect: {
        destination: '../',
        permanent: false,
      },
    };
  }

  //initial authentication with cookie
  const parsedAccessOptions: unknown = JSON.parse(accessOptions);

  if(!accessOptionsGuard(parsedAccessOptions)) {
    return {
      redirect: {
        destination: '../',
        permanent: false,
      },
    };
  }

  const {username, accessToken} = parsedAccessOptions;

  const authRes = await apiFetch(`/api/endpoints/auth/prefetch/authenticateUserPrefetch`, ApiMethods.POST, {username, accessToken})

  //if the cookie isnt valid - not authenticated
  if(!authRes.auth) {
    return {
      redirect: {
        destination: '../',
        permanent: false,
      },
    };
  }

  //TODO: get profile image and settings from db
  return {
    props: {
      profileImage: '',
      username: username,
      contentFilterStrength: SafetySettings.BLOCK_SOME,
    },
  };
};

export default Profile;
