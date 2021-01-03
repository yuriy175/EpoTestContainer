import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import Close from '@material-ui/icons/Close';
import Info from '@material-ui/icons/Info';
import Flip from '@material-ui/icons/Flip';
import RotateRight from '@material-ui/icons/RotateRight';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';

import { ImageContext } from '../context/image-context';
import MenuActions from '../actions/menu-actions'

import DumpDialog from '../components/DumpDlg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: 'white',
  },
  input: {
    display: 'none',
  },
}));

export default function ToolbarAppBar() {
  const classes = useStyles();
  const [imageState, imageDispatch] = useContext(ImageContext);
  const [open, setOpen] = React.useState(false);
  const [dump, setDump] = React.useState('');
  const [imageData, setImageData] = React.useState('');
    //'data:image/bmp;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const onLoadImage = async (ev) =>
  {
    const frame = await MenuActions.OnloadImage(ev.target.files[0].name, imageDispatch);
    setImageData(frame);
  }

  const onCloseImage = async (ev) =>
  {
    await MenuActions.OncloseImage(imageState.activeIndex);
  }

  const onGetInfo = async (ev) =>
  {
    const content = await MenuActions.OngetInfo(imageState.activeIndex);
    setDump(content);
    handleClickOpen();
  }

  const onHorFlip = async (ev) =>
  {
    const frame = await MenuActions.OnhorFlipImage(imageState.activeIndex);
    setImageData(frame);
  }

  const onVertFlip = async (ev) =>
  {
    const frame = await MenuActions.OnvertFlipImage(imageState.activeIndex);
    setImageData(frame);
  }

  const onRotate = async (ev) =>
  {
    const frame = await MenuActions.OnrotateImage(imageState.activeIndex);
    setImageData(frame);
  }

  const onPlay = async (ev) =>
  {
    await MenuActions.OnplayImage(imageState.activeIndex, frame => setImageData(frame));
  }

  const onStop = async (ev) =>
  {
    await MenuActions.OnstopPlayImage(imageState.activeIndex);
  }

  return (
    <div className={classes.root}> 
      <AppBar position="static">
        <Toolbar variant="dense">          
          <input accept="*" className={classes.input} id="icon-button-file" multiple type="file" 
            onChange = {onLoadImage}/>
          <label htmlFor="icon-button-file">
            <IconButton aria-label="upload picture" component="span" className={classes.menuButton}> 
              <OpenInBrowser />
            </IconButton>
          </label>
          <IconButton color="secondary" aria-label="close picture" component="span" className={classes.menuButton}
            onClick={() => onCloseImage()} disabled={!imageState.activeIndex}>
            <Close />
          </IconButton> 
          <IconButton color="secondary" aria-label="close picture" component="span" className={classes.menuButton}
            onClick={() => onGetInfo()} disabled={!imageState.activeIndex}>
            <Info />
          </IconButton> 
          <IconButton color="secondary" aria-label="close picture" component="span" className={classes.menuButton}
            onClick={() => onHorFlip()} disabled={!imageState.activeIndex}>
            <Flip />
          </IconButton> 
          <IconButton color="secondary" aria-label="close picture" component="span" className={classes.menuButton}
            onClick={() => onVertFlip()} disabled={!imageState.activeIndex}>
            <Flip />
          </IconButton> 
          <IconButton color="secondary" aria-label="close picture" component="span" className={classes.menuButton}
            onClick={() => onRotate()} disabled={!imageState.activeIndex}>
            <RotateRight />
          </IconButton> 
          <IconButton color="secondary" aria-label="close picture" component="span" className={classes.menuButton}
            onClick={() => onPlay()} disabled={!imageState.activeIndex}>
            <PlayArrow />
          </IconButton> 
          <IconButton color="secondary" aria-label="close picture" component="span" className={classes.menuButton}
            onClick={() => onStop()} disabled={!imageState.activeIndex}>
            <Stop />
          </IconButton> 
        </Toolbar>
      </AppBar>
      <DumpDialog dump={dump} open={open} onClose={handleClose} />
      <img src={imageData} style={{width: '1000px', height: '1000px'}}/>
    </div>
  );
}