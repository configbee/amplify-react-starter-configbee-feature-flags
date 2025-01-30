// @ts-nocheck

import { useEffect, useState } from 'react';
import type { Schema } from './amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import React from 'react';
import { uploadData,getUrl } from 'aws-amplify/storage';
import { StorageManager, StorageImage } from '@aws-amplify/ui-react-storage';
import { useCbStatus, useCbFlags, useCbTexts, useCbOperations } from 'configbee-react';



const client = generateClient<Schema>();

function App() {
  const cbStatus = useCbStatus();
  const cbOperations = useCbOperations()
  const {
    uploadEnabled,
    deleteTodoEnabled,
    storageManagerEnabled,
    downloadFileEnabled,
    functionsEnabled,
    fetchDataEnabled
   } = useCbFlags() as { uploadEnabled?: boolean };
  const { successMessage } = useCbTexts() as { successMessage?:  string};

  const [todos, setTodos] = useState<Array<Schema['Todo']['Item']>>([]);
  const [file, setFile] = React.useState();
  
  const { user, signOut, authStatus } = useAuthenticator((context) => [context.user]);

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const fetchTodos = async () => {
    const { data: items, errors } = await client.models.Todo.list();
    alert(items.length + " items fetched")
  };

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("What would you like to do?") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  function sayHello(){
    client.queries.sayHello({
      name: "World",
    })
  }

  const linkToStorageFile = async () =>{
    const linkUrl = await getUrl({
      path: 'picture-submissions/test.jpg',
    });

    console.log('signed URL: ', linkUrl.url);
    console.log('URL expires at: ', linkUrl.expiresAt);
  };

  useEffect(()=>{
    if(cbStatus === undefined){
      return
    }
    if(user?.userId){
      cbOperations.setTargetProperties({"userId":user.userId, "userName": user?.signInDetails?.loginId})
    }
    else{
      cbOperations.unsetTargetProperties()
    }
  },[user])

  return (
          <Authenticator>
            {({signOut, user})=> (
                    <main>
                      <h1> {user?.signInDetails?.loginId}'s todos</h1>
                      <button onClick={createTodo}>+ new</button>
                      <ul>
                        {todos.map((todo) => (
                                <li key={todo.id}>
                                  {todo.content}
                                      {deleteTodoEnabled &&
                                        <button title='Delete'
                                          style={{float: "right"}}
                                          onClick={() => deleteTodo(todo.id)}>
                                            X
                                        </button>
                                      }
                                </li>
                        ))}
                      </ul>
                      <div>
                        {successMessage || "🥳 App successfully hosted. Try creating a new todo."}
                        <br />
                        <a href="https://docs.amplify.aws/gen2/start/quickstart/">
                          Review next step of this tutorial.
                        </a>
                      </div>
                      {uploadEnabled &&
                      <div>
                        <input type="file" onChange={handleChange}/>
                        <button
                                onClick={() =>
                                        uploadData({
                                          path: `picture-submissions/${file.name}`,
                                          data: file,
                                        })
                                }
                        >
                          Upload
                        </button>
                        {storageManagerEnabled &&
                        <>
                          <StorageManager
                                  acceptedFileTypes={['image/*']}
                                  path="picture-submissions/"
                                  maxFileCount={1}
                                  isResumable
                          />
                          <StorageImage alt="Uploaded image" path="picture-submissions/test.jpg"/>
                        </>
                      } 

                      </div>
                      }
                      <div>
                        {downloadFileEnabled && <button onClick={linkToStorageFile}>Download URL</button>}

                        {functionsEnabled && <button onClick={sayHello}>sayHello Function</button>}
                      </div>
                      <div>
                        {fetchDataEnabled && <button onClick={fetchTodos}>Fetch Data</button>}
                        <button onClick={signOut}>Sign out</button>
                      </div>
                    </main>
            )}
          </Authenticator>
  );
}

export default App;