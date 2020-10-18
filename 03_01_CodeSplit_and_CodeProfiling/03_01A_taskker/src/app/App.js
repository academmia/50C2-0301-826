import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import "../styles/taskker.css";
import './App.css';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AppSettings from './pages/AppSettings';

import settings from './settings.json';
import { SettingsContext } from './settings-context';
import AppTheme from '../shared/theme/AppTheme';

import { RawIntlProvider  } from "react-intl";
import AppIntl from '../shared/locale';

class App extends Component {

  constructor(props) {
    super(props);

    // expect an object
    console.log('first settings...', settings);

    this.state = {
      intl: AppIntl.ro,
      settings: settings,
      updateSettings: this.updateSettings,
      updateIntl: this.updateIntl
    }

  }

  updateSettings = (updatedAppSettings = {}, updatedUserSettings = {}) => {
    console.log('run updateAppSettings...', updatedAppSettings, updatedUserSettings);
    this.setState( (prevState) => ( {
      settings: {
        ...prevState.settings,
        appSettings: {
          ...prevState.settings.appSettings,
          ...updatedAppSettings
        },
        userSettings: {
          ...prevState.settings.userSettings,
          ...updatedUserSettings
        }
      }}) )
  }

  updateIntl = (locale = 'en') => {
    this.setState( () => ({ intl: AppIntl[locale] }))
  }

  render() {
    return (
      <RawIntlProvider value={this.state.intl} id={this.state.intl.locale}>
        <AppTheme>
          <SettingsContext.Provider value={this.state}>
            <Switch>
              <Route>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/app-settings" component={AppSettings} />
              </Route>
            </Switch>
          
          </SettingsContext.Provider>
        </AppTheme>
      </RawIntlProvider>
    );
  }
}

export default App;
