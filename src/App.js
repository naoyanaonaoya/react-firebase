import { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

function App() {
  console.log(process.env.REACT_APP_API_KEY);

  const [posts, setPosts] = useState([]);

  // browseがマウントされたときに一回だけuseEffectの中身が実行される
  useEffect(() => {
    // データベースからデータを取得する
    const postData = collection(db, "posts");
    console.log(postData);
    // const docSnap = getDocs(postData);
    // console.log(docSnap);
    getDocs(postData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => doc.data()));
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
      console.log(posts);
    });
    // getDoc(postData).then((snapShot) => {
    //   console.log(snapShot);
    // });

    /* リアルタイムで取得 */
    onSnapshot(postData, (post) => {
      setPosts(post.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  return (
    <div className="App">
      <div>
        {posts.map((post) => (
          <div key={post.title}>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
