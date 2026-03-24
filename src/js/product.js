import { getParam, loadHeaderFooter } from './utils.mjs'; // Puedes importar ambos en una línea
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

const productId = getParam('product');
const dataSource = new ProductData(); // <--- Quitamos 'tents', ya no es necesario

const product = new ProductDetails(productId, dataSource);
product.init();