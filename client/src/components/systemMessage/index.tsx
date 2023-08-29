import { SnackbarAction } from "notistack";
import {ReactComponent as SuccessSvg} from '../../assets/systemMessage/success.svg';
import {ReactComponent as ErrorSvg} from '../../assets/systemMessage/error.svg';
import {ReactComponent as WarningSvg} from '../../assets/systemMessage/warning.svg';
import {ReactComponent as InfoSvg} from '../../assets/systemMessage/info.svg';
import { Box } from "@mui/material";

const SystemMessage = (
  enqueueSnackbar: any,
  message: string | React.ReactNode,
  options: { variant: 'success' | 'error' | 'warning' | 'info' | 'default', sx?: any, action?: SnackbarAction }
) => {

  const { variant, sx = {}, action } = options;

  const variantBGColor = {
    success: 'primary.green1',
    error: 'primary.red2',
    warning: 'primary.orange1',
    info: 'primary.blue1',
    default: 'primary.blue1'
  }

  const variantBorderColor = {
    success: 'primary.green2',
    error: 'primary.red3',
    warning: 'primary.orange2',
    info: 'primary.blue2',
    default: 'primary.blue2'
  }

  const variantIcon = {
    success: <SuccessSvg />,
    error: <ErrorSvg />,
    warning: <WarningSvg />,
    info: <InfoSvg />,
    default: <InfoSvg />
  }

  const sxStyles = {
    "& .SnackbarContent-root": {
      color: "primary.textColor4",
      backgroundColor: variantBGColor[variant],
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: variantBorderColor[variant],
      boxShadow: 'none',
      borderRadius: '8px',
      padding: '7px 16px',
      justifyContent: 'start',
      alignItems: 'start',
      '& .SnackbarItem-message': {
        justifyContent: 'start'
      }
    }
  }

  enqueueSnackbar(
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ mr: 1, height: '16px' }}>{variantIcon[variant]}</Box>
      <Box component="span" sx={{ lineHeight: '16px', fontSize: '14px', fontWeight: 500 }}>{message}</Box>
    </Box>,
    {
      variant: variant,
      sx: { ...sxStyles, ...sx },
      action
    })
}

export default SystemMessage;