import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';

import { retrieveProducts } from 'store/actions/retriever';
import RetrievedProducts from '../RetrievedProducts';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  content: {
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',

    '@media (min-width: 0px) and (orientation: landscape)': {
      minHeight: 'calc(100vh - 52px)',
    },

    '@media (min-width: 600px)': {
      minHeight: 'calc(100vh - 68px)',
      padding: theme.spacing(3),
    },
  },
  formControl: {
    margin: theme.spacing(1, 0),
    flex: 1,
  },
  inputControl: {
    minWidth: 296,
    margin: theme.spacing(1),
  },
  button: {
    width: 296,
    height: 56,
    margin: theme.spacing(1),
    fontSize: 16,
    textTransform: 'none',
  },
  priceWrapper: {
    width: 299,
    display: 'flex',
    justifyContent: 'space-between',
  },
  dialog: {
    '& .MuiDialog-paper': {
      maxWidth: '100% !important',
    },
  },
  dialogHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function Converter() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isRetrieving = useSelector((state) => state.retriever.isRetrieving);
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    keywords: '',
    priceMin: 0,
    priceMax: 100,
    sorting: 'default',
  });

  const handleChange = (field) => (event) => {
    const val = event.target.value;
    const newValues = { ...values, [field]: val };
    if (field === 'priceMax' && val < 0) {
      if (val < 0) {
        newValues.priceMax = 0;
      } else if (val < values.priceMin) {
        newValues.priceMin = val;
      }
    } else if (field === 'priceMin') {
      if (val < 0) {
        newValues.priceMin = 0;
      } else if (val > values.priceMax) {
        newValues.priceMax = val;
      }
    }

    setValues({ ...newValues });
  };

  const handleSave = () => {
    dispatch(retrieveProducts({
      ...values,
    }))
      .then(() => {
        setOpen(true);
        enqueueSnackbar('Succeeded to retrieve products.', {
          preventDuplicate: true,
          variant: 'success',
          autoHideDuration: 500,
        });
      })
      .catch(() => {
        enqueueSnackbar('Failed to retrieve products.', {
          preventDuplicate: true,
          variant: 'error',
        });
      });
  };

  const sortOption = [
    { label: 'Default', value: 'default' },
    { label: 'By Price Ascending', value: 'by_price_asc' },
  ];

  return (
    <>
      <Box className={classes.container}>
        {isRetrieving && <LinearProgress />}

        <Box className={classes.content}>
          <Box>
            <FormControl className={classes.inputControl} variant="outlined">
              <InputLabel htmlFor="keywords">keywords</InputLabel>
              <OutlinedInput
                id="keywords"
                labelWidth={113}
                value={values.keywords}
                onChange={handleChange('keywords')}
              />
            </FormControl>
          </Box>

          <Box className={classes.priceWrapper}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="priceMax">Maximum Price</InputLabel>
              <OutlinedInput
                id="priceMax"
                labelWidth={115}
                type="number"
                value={values.priceMax}
                onChange={handleChange('priceMax')}
              />
            </FormControl>

            <Box style={{ margin: 5 }} />

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="priceMin">Minimum Price</InputLabel>
              <OutlinedInput
                id="priceMin"
                labelWidth={113}
                type="number"
                value={values.priceMin}
                onChange={handleChange('priceMin')}
              />
            </FormControl>
          </Box>

          <Box className={classes.priceWrapper}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="sorting">Sorting</InputLabel>
              <Select
                id="sorting"
                label="Sorting"
                labelId="sorting"
                value={values.sorting}
                onChange={handleChange('sorting')}
              >
                {sortOption.map((option) => (
                  <MenuItem value={option.value} key={option.label}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Button
              color="primary"
              size="large"
              variant="contained"
              className={classes.button}
              startIcon={isRetrieving ? <CircularProgress color="inherit" size={18} /> : <SearchIcon />}
              disabled={isRetrieving || !(values.keywords && values.sorting)}
              onClick={handleSave}
            >
              Retrieve
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog className={classes.dialog} open={open}>
        <Box className={classes.dialogHeader}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <RetrievedProducts />
      </Dialog>
    </>
  );
}

export default Converter;
