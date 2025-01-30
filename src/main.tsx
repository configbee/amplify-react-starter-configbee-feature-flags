import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import ConfigbeeProvider from "./configbee-provider.tsx"
import { Authenticator, View } from '@aws-amplify/ui-react';

Amplify.configure(outputs);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigbeeProvider>
      <Authenticator.Provider>
        <View><App /></View>
      </Authenticator.Provider>
    </ConfigbeeProvider>
  </React.StrictMode>
);
