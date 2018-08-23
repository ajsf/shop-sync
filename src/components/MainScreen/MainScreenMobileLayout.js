import React from 'react';
import ListEditorContainer from '../../containers/MainScreen/ListEditorContainer';
import { Route, Switch, Redirect } from 'react-router-dom';
import ShoppingListsContainer from '../../containers/MainScreen/ShoppingListsContainer';

const MainScreenMobileLayout = () => {
  return (
    <Switch>
      <Route path="/list/" component={ListEditorContainer} />
      <Route exact path="/lists" component={ShoppingListsContainer} />
      <Redirect to="/lists" />
    </Switch>
  );
};

export default MainScreenMobileLayout;
