import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './Components/LayoutArea/Routing/Routing';
import './index.css';

export const createRoot = ViteReactSSG({ routes });

