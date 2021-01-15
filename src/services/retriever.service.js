import httpService from './http.service';

const retrieveProducts = (data) => httpService.get('/search', {}, {}, data);

export default {
  retrieveProducts,
};
