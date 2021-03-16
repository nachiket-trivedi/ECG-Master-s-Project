import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from './AuthStack';
import AllTabs from './AllTabs';

import { connect } from "react-redux";


const MainApp = props => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    isLogged();
  }, [props.auth]);

  // const userToken = useSelector(state => {
  //   return state.auth.userToken;
  // });

  const isLogged = () => {
    console.log(props.auth);

    if (props.auth.userToken) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };

  return (
    <NavigationContainer>
      {logged ? (
        <>
          <AllTabs />
        </>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(MainApp);
