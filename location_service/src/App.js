import './App.css';
import React, { useEffect, useState } from 'react';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { createRequestTransformer } from 'amazon-location-helpers';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

//* ---- CONSTANTS ----- */
const MAP_NAME = 'gcs';

const INITIAL_VIEWPORT = {
  longitude: 72.8777,
  latitude: 19.0760,
  zoom: 13,
};

const App = () => {
  const [credentials, setCredentials] = useState();
  const [transformRequest, setRequestTransformer] = useState();

  const [viewport, setViewport] = useState({
    longitude: INITIAL_VIEWPORT.longitude,
    latitude: INITIAL_VIEWPORT.latitude,
    zoom: INITIAL_VIEWPORT.zoom,
  });
  
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const currentCredentials = await Amplify.Auth.currentUserCredentials();
        setCredentials(currentCredentials);
      } catch (error) {
        console.error('Error fetching credentials:', error);
      }
    };

    fetchCredentials();
  }, []);

  useEffect(() => {
    const makeRequestTransformer = async () => {
      if (credentials) {
        try {
          const tr = await createRequestTransformer({
            credentials,
            region: awsconfig.aws_project_region,
          });
          setRequestTransformer(() => tr);
        } catch (error) {
          console.error('Error creating request transformer:', error);
        }
      }
    };

    makeRequestTransformer();
  }, [credentials]);

  return (
    <Authenticator>
      <div className='App'>
        <Header />
        <div>
          {transformRequest ? (
            <ReactMapGL
              {...viewport}
              width='100%'
              height='100vh'
              transformRequest={transformRequest}
              mapStyle={MAP_NAME}
              onViewportChange={setViewport}
            >
              <div style={{ position: 'absolute', left: 20, top: 20 }}>
                <NavigationControl showCompass={false} />
              </div>
            </ReactMapGL>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </Authenticator>
  );
};

export default App;
