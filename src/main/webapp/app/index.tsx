// import external modules
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import internal(own) modules
import registerServiceWorker from './new-template/registerServiceWorker';
// import { store } from './new-template/redux/storeConfig/store';
import ReduxToastr from 'react-redux-toastr';

import 'font-awesome/css/font-awesome.min.css';

import './index.scss';
import Spinner from './new-template/components/spinner/spinner';
import { registerLocale } from './config/translation';
import { bindActionCreators } from 'redux';
import { clearAuthentication } from './shared/reducers/authentication';
import setupAxiosInterceptors from './config/axios-interceptor';
import initStore from './config/store';
import ErrorBoundary from './shared/error/error-boundary';
import AppComponent from './app';
import { loadIcons } from './config/icon-loader';
import DevTools from './config/devtools';
import { ThemeSwitcher } from '../content/react-bootstrap-theme-switcher/lib/ThemeSwitcher';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const LazyApp = lazy(() => import('./new-template/app/app'));

const store = initStore();
registerLocale(store);
loadIcons();

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

const newTemplate = localStorage.getItem('NEW_TEMPLATE') === 'true';

if (!newTemplate) {
  const rootEl = document.getElementById('root');
  const render = Component =>
    // eslint-disable-next-line react/no-render-return-value
    ReactDOM.render(
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeSwitcher themePath="content/react-bootstrap-theme-switcher/themes">
            <div>
              {/* If this slows down the app in dev disable it and enable when required  */}
              {devTools}
              <Component />
            </div>
          </ThemeSwitcher>
        </Provider>
      </ErrorBoundary>,
      rootEl
    );
  render(AppComponent);
} else {
  ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <LazyApp />
        {/* <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      /> */}
      </Suspense>
    </Provider>,
    document.getElementById('root')
  );
  registerServiceWorker();
}
