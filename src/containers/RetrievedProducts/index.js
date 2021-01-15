import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable from 'components/MaterialTable';

const COLUMN_NAMES = [
  'provider',
  'item_id',
  'click_out_link',
  'main_photo_url',
  'price',
  'price_currency',
  'shipping_price',
  'title',
  'description',
  'valid_until',
  'brand',
];

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  content: {
    padding: theme.spacing(2),
    boxSizing: 'border-box',

    '@media (min-width: 0px) and (orientation: landscape)': {
      padding: theme.spacing(1),
    },

    '@media (min-width: 600px)': {
      padding: theme.spacing(3),
    },
  },
}));

function RetrievedProducts() {
  const classes = useStyles();

  const products = useSelector((state) => state.retriever.products);

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <MaterialTable
          columns={COLUMN_NAMES}
          rowKey="item_id"
          rows={products}
        />
      </Box>
    </Box>
  );
}

export default RetrievedProducts;
