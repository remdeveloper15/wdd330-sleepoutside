import { getParam, loadHeaderFooter } from './utils.mjs'; // Puedes importar ambos en una línea
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

const productId = getParam('product');
const dataSource = new ExternalServices(); // <--- Quitamos 'tents', ya no es necesario

const product = new ProductDetails(productId, dataSource);
product.init();